import styled, { css, keyframes } from "styled-components";

import success from "@styles/AnimationComponents/Success";
import error from "@styles/AnimationComponents/Error";

export const Modal = styled.div`
  background: rgba(33, 34, 39, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.8vw;
  height: 32vw;
  width: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 2vw;
  text-align: center;
  color: white;
`;

export const Input = styled.input`
  border-radius: 1vw;
  height: 3.75vw;
  width: 80%;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5vw;
  padding-left: 3%;
  margin: 1.2% 0;
  outline: none;
  border: none;

  ${(props) =>
    props.first &&
    css`
      margin-top: 5%;
    `}
`;

export const Button = styled.button`
  background-color: #1857ee;
  border-radius: 3vw;
  width: 35%;
  height: 4.7vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5vw;
  color: white;
  border-style: none;
  outline: none;
  margin-top: 5%;
`;

export const LoginContainer = styled.div`
  opacity: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 0;
  height: 0;
  position: relative;

  ${(props) => {
    if (props.loginState === null) {
      return css`
        animation: ${fadeInKeyframes} 0.55s forwards;
      `;
    }

    if (props.loginState !== null) {
      return css`
        animation: ${fadeOutKeyframes} 0.55s forwards;
      `;
    }
  }}
`;

export const Success = styled(success)`
  opacity: 1;
  transition: all 0.55s;
  ${(props) => {
    if (props.exit !== null) {
      if (props.exit.successExit) {
        return css`
          opacity: 0;
        `;
      }
    }
  }}
`;

export const Error = styled(error)`
  opacity: 1;
  transition: all 0.55s;
  ${(props) => {
    if (props.exit !== null) {
      if (props.exit.errorExit) {
        return css`
          opacity: 0;
        `;
      }
    }
  }}
`;

export const ErrorOrSuccessTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 2vw;
  text-align: center;
  color: white;
  position: absolute;
  bottom: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;

  opacity: 1;
  transition: all 0.55s;
  ${(props) => {
    if (props.exit !== null) {
      if (props.exit.errorExit || props.exit.successExit) {
        return css`
          opacity: 0;
        `;
      }
    }
  }}

  ${(props) =>
    props.last &&
    css`
      bottom: 12.5%;
    `}
`;

const fadeInKeyframes = keyframes`
    0%{
        width: 0;
        height: 0;
        opacity: 0;
    }
    100%{
        width: 100%;
        height: 100%;
        opacity: 1;
    }
`;

const fadeOutKeyframes = keyframes`
    0%{
        width: 100%;
        height: 100%;
        opacity: 1;

    }
    100%{
        width: 0;
        height: 0;
        opacity: 0;
    }
`;
