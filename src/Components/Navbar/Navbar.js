import "./Navbar.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.svg";
import dropdown from "../../assets/dropdown.svg";
import search from "../../assets/search.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img className="navbar-logo-image" src={logo} alt="Checkout button" />
      </div>
      <div className="navbar-search">
        <img className="navbar-search-svg" src={search} alt="Checkout button" />
        <input type="Text" placeholder="Search..." />{" "}
      </div>
      <div>
        {/* <img src={checkout} alt="Checkout button" />
        <a className="profile-btn see-my-work--btn" href="www.com">Checkout(200)</a>
         */}
      </div>
      <div className="navbar-user">
        <img className="navbar-user-avatar" src={avatar} alt="user" />
        <span>User Admin </span>
        <img className="navbar-user-dropdown" src={dropdown} alt="user" />
      </div>
    </div>
  );
};

export default Navbar;
