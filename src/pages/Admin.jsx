import {
  Modal,
  Title,
  Input,
  Button,
  LoginContainer,
  ErrorOrSuccessTitle,
  Success,
  Error,
} from "@styles/Admin.js";
import Header from "@components/Header/Header.jsx";
import { Hero } from "@styles/Home.js";
import { USER, PASSWORD } from "../config/ENV";
import { useState } from "react";

import Delayed from "../config/Delayed";
import { useHistory } from "react-router-dom";
import setLocalAuth from "../hooks/setLocalAuth";

const Admin = () => {
  const history = useHistory();
  const [typedUser, setTypedUser] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [loginState, setLoginState] = useState(null);
  const [sweetOutController, setOutAnimation] = useState(null);

  const handleLogin = () => {
    if (typedUser === "" || typedPassword === "") {
      setLoginState(null);
    } else {
      console.log(typedUser === USER);
      console.log(typedPassword === PASSWORD);
      console.log(typedUser, USER);
      console.log(typedPassword, PASSWORD);
      if (typedUser !== USER || typedPassword !== PASSWORD) {
        setLoginState({ error: true });
      }

      if (typedUser === USER && typedPassword === PASSWORD) {
        setLoginState({ success: true });
      }
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  const handleErrorTimeout = () => {
    setTimeout(() => {
      setOutAnimation({ errorExit: true });
      setTimeout(() => {
        setLoginState(null);
        setOutAnimation(null);
        setLocalAuth(false);
      }, 750);
    }, 2400);
  };

  const handleSuccessTimeout = () => {
    setTimeout(() => {
      setOutAnimation({ successExit: true });
      setTimeout(() => {
        setLoginState(null);
        setOutAnimation(null);
        setLocalAuth(true);
        history.push("/panel");
      }, 750);
    }, 2400);
  };

  return (
    <>
      <Header />

      <Hero admin>
        <Modal>
          <LoginContainer loginState={loginState}>
            <Title>{loginState === null && "INICIO DE SESIÓN"}</Title>
            <Title>{loginState === null && "DE ADMINISTRADOR"}</Title>
            <Input
              first
              onChange={(e) => setTypedUser(e.target.value)}
              onKeyDown={(e) => handleEnter(e)}
              value={typedUser}
              placeholder="Usuario..."
              type="text"
              name="User"
            ></Input>
            <Input
              placeholder="Contraseña..."
              type="password"
              name="Password"
              value={typedPassword}
              onChange={(e) => setTypedPassword(e.target.value)}
              onKeyDown={(e) => handleEnter(e)}
            ></Input>
            <Button onClick={handleLogin}>
              {loginState === null && "INGRESAR"}
            </Button>
          </LoginContainer>

          {loginState !== null && (
            <>
              {loginState.success && (
                <>
                  <Delayed waitBeforeShow={500}>
                    <Success exit={sweetOutController} />
                    <ErrorOrSuccessTitle exit={sweetOutController}>
                      Logeado
                    </ErrorOrSuccessTitle>
                    <ErrorOrSuccessTitle last exit={sweetOutController}>
                      Correctamente...
                    </ErrorOrSuccessTitle>

                    {handleSuccessTimeout()}
                  </Delayed>
                </>
              )}
              {loginState.error && (
                <>
                  <Delayed waitBeforeShow={500}>
                    <Error exit={sweetOutController} />
                    <ErrorOrSuccessTitle exit={sweetOutController}>
                      Incorrecto
                    </ErrorOrSuccessTitle>
                    <ErrorOrSuccessTitle last exit={sweetOutController}>
                      Error en usuario o contraseña
                    </ErrorOrSuccessTitle>

                    {handleErrorTimeout()}
                  </Delayed>
                </>
              )}
            </>
          )}
        </Modal>
      </Hero>
    </>
  );
};

export default Admin;
