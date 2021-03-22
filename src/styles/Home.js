import styled, { css } from "styled-components";

import HeroImage from "@images/hero-photo.png";

export const Hero = styled.div`
  width: 100%;
  height: 40vw;
  background-image: url(${HeroImage});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  ${(props) =>
    props.admin &&
    css`
      height: calc(100vh - 9vw);
    `}
`;
