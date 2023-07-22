import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MemberSignUpPopUp from './popups/MemberSignUpPopUp';
import LoginPopup from './popups/LoginPopup';

const Events = () => {
  const [showMemberSignUpPopup, setShowMemberSignUpPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleMemberSignUpClick = () => {
    setShowMemberSignUpPopup(true);
    setShowLoginPopup(false);
  };

  const handleLoginClick = () => {
    setShowMemberSignUpPopup(false);
    setShowLoginPopup(true);
  };

  const handleClosePopup = () => {
    setShowMemberSignUpPopup(false);
    setShowLoginPopup(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '100px' }}>
        <div style={{ flex: 2, marginRight: '20px' }}>
          <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: '0 20px' }}>
            <div className="card-body" style={{ justifyContent: 'center', flex: 1, display: 'flex', alignItems: 'center' }}>
              <div 
                className="card-text" 
                style={{ width: '1200px', height: '75%', fontSize: '22px', fontWeight: 'bold', color: '#ddd', overflow: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', padding: '10px' }} 
              >
                {/* Add your actual Events content here */}
                <strong>Events</strong>
                <br />
                <br />

                <span style={{ fontWeight: 300 }}>Immerse yourself in the vibrant culture of 111PNW with our exciting events. From live music performances to wellness workshops, there's something for everyone.</span>
                
                <br />
                <br />
                <strong>Community Events</strong>
                <br />
                <br />

                <span style={{ fontWeight: 300 }}>Our events showcase the best of the Pacific Northwest, featuring talented local artists, chefs, and experts in various fields. Join us to experience the unique flavors, sounds, and knowledge of our region.</span>
                <br />
                <br />

                <strong>Classes and Courses</strong>
                <br />
                <br />

                <span style={{ fontWeight: 300 }}>Whether you're seeking inspiration, entertainment, or simply a fun night out, our events are designed to create memorable experiences for our guests.</span>
                
                <br />
                <br />
                <strong>Member Events</strong>
                <br />
                <br />
                <span style={{ fontWeight: 300 }}>View our upcoming events below and mark your calendar. We look forward to hosting you at 111PNW.</span>
                <br />
                <br />

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <div className="card-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button
            className="btn btn-primary"
            onClick={handleMemberSignUpClick}
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e' }}
          >
            View Events
          </button>
          <button
            className="btn btn-primary"
            onClick={handleLoginClick}
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e' }}
          >
            Book Events
          </button>
        </div>
      </div>

      {showMemberSignUpPopup && (
        <MemberSignUpPopUp handleClose={handleClosePopup} />
      )}

      {showLoginPopup && (
        <LoginPopup handleClose={handleClosePopup} />
      )}

      <footer style={{ background: '#d4ccc9', padding: '20px', textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        111PNW | Made with &#x2665; | ERO
      </footer>
    </div>
  );
};

export default Events;
