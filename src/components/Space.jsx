import React from 'react';
import { Link } from 'react-router-dom';
import useUserContext from "../hooks/useUserContext";

const Space = () => {
  const { loggedInUser } = useUserContext();

  if (loggedInUser) {
    // User is logged in, return null to prevent rendering the component
    return null;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '100px' }}>
        <div style={{ flex: 2, marginRight: '20px' }}>
          <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: '0 20px' }}>
            <div className="card-body" style={{ justifyContent: 'center', flex: 1, display: 'flex', alignItems: 'center' }}>
              <div 
                className="card-text" 
                style={{ width: '1200px', height: '60%', fontSize: '22px', fontWeight: 'bold', color: '#ddd', overflow: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', padding: '10px' }} 
              >
                {/* Add your actual Space content here */}
                <strong>Health and Wellness Space</strong>
                <br></br>
                <br></br>
                <span style={{ fontWeight: 300 }}>Immerse yourself in our serene health and wellness space, designed to rejuvenate your body, mind, and spirit.</span>

                <br/><br/>

                <strong>Relaxation with a View</strong>

                <br/><br/>

                <span style={{ fontWeight: 300 }}>Unwind in our hot tub with breathtaking views, melt away stress in our sauna and steam room, and experience pure relaxation amidst the beauty of nature.</span>

                <br/><br/>

                <strong>Enlightenment through Learning</strong>

                <br/><br/>

                <span style={{ fontWeight: 300 }}>Expand your knowledge and nourish your intellect with our engaging lectures, science classes, and cooking classes. Discover new perspectives and deepen your understanding of holistic well-being.</span>

                <br/><br/>

                <strong>Nurture Your Body and Soul</strong>

                <br/><br/>

                <span style={{ fontWeight: 300 }}>Indulge in revitalizing yoga classes, where experienced instructors guide you through rejuvenating poses and meditation. Explore a wide range of modalities with our skilled practitioners, offering personalized sessions to enhance your well-being.</span>

                <br/><br/>

                Discover a sanctuary of wellness where you can nurture your body, mind, and soul.

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <div className="card-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e' }}
          >
            View Schedule
          </button>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e' }}
          >
            Book a Session
          </button>
        </div>
      </div>

      <footer style={{ background: '#d4ccc9', padding: '20px', textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        111PNW | Made with &#x2665; | ERO
      </footer>
    </div>
  );
};

export default Space;
