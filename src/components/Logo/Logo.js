import logo from "../../images/logo.svg";

import './logo.css'

function Logo() {
  return (
    <div className="logo">
      <a href="#" className="logo__link">
        <img src={logo} alt="лого" className="logo__image" />
      </a>
    </div>
  );
}

export default Logo;
