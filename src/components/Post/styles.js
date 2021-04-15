import styled, { css } from "styled-components";
import bg from "@images/hero-photo.png";

export const Container = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: auto;
  min-height: calc(100vh - 9vw);
  width: 100%;
  position: relative;
`;

export const Hero = styled.div`
  width: 100%;
  height: 21vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex-direction: column;
  margin-bottom: 3vw;
`;

export const PostHTMLContainer = styled.div`
  width: 80%;
  min-height: 20vw;
  height: auto;
  position: relative;
  top: 30%;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-family: "Gotham Book", sans-serif;
  padding: 0 0 3.5% 0;
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

export const TextBG = styled.div`
  width: 80%;
  min-height: 20%;
  height: auto;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
