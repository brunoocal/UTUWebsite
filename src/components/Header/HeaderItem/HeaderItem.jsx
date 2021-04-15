import { ItemContainer, Title, SubItemsContainer, DownArrow } from "./styles";

import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderDownArrow from "@images/header-dropdown-down-arrow.png";

const HeaderItem = ({ title, responsive, children, url, dropdown }) => {
  const [click, onClick] = useState(undefined);

  if (url !== undefined) {
    return (
      <>
        <Link to={url}>
          <ItemContainer
            onClick={() => onClick(!click)}
            responsive={responsive}
          >
            <Title>{title}</Title>
            {children && (
              <>
                <DownArrow clicked={click} src={HeaderDownArrow} />
                <SubItemsContainer clicked={click}>
                  {children}
                </SubItemsContainer>
              </>
            )}
          </ItemContainer>
        </Link>
      </>
    );
  }

  return (
    <>
      <ItemContainer
        dropdown
        onClick={() => onClick(!click)}
        responsive={responsive}
      >
        <Title>{title}</Title>
        {children && (
          <>
            <DownArrow clicked={click} src={HeaderDownArrow} />
            <SubItemsContainer clicked={click}>{children}</SubItemsContainer>
          </>
        )}
      </ItemContainer>
    </>
  );
};

export default HeaderItem;
