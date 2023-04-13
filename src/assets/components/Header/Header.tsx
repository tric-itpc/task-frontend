import { FC, ReactElement } from "react";
import "./Header.sass";

const Header: FC = (): ReactElement<HTMLImageElement> => {
    return (
        <img className="header app__header" src="/images/logo.svg" alt="logo" />
    );
};

export default Header;
