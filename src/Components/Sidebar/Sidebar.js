import "./Sidebar.css";
import logo from "../../assets/logo.png";
import dashboard from "../../assets/dashboard.svg";
import orders from "../../assets/orders.svg";
import products from "../../assets/products.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img className="sidebar-logo" src={logo} alt="logo" />
        <span>A.T. Inks</span>
      </div>
      <ul className="nav-links">
        <li className="nav-link">
          <img className="nav-link-svg" src={dashboard} alt="logo" />
          <span className="nav-link-title">Dashboard</span>
        </li>
        <li className="nav-link">
          <img className="nav-link-svg" src={products} alt="logo" />
          <span className="nav-link-title">All Products</span>
        </li>
        <li className="nav-link">
          <img className="nav-link-svg" src={orders} alt="logo" />
          <span className="nav-link-title">Orders</span>
        </li>
        <li className="nav-link">
          <img className="nav-link-svg" src={products} alt="logo" />
          <span className="nav-link-title">Favorites</span>
        </li>
        <li className="nav-link">
          <img className="nav-link-svg" src={products} alt="logo" />
          <span className="nav-link-title">New Arrival</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
