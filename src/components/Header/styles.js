import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 9vw;
  background: #1857ee;

  ${(props) => {
    console.log(props.responsive);
  }}
`;

export const HeaderItemsContainer = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > a {
    width: 25%;
    height: 100%;
    display: block;
    text-decoration: none;
  }
`;

export const LogoZoneContainer = styled.div`
  height: 55%;
  width: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2.5%;
`;

export const Logo = styled.img`
  height: 100%;
`;

export const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 2vw;
  color: white;
  margin-left: 5%;
  text-decoration: none;

  ${(props) =>
    props.panel &&
    css`
      margin: 0;
    `}
`;
