import { Link, useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";

const Navbar = () => {
  const { loggedInMember, setLoggedInMember } = useUserContext();
  const navigate = useNavigate();

  const handleMemberLogout = () => {
    setLoggedInMember("");
    navigate("/"); // Redirects to Home.jsx
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand" style={{ paddingLeft: '32px' }}>
            111PNW
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              {loggedInMember && (
                <>
                  <li className="nav-item">
                    <Link to="/surf" className="nav-link">
                      Surf
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/accountmember" className="nav-link">
                      Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span onClick={handleMemberLogout} className="nav-link clickable">
                      Logout
                    </span>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cuisine" className="nav-link">
                  Cuisine
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/space" className="nav-link">
                  Space
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/bb" className="nav-link">
                  B&B
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/events" className="nav-link">
                  Events
                </Link>
              </li>
            </ul>
            {loggedInMember && (
              <div className="navbar-text" style={{ paddingRight: '30px' }}>
                <span className="name">{loggedInMember.name}</span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );  
};

export default Navbar;
