import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';
import { useEffect } from 'react';

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem('user') && setLoggedInUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleMemberLogout = () => {
    setLoggedInUser('');
    localStorage.removeItem('user');
    navigate('/'); // Redirects to Home.jsx
  };

  const handleNavigate = () => {
    if (loggedInUser) {
      navigate('/memberDash'); // Redirects to MemberDash.jsx for logged-in users
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link
            to={loggedInUser ? '/memberDash' : '/home'}
            className="navbar-brand"
            style={{ paddingLeft: '32px' }}
          >
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
              {loggedInUser && (
                <>
                  <li className="nav-item">
                    <Link to="/about-member" className="nav-link">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cuisine-member" className="nav-link">
                      Cuisine
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/space-member" className="nav-link">
                      Space
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/bb-member" className="nav-link">
                      B&amp;B
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/events-member" className="nav-link">
                      Events
                    </Link>
                  </li>
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
              {!loggedInUser && (
                <>
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
                      B&amp;B
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/events" className="nav-link">
                      Events
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {loggedInUser && (
              <div className="navbar-text" style={{ paddingRight: '30px' }}>
                <span className="name">{loggedInUser.name}</span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
