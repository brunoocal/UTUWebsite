import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCVZ_evkNpcg5AbosWerTh132S0BBALONo",
  authDomain: "utu-atl.firebaseapp.com",
  projectId: "utu-atl",
  storageBucket: "utu-atl.appspot.com",
  messagingSenderId: "103736265612",
  appId: "1:103736265612:web:932fa5094fa760922424a9",
};
firebase.initializeApp(firebaseConfig);

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

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 build in React</h2>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            editor.plugins.get("FileRepository").createUploadAdapter = (
              loader
            ) => {
              return new MyUploadAdapter(loader);
            };
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default App;
