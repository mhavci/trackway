import React from "react";
import { Link } from "react-router-dom";
import { MdNotifications , MdPerson} from "react-icons/md";

export const Nav: React.FC = () => {
  return (
    <div className="head-container">
      <div className="mobile_nav">
        <button className="burger" title="Open and close menu">
        <span className="mobile_nav__label">Open and close menu</span>
        <div className="top stripe"></div>
        <div className="middle stripe"></div>
        <div className="bottom stripe"></div>
        </button>
      </div>
      <div className="mobile_menu">
        <nav>
          <ul>
            <li><Link to="/series">series</Link></li>
            <li><Link to="/movie">movie</Link></li>
          </ul>
        </nav>
      </div>
      <div className="logo">
        <span>trackWay</span>
      </div>
      <nav className="head_nav">
          <ul>
            <li><Link to="/series">series</Link></li>
            <li><Link to="/movie">movie</Link></li>
          </ul>
      </nav>
      <div className="icons">
        <div className="block">
        <a className="notification" href="?notifiacitons" title="Notifications">
          <MdNotifications />
        </a>
        </div>
        <div className="block">
        <a className="user_profile" href="?user_profile" title="User profile">
          <MdPerson />
        </a>
        </div>
        </div>
    </div>
  );
};
