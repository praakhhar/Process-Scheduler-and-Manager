import { FaHome } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="my-header">
      <div className="container">
        <header className="d-flex justify-content-between align-items-center py-3">
          <span
            className="navbar-brand my-navbar-heading"
            style={{ color: "#ECDFCC" }}
          >
            Process Manager
          </span>
          <ul className="nav nav-pills mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: "#ECDFCC" }}>
                <FaHome />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/add-process"
                style={{ color: "#ECDFCC" }}
                className="nav-link"
              >
                <IoMdAddCircle />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/analytics"
                style={{ color: "#ECDFCC" }}
                className="nav-link"
              >
                <IoStatsChart />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                style={{ color: "#ECDFCC" }}
                className="nav-link"
              >
                <IoIosInformationCircle />
              </Link>
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
};

export default Header;
