import React, { useState, useEffect, useRef } from 'react';
import MemberSignUpPopUp from './popups/MemberSignUpPopUp';
import LoginPopup from './popups/LoginPopup';
import anime from 'animejs';

const About = () => {
  const [showMemberSignUpPopup, setShowMemberSignUpPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const textWrapperRef = useRef(null);

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
                {/* Add your actual About content here */}
                <strong>111PNW</strong>
                <br></br>
                <br></br>
                <span style={{ fontWeight: 300 }}>111PNW is a wellness oasis nestled in the heart of the Pacific Northwest. We offer a tranquil escape where you can unwind, unearth new experiences, and uplift your mind, body, and soul.</span>


                <br/><br/>

                <strong>Members</strong>

                <br/><br/>

                <span style={{ fontWeight: 300 }}>Members get discounts, options to sign up for local fishing trips, local hunting trips, local farm tours, and forest edible tours. There is also an annual event offered to the first 100 members that sign up. Membership is a 501(c)(3) non-profit donation and also includes free attendance to public lectures. Please sign up below if interested.</span>


                <br/><br/>

                <strong>Surf</strong>

                <br/><br/>

                <span style={{ fontWeight: 300 }}>Immerse yourself in the vibrant coastal culture of 111PNW, where we celebrate our oceans, waterways, and surfers. Our nonprofit offers events, surf lessons, access to our live surf cam, and locally crafted boards by talented shapers.</span>
                

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
            Member Sign Up
          </button>
          <button
            className="btn btn-primary"
            onClick={handleLoginClick}
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e' }}
          >
            Member Log In
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

export default About;

