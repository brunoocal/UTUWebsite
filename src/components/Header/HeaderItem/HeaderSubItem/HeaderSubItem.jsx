import { SubItemContainer, Title } from "./styles";
import { Link } from "react-router-dom";

const HeaderSubItem = ({ title, url }) => {
  return (
    <>
      <Link to={url}>
        <SubItemContainer>
          <Title>{title}</Title>
        </SubItemContainer>
      </Link>
    </>
  );
};

export default HeaderSubItem;
