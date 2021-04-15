import styled, { css, keyframes } from "styled-components";

import HeroImage from "@images/hero-photo.png";
import RightArrow from "@images/right-arrow.png";
import LeftArrow from "@images/left-arrow.png";

export const Hero = styled.div`
  width: 100%;
  height: calc(100vh - 9vw);
  background-image: url(${HeroImage});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50vw;
  height: 100%;
  padding: 2vw 3vw;
`;

export const Post = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin-top: 5%;
  border-radius: 1vw;
  overflow-y: hidden;
  position: relative;
  background: #fff;
  ${(props) =>
    props.fadeIn &&
    css`
      animation: ${fadeInKeyframes} 1s forwards;
    `}
`;

export const RichTextPreview = styled.div`
  height: 65%;
  width: 100%;
  overflow-y: hidden;
  font-family: "Gotham Book", sans-serif;
  & > p {
    font-size: 1.4vw !important;
  }

  & > h2 {
    font-size: 2.8vw !important;
  }

  & > h3 {
    font-size: 2.2vw !important;
  }

  & > h4 {
    font-size: 1.8vw !important;
  }
`;

export const SeeMoreDegree = styled.div`
  height: 40%;
  width: 100%;
  position: absolute;
  bottom: 0;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 0)
  );
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const SeeMoreText = styled.h3`
  margin-bottom: 3.5%;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 2vw;
  color: #1857ee;
  text-decoration: underline;
  text-align: center;
`;

export const Arrow = styled.div`
  width: 7.5%;
  height: 7.5%;

  ${(props) =>
    props.left &&
    css`
      background: url(${LeftArrow});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border: none;
      outline: none;
    `}
  ${(props) =>
    props.right &&
    css`
      background: url(${RightArrow});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border: none;
      outline: none;
    `}
`;

export const TitleAndEditorContainer = styled.div`
  height: 100%;
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
