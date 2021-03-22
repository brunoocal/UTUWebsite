import styled, { css } from "styled-components";

export const PanelContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: flex;
`;

export const Content = styled.div`
  width: calc(100% - 22.5%);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  height: 9vw;
  background-color: #1857ee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitleContainer = styled.div`
  width: 30%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Sidebar = styled.aside`
  width: 22.5%;
  height: auto;
  background-color: #212227;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 2.5%;
`;

export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 2vw;
  color: white;
  margin: 0 auto;
  text-decoration: none;
  text-align: left;
  margin-top: 1.5%;
`;

export const Image = styled.img`
  height: 7vw;
  margin: 0 auto;
`;

export const SectionContainer = styled.div`
  padding: 7.5% 7.5% 0 8%;
  width: 100%;
  height: 100%;
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 2vw;
  color: white;
  text-decoration: none;
  text-align: left;
  margin: 1% auto 1% 2%;
`;

export const Line = styled.div`
  width: 100%;
  background-color: #fff;
  height: 0.2vw;
  margin-bottom: 7.5%;
`;

export const RowContainer = styled.div`
  margin: 5% 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4vw;

  ${(props) =>
    props.first &&
    css`
      margin-top: 11%;
    `}
`;

export const Icon = styled.img`
  height: 100%;

  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}

  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
`;

export const Text = styled.p`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 2vw;
  color: white;
  text-decoration: none;
  text-align: left;
  margin-left: 2.5%;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}

    
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}

    ${(props) =>
    props.textAlign &&
    css`
      text-align: ${props.textAlign};
    `}
`;

export const Vieweable = styled.div`
  width: 100%;
  height: auto;
  background-color: rgb(248, 248, 255);
  padding: 2.5% 6.5% 1% 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Post = styled.div`
  height: 8.5vw;
  width: 100%;
  border-radius: 1vw;
  margin: 3%;
  padding: 2%;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostDetail = styled.div`
  width: 70%;
  height: 100%;
  padding: 0 0 0 3%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const PostButtons = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2% 0;
`;

export const TitleContainer = styled.div`
  width: 80%;
  height: 20%;
  padding: 3% 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 2vw;
  color: black;
  border-radius: 0.7vw;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
`;
