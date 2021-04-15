import { useParams } from "react-router-dom";
import Header from "@components/Header/Header";
import { Container, Hero, TextBG, PostHTMLContainer } from "./styles";
import { Text } from "@styles/Panel.js";
import firebase from "../../config/Firebase";
import { useState, useEffect } from "react";
import moment from "moment";

const Post = () => {
  const { postId } = useParams();
  const [postData, setData] = useState(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    moment.locale("es");

    moment.relativeTimeThreshold("ss", 10);
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const postRef = firebase
      .database()
      .ref()
      .child("posts/" + postId + "/");

    postRef
      .once("value")
      .then((snapshot) => {
        const snapshotVal = snapshot.val();
        if (snapshotVal !== null) {
          setData({ ...snapshotVal, error: false });
        } else {
          setData({ error: true });
        }
      })
      .catch((error) => {
        console.log(error);
        setData({ error: true });
      });
  }, []);

  const getData = () => {
    return {
      __html: postData.data,
    };
  };

  return (
    <>
      <Header />
      <Container>
        {postData !== null && !postData.error && (
          <>
            <Hero>
              <TextBG>
                <Text
                  fontWeight={600}
                  fontSize={"3.2vw"}
                  color={"black"}
                  margin={"1% 0 0 0"}
                  textAlign={"center"}
                  backgroundColor={"white"}
                  padding={"1%"}
                >
                  {postData.title}
                </Text>
                <Text
                  fontWeight={600}
                  fontSize={"2.3vw"}
                  color={"rgba(0,0,0,0.6)"}
                  margin={"-1% 0 0 0"}
                  textAlign={"center"}
                  backgroundColor={"white"}
                  padding={"1%"}
                >
                  {moment(postData.date).fromNow()}
                </Text>
              </TextBG>
            </Hero>
            <PostHTMLContainer
              className={"ck-content"}
              dangerouslySetInnerHTML={getData()}
            />
          </>
        )}

        {postData !== null ? (
          postData.error && (
            <>
              <Text
                fontWeight={600}
                fontSize={"4vw"}
                color={"black"}
                margin={"1% 0 0 0"}
                textAlign={"center"}
              >
                Este post parece no existir...
              </Text>
              <Text
                fontWeight={600}
                fontSize={"3vw"}
                color={"rgba(0,0,0,0.6)"}
                margin={"1% 0 0 0"}
                textAlign={"center"}
              >
                Deberías volver al menú
              </Text>
            </>
          )
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Post;
