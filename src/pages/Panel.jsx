import {
  PanelContainer,
  Header,
  HeaderTitleContainer,
  Sidebar,
  Title,
  Image,
  SectionContainer,
  Section,
  SectionTitle,
  Line,
  RowContainer,
  Icon,
  Text,
  Content,
  Vieweable,
  Post,
  PostDetail,
  PostButtons,
  TitleContainer,
  Input,
  SendButton,
  SwalText,
  SwalTitle,
} from "@styles/Panel.js";

import { Title as HeaderTitle } from "@components/Header/styles.js";
import { Link } from "react-router-dom";
import getLocalAuth from "../hooks/getLocalAuth";

import {
  Title as HeaderItemTitle,
  ItemContainer as HeaderItemContainer,
} from "@components/Header/HeaderItem/styles.js";

import List from "@images/admin-list.png";
import Add from "@images/admin-add.png";
import Logo from "@images/logo64.png";
import Edit from "@images/edit.png";
import Open from "@images/open.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from "react";
import firebase from "../config/Firebase";
import moment from "moment";
import swal from "@sweetalert/with-react";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          console.log(file);
          let storage = firebase.storage().ref();
          let uploadTask = storage.child(file.name).put(file, file.metadata);

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log("Upload is paused");
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log("Upload is running");
                  break;
              }
            },
            function (error) {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              // eslint-disable-next-line default-case
              switch (error.code) {
                case "storage/unauthorized":
                  reject("No tienes permisos para subir un archivo a la nube");
                  break;

                case "storage/canceled":
                  reject("El usuario canceló la subida");
                  break;

                case "storage/unknown":
                  reject("Error inesperado, inspeccione error.serverResponse");
                  break;
              }
            },
            function () {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  console.log("File available at", downloadURL);
                  resolve({
                    default: downloadURL,
                  });
                });
            }
          );
        })
    );
  }
}

const Panel = () => {
  const [activeRow, setActiveRow] = useState("List");
  const [posts, setPostsData] = useState([]);
  const [inversePosts, setInversePosts] = useState([]);
  const [addedPost, setAddedPost] = useState({});
  const [removedPost, setRemovedPost] = useState({});
  const [postDataForSend, setPostDataForSend] = useState({});
  const [ListCharged, setListCharged] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const rows = [
    { id: 0, icon: List, text: "Lista", state: "List" },
    { id: 1, icon: Add, text: "Añadir", state: "Add" },
  ];

  const setPostInData = async (title, data, date) => {
    const postListRef = firebase.database().ref().child("posts");
    const lastPostRef = await postListRef
      .orderByKey()
      .limitToLast(1)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        return null;
      })
      .catch((error) => {
        return null;
      });

    let newPostID;

    if (lastPostRef !== undefined) {
      if (lastPostRef !== null) {
        if (typeof lastPostRef === "object") {
          console.log(lastPostRef);
          const keys = Object.keys(lastPostRef);
          const lastPostID = keys[0];
          newPostID = parseInt(lastPostID) + 1;
        }
      }
    }

    if (newPostID === undefined || newPostID === NaN) {
      newPostID = 0;
    }

    firebase
      .database()
      .ref("posts/" + newPostID)
      .set(
        {
          title,
          data,
          date,
          id: newPostID,
        },
        (error) => {
          if (error) {
            console.log(error);
            swal({
              className: "SweetAlerts-global-add",
              content: (
                <div>
                  <SwalTitle>Post no añadido!</SwalTitle>
                  <SwalText>Ocurrió un error inesperado</SwalText>
                  <SwalText>Compruebe su conexión a internet</SwalText>
                </div>
              ),
              icon: "error",
            });
          } else {
            swal({
              className: "SweetAlerts-global-add",
              content: (
                <div>
                  <SwalTitle>Post añadido!</SwalTitle>
                  <SwalText>{`Título: ${title}`}</SwalText>
                  <SwalText>{`Id: ${newPostID}`}</SwalText>
                </div>
              ),
              icon: "success",
            }).then((value) => {
              if (newPostID === 0) {
                window.location = location;
              }
              setActiveRow("List");
            });
          }
        }
      );
  };

  const handleSendPost = async () => {
    try {
      if (
        (postDataForSend.title !== null ||
          postDataForSend.title !== undefined) &&
        (postDataForSend.data !== null ||
          postDataForSend.data !== undefined ||
          typeof postDataForSend.data === "string") &&
        postDataForSend.data.length > 0
      ) {
        await setPostInData(
          postDataForSend.title,
          postDataForSend.data,
          moment().format()
        );
      } else {
        swal({
          className: "SweetAlerts-global-add",
          content: (
            <div>
              <SwalTitle>¡Post no añadido!</SwalTitle>
              <SwalText>
                Debe ingresar tanto un título como un texto en el editor
              </SwalText>
              <SwalText>Vuelva a intentarlo</SwalText>
            </div>
          ),
          icon: "error",
        });
      }
    } catch (err) {
      console.log(err);
      swal({
        className: "SweetAlerts-global-add",
        content: (
          <div>
            <SwalTitle>¡Post no añadido!</SwalTitle>
            <SwalText>
              Debe ingresar tanto un título como un texto en el editor
            </SwalText>
            <SwalText>Vuelva a intentarlo</SwalText>
          </div>
        ),
        icon: "error",
      });
    }
  };

  useEffect(() => {
    moment.locale("es");

    moment.relativeTimeThreshold("ss", 10);
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      try {
        const first = posts[0];
        console.log(inversePosts.length <= 1 && Object.keys(first).length >= 0);
        setListCharged(
          inversePosts.length <= 1 && Object.keys(first).length >= 0
        );
      } catch (e) {
        console.log(e);
        setListCharged(false);
      }
    }
  }, [posts]);

  useEffect(() => {
    if (!posts.some((post) => post.id === addedPost.id)) {
      setPostsData([...posts, addedPost]);
    }
  }, [addedPost]);

  useEffect(() => {
    setPostsData(posts.filter((post) => post.id !== removedPost.id));
  }, [removedPost]);

  useEffect(() => {
    const postsForInverse = [...posts];
    setInversePosts(postsForInverse.reverse());
  }, [posts]);

  useEffect(() => {
    const postsListRef = firebase.database().ref().child("posts");

    const onError = (error) => {
      console.log(error);
    };

    const onInitialLoad = (snapshot) => {
      const snapshotVal = snapshot.val();
      console.log(snapshotVal);
      setPostsData([...snapshotVal]);

      const onChildAdded = (snapshot, prevId) => {
        console.log(snapshot.val());
        setAddedPost(snapshot.val());
      };

      const onChildRemoved = (snapshot) => {
        console.log(snapshot.val());
        setRemovedPost(snapshot.val());
      };

      postsListRef.on("child_added", onChildAdded, onError);

      postsListRef.on("child_removed", onChildRemoved, onError);
    };

    postsListRef.once("value", onInitialLoad, onError);

    return () => {
      postsListRef.off();
    };
  }, [firebase.database]);

  useEffect(() => {
    let intervalId;
    if (!ListCharged && activeRow === "List") {
      intervalId = setInterval(() => {
        if (posts.length >= 1) {
          setListCharged(true);
        }
      });
    } else {
      console.log("holaaa clear");
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [ListCharged, activeRow]);

  const isAuth = getLocalAuth();

  const EditorConfig = {
    toolbar: {
      shouldNotGroupWhenFull: true,
    },
  };

  if (isAuth) {
    return (
      <>
        <PanelContainer>
          <Sidebar>
            <Image src={Logo} />
            <Title>UTU Atlántida</Title>
            <SectionContainer>
              <Section>
                <SectionTitle>Posts</SectionTitle>
                <Line />
                {rows.map((row) => {
                  return (
                    <RowContainer first={row.id === 0} key={row.id}>
                      <Icon src={row.icon} />
                      <Text onClick={() => setActiveRow(row.state)}>
                        {row.text}
                      </Text>
                    </RowContainer>
                  );
                })}
              </Section>
            </SectionContainer>
          </Sidebar>
          <Content>
            <Header>
              <HeaderTitleContainer>
                <HeaderTitle panel>PANEL DE ADMINISTRADOR</HeaderTitle>
              </HeaderTitleContainer>

              <HeaderItemContainer panel>
                <Link to="/">
                  <HeaderItemTitle>Inicio</HeaderItemTitle>
                </Link>
              </HeaderItemContainer>
            </Header>
            <Vieweable state={activeRow}>
              {activeRow === "List" ? (
                <>
                  <Text fontSize={"2.7vw"} color={"rgba(0,0,0,0.7)"}>
                    Lista de posts
                  </Text>
                  {!ListCharged ? (
                    <>
                      <Text
                        color={"black"}
                        fontSize={"2vw"}
                        margin={"1% 2% 1% 2%"}
                        textAlign={"center"}
                      >
                        Actualmente no hay posts creados, ¡cree uno nuevo en el
                        menú añadir!
                      </Text>
                    </>
                  ) : (
                    <>
                      {inversePosts.map((post) => {
                        return (
                          <Post key={post.id}>
                            <PostDetail>
                              <Text color={"#000"}>{post.title}</Text>
                              <Text
                                color={"rgba(0,0,0,0.5)"}
                                fontSize={"1.3vw"}
                              >
                                {moment(post.date).fromNow()}
                              </Text>
                              <Text color={"rgba(0,0,0,0.0)"} fontSize={"0px"}>
                                {seconds}
                              </Text>
                            </PostDetail>
                            <PostButtons>
                              <Icon
                                margin={"0 1vw"}
                                src={Open}
                                onClick={async () => {
                                  await setPostInData(
                                    post.title,
                                    post.data,
                                    moment().format()
                                  );
                                }}
                              ></Icon>
                              <Icon src={Edit}></Icon>
                            </PostButtons>
                          </Post>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                activeRow === "Add" && (
                  <>
                    <Text
                      textAlign={"center"}
                      fontSize={"3vw"}
                      margin={"0"}
                      color={"rgba(0,0,0,0.7)"}
                    >
                      Añadir post
                    </Text>

                    <TitleContainer>
                      <Text
                        fontSize={"2vw"}
                        textAlign={"center"}
                        margin={"0 0 1% 0"}
                        color={"rgba(0,0,0,0.7)"}
                      >
                        Insertar título
                      </Text>
                      <Input
                        onChange={(e) =>
                          setPostDataForSend({
                            ...postDataForSend,
                            title: e.target.value,
                          })
                        }
                      />
                    </TitleContainer>

                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      config={EditorConfig}
                      onReady={(editor) => {
                        editor.plugins.get(
                          "FileRepository"
                        ).createUploadAdapter = (loader) => {
                          return new MyUploadAdapter(loader);
                        };
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setPostDataForSend({
                          ...postDataForSend,
                          data: data,
                        });
                      }}
                    />
                    <SendButton onClick={() => handleSendPost(null)}>
                      ENVIAR
                    </SendButton>
                  </>
                )
              )}
            </Vieweable>
          </Content>
        </PanelContainer>
      </>
    );
  }

  return <h1>No tienes permisos para ver esto</h1>;
};

export default Panel;
