import logo from "../../assets/Logo.svg";

const Logo = ({ width = "40", height = "auto", className = "" }) => (
  <img
    src={logo}
    alt="Synote Logo"
    style={{ width: `${width}px`, height }}
    className={className}
  />
);

export default Logo;
