import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import firebase from "../../config/Firebase";

class MyUploadAdapter {
  constructor(loader, ref) {
    this.loader = loader;
    this.ref = ref;
  }
  // Starts the upload process.
  upload() {
    let h2ref = this.ref;
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          console.log(file);
          console.log(h2ref.current);
          let storage = firebase.storage().ref();
          let uploadTask = storage.child(file.name).put(file, file.metadata);

          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              h2ref.current.innerText = `${progress}% subido`; //USEREF SIRVE
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

const Editor = () => {
  const ref = useRef(null);
  const [data, setData] = useState({});
  const [fakeJson, setFakeJson] = useState({
    posts: [],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFakeJson({
      posts: [
        ...fakeJson.posts,
        {
          id: fakeJson.posts.length,
          data: data,
        },
      ],
    });

    console.log(JSON.stringify(fakeJson));
  };

  return (
    <div className="App">
      <h2 ref={ref}>Using CKEditor 5 build in React</h2>
      <form onSubmit={handleSubmit}>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={(editor) => {
            editor.plugins.get("FileRepository").createUploadAdapter = (
              loader
            ) => {
              return new MyUploadAdapter(loader, ref);
            };
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />

        <button type="submit"></button>
      </form>

      {fakeJson.posts.map((post) => {
        return (
          <div
            className="ck-content ck-container"
            dangerouslySetInnerHTML={{ __html: post.data }}
          />
        );
      })}
    </div>
  );
};

export default Editor;
