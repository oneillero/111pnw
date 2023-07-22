import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MemberSignUpPopUp from './popups/MemberSignUpPopUp';
import LoginPopup from './popups/LoginPopup';

const Bb = () => {
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
                {/* Add your actual B&B content here */}
                <strong>Bed and Breakfast</strong>
                <br />
                <br />

                <span style={{ fontWeight: 300 }}>Welcome to our mini bed and breakfast located at 111PNW. Experience luxury and comfort in the heart of the Pacific Northwest.</span>
                
                <br />
                <br />
                <strong>Rooms</strong>
                <br />
                <br />

                <span style={{ fontWeight: 300 }}>Each room is meticulously designed with your relaxation in mind. Enjoy breathtaking views of the surrounding nature, cozy up by the fireplace, and indulge in the tranquility that our B&B offers.</span>

                <br />
                <br />
                <strong>Amenities</strong>
                <br />
                <br />

                <span style={{ fontWeight: 300 }}>Our rooms are equipped with modern amenities and feature elegant furnishings. Whether you're looking for a romantic getaway or a peaceful retreat, our 4-room bed and breakfast is the perfect destination.</span>

                <br />
                <br />

                <span style={{ fontWeight: 300 }}>Explore the stunning landscapes, engage in outdoor activities, and savor delicious meals prepared with locally sourced ingredients. Your stay at our B&B will be a truly unforgettable experience.</span>

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
            View Rooms
          </button>
          <button
            className="btn btn-primary"
            onClick={handleLoginClick}
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e' }}
          >
            Book Rooms
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

export default Bb;
