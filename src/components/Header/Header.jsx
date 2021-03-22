import { useMediaQuery } from "react-responsive";
import {
  HeaderContainer,
  HeaderItemsContainer,
  LogoZoneContainer,
  Logo,
  Title,
} from "./styles";

import HeaderItem from "@components/Header/HeaderItem/HeaderItem.jsx";
import HeaderSubItem from "@components/Header/HeaderItem/HeaderSubItem/HeaderSubItem.jsx";

import LogoPhoto from "@images/logo64.png";

const Header = () => {
  const isLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const ResponsiveQuerys = {
    isDesktop,
    isLaptop,
    isTablet,
    isMobile,
    isPortrait,
  };

  return (
    <>
      <HeaderContainer responsive={ResponsiveQuerys}>
        <LogoZoneContainer>
          <Logo src={LogoPhoto} />
          <Title>UTU Atlántida</Title>
        </LogoZoneContainer>
        <HeaderItemsContainer>
          <HeaderItem
            responsive={ResponsiveQuerys}
            title={"Inicio"}
            url={"/"}
          ></HeaderItem>
          <HeaderItem
            responsive={ResponsiveQuerys}
            title={"Estudiantes"}
            dropdown
          >
            <HeaderSubItem
              responsive={ResponsiveQuerys}
              title={"Exámenes"}
              url={"/examenes"}
            ></HeaderSubItem>
            <HeaderSubItem
              responsive={ResponsiveQuerys}
              title={"Calendario"}
              url={"calendario"}
            ></HeaderSubItem>
          </HeaderItem>
          <HeaderItem
            responsive={ResponsiveQuerys}
            title={"Profesores"}
            dropdown
          >
            <HeaderSubItem
              responsive={ResponsiveQuerys}
              title={"Logearse"}
              url={"admin"}
            ></HeaderSubItem>
            <HeaderSubItem
              responsive={ResponsiveQuerys}
              title={"Cerrar sesión"}
              url={"signout"}
            ></HeaderSubItem>
          </HeaderItem>
          <HeaderItem
            responsive={ResponsiveQuerys}
            title={"Historia"}
            url={"/historia"}
          ></HeaderItem>
        </HeaderItemsContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
