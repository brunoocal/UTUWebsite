import React, { useState, useEffect } from "react";
import Header from "@components/Header/Header.jsx";
import {
  Hero,
  Container,
  Post,
  RichTextPreview,
  Arrow,
  TitleAndEditorContainer,
  SeeMoreDegree,
  SeeMoreText,
} from "@styles/Home.js";
import { Text } from "@styles/Panel.js";
import firebase from "../config/Firebase";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [inversePosts, setInversePosts] = useState([]);
  const [addedPost, setAddedPost] = useState({});
  const [removedPost, setRemovedPost] = useState({});
  const [updatedPost, setUpdatedPost] = useState({});
  const [index, setIndex] = useState(0);
  const [activePost, setActivePost] = useState({});
  const [seconds, setSeconds] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setActivePost(inversePosts[0]);
  }, [inversePosts]);

  useEffect(() => {
    moment.locale("es");

    moment.relativeTimeThreshold("ss", 10);
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (posts[posts.length - 1] !== undefined) {
      if (addedPost.id < posts[posts.length - 1].id) {
        if (!posts.some((post) => post.id === addedPost.id)) {
          setPosts([addedPost, ...posts]);
        }
      } else {
        if (!posts.some((post) => post.id === addedPost.id)) {
          setPosts([...posts, addedPost]);
        }
      }
    }
  }, [addedPost]);

  useEffect(() => {
    setPosts(posts.filter((post) => post.id !== removedPost.id));
  }, [removedPost]);

  useEffect(() => {
    const updatedPostData = posts.map((post) => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }
      return post;
    });
    console.log(updatedPostData);
    setPosts(updatedPostData);
  }, [updatedPost]);

  useEffect(() => {
    const postsForInverse = [...posts];
    setInversePosts(postsForInverse.reverse());
  }, [posts]);

  useEffect(() => {
    const lastPosts = firebase
      .database()
      .ref()
      .child("posts")
      .orderByChild("id")
      .limitToLast(3);

    const onError = (error) => {
      console.log(error);
    };

    const onInitialLoad = (snapshot) => {
      const snapshotVal = snapshot.val();
      if (Array.isArray(snapshotVal)) {
        const newSnapshot = snapshotVal.filter(Boolean);
        setPosts([...newSnapshot]);
      } else {
        const arr_obj = Object.values(snapshotVal);
        setPosts([...arr_obj]);
      }

      const onChildAdded = (snapshot, prevId) => {
        setAddedPost(snapshot.val());
      };

      const onChildRemoved = (snapshot) => {
        setRemovedPost(snapshot.val());
      };

      const onChildChanged = (snapshot) => {
        console.log(snapshot.val());
        setUpdatedPost(snapshot.val());
      };

      lastPosts.on("child_added", onChildAdded, onError);

      lastPosts.on("child_removed", onChildRemoved, onError);

      lastPosts.on("child_changed", onChildChanged, onError);
    };

    lastPosts.once("value", onInitialLoad, onError);

    return () => {
      lastPosts.off();
    };
  }, [firebase.database]);

  useEffect(() => {
    if (inversePosts.length > 0) {
      setActivePost(inversePosts[index]);
    }
  }, [index]);

  const handleUpIndex = () => {
    index + 1 >= inversePosts.length ? setIndex(0) : setIndex(index + 1);
  };

  const handleDownIndex = () => {
    index - 1 < 0 ? setIndex(inversePosts.length - 1) : setIndex(index - 1);
  };

  const getData = () => {
    return {
      __html: activePost.data,
    };
  };

  return (
    <>
      <Header />
      <Hero>
        <Container>
          {activePost !== undefined && Object.keys(activePost).length > 0 && (
            <>
              <Text
                margin={"0"}
                fontSize={"2.75vw"}
                color={"black"}
                backgroundColor={"white"}
                padding={"2% 4%"}
                fadeIn
              >
                Últimos posts
              </Text>
              <Post fadeIn>
                <Arrow left onClick={() => handleDownIndex()} />

                <TitleAndEditorContainer>
                  <Text
                    margin={"0"}
                    fontSize={"2.4vw"}
                    color={"black"}
                    fadeInContent
                  >
                    {activePost.title}
                  </Text>

                  <Text
                    margin={"0"}
                    color={"rgba(0,0,0,0.5)"}
                    fontSize={"2vw"}
                    fadeInContent
                  >
                    {moment(activePost.date).fromNow()}
                  </Text>

                  <RichTextPreview
                    className={"ck-content"}
                    dangerouslySetInnerHTML={getData()}
                  />
                </TitleAndEditorContainer>

                <SeeMoreDegree>
                  <SeeMoreText
                    onClick={() => history.push(`/posts/${activePost.id}`)}
                  >
                    Ver más
                  </SeeMoreText>
                </SeeMoreDegree>

                <Arrow right onClick={() => handleUpIndex()} />
              </Post>
            </>
          )}
        </Container>
      </Hero>
    </>
  );
};

export default Home;
