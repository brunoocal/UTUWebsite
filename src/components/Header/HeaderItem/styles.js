import styled, { css, keyframes } from "styled-components";

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  ${(props) =>
    props.dropdown &&
    css`
      width: 33.3%;
    `}

  ${(props) =>
    props.panel &&
    css`
      width: 70%;
      align-items: flex-end;
      padding-right: 10%;
    `}
`;

export const Title = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1.75vw;
  text-align: center;
  line-height: 2vw;
  color: white;
  text-decoration: none;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}
`;

export const DownArrow = styled.img`
  opacity: 0;
  height: 0;
  width: 0;

  ${(props) => {
    if (props.clicked !== undefined) {
      if (props.clicked) {
        return css`
          animation: ${DownArrowIn} 0.4s forwards;
        `;
      } else {
        return css`
          animation: ${DownArrowOut} 0.4s forwards;
        `;
      }
    }
  }}
`;

export const SubItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
  transition: all 0.3s;
  position: absolute;
  z-index: 2;

  & > a {
    text-decoration: none;
    height: 50%;
    width: 100%;
    height: 100%;
  }

  ${(props) => {
    if (props.clicked !== undefined) {
      if (props.clicked) {
        return css`
          animation: ${DropdownFrames} 0.55s ease forwards;
        `;
      } else {
        return css`
          animation: ${DropdownOutFrames} 0.55s ease forwards;
        `;
      }
    }
  }}
`;

const DropdownFrames = keyframes`
  0%{
      bottom: 140%;
      opacity: 0;
  }

  30%{
      opacity: 0;
      pointer-events: all;
  }
  
  100%{
      bottom: -100%; 
      opacity: 1;
      width: 100%;
      height: 10vw;
      pointer-events: all;
  }
`;

const DropdownOutFrames = keyframes`
  0%{
     bottom: -100%;
     opacity: 1;
     width: 100%;
      height: 10vw;
  }
  
  30%{
      opacity: 0;
      pointer-events: none;
  }

  100%{
      bottom: 140%; 
      opacity: 0;
      width: 0%;
      height: 0;
      pointer-events: none;
  }
`;

const DownArrowIn = keyframes`
    0%{
        width: 0;
        height: 0;
        opacity: 0;
    }
    100%{
        width: 3.45vw;
        height: 3.45vw;
        opacity: 1;
    }
`;

const DownArrowOut = keyframes`
    0%{
        width: 3.45vw;
        height: 3.45vw;
        opacity: 1;

    }
    100%{
        width: 0;
        height: 0;
        opacity: 0;
    }
`;
