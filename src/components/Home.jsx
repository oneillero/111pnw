import React, { useState, useEffect, useRef } from 'react';
import MemberSignUpPopUp from './popups/MemberSignUpPopUp';
import LoginPopup from './popups/LoginPopup';
import anime from 'animejs';
import { GoogleLogin } from "react-google-login";

const Home = () => {
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

  const handleGoogleLoginSuccess = (response) => {
    console.log('Login Success:', response.profileObj);
    
  };

  const handleGoogleLoginFailure = (response) => {
    console.log('Login Failed:', response);
    
  };

  useEffect(() => {
    const textWrapper = textWrapperRef.current;
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
      .add({
        targets: '.ml3 .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i + 1)
      }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '100px' }}>
        <div style={{ flex: 2, marginRight: '20px' }}>
          <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h1 className="ml3" style={{ fontSize: '4.5em', color: '#eee', margin: '0', textAlign: 'center' }}>111PNW <br /><span style={{ fontSize: '20px' }}>Unwind | Unearth | Uplift</span></h1>
            </div>
            <div className="card-body" style={{ justifyContent: 'flex-start', flex: 1 }}>
              <p className="card-text">
                <span className="ml3" ref={textWrapperRef} style={{ fontSize: '22px', fontWeight: 'bold', color: '#ddd' }}>A wellness oasis with coastal libations and breathtaking views.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <div className="card-container" style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
          <button
            className="btn btn-primary"
            onClick={handleMemberSignUpClick}
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e' }}
          >
            Member Sign Up
          </button>

          <GoogleLogin
            clientId="91777002982-vfaf22j86bbon3shtgamuns8vcg9sq1i.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy="single_host_origin"
          />

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

export default Home;
