import React from 'react';
import { Link } from 'react-router-dom';
import useUserContext from "../hooks/useUserContext";

const Surf = () => {

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '100px' }}>
        <div style={{ flex: 2, marginRight: '20px' }}>
          <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: '0 20px' }}>
            <div className="card-body" style={{ justifyContent: 'center', flex: 1, display: 'flex', alignItems: 'center' }}>
              <div 
                className="card-text" 
                style={{ width: '1200px', height: '80%', fontSize: '22px', fontWeight: 'bold', color: '#ddd', overflow: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', padding: '10px' }} 
              >
                {/* Add your actual About Member content here */}
                <strong>Featured Artists</strong>
                <br /><br />
                <span style={{ fontWeight: 300 }}>Indulge in a culinary journey with our exquisite cuisine. We offer a wide range of dishes inspired by local flavors and global traditions.</span>

                <br /><br />

                <strong>Lessons and Groups</strong>
                <br /><br />
                <span style={{ fontWeight: 300 }}>Every ingredient is curated and hand selected to ensure quality. Much of our food comes from the Central Oregon Coast and up the Yachats River Valley. Each bite is a harmonious blend of flavors and textures.</span>

                <br /><br />

                <strong>Yachats Live-Stream Surf Cam</strong>
                <br /><br />
                <span style={{ fontWeight: 300 }}>Integrated into the architecture of 111PNW is our NFT greenhouse system. This is a cultivation method specifically designed to optimize yields and growth of plants. It utilizes a nutrient film technique (NFT) for efficient water and nutrient delivery. We grow a variety of herbs on site that we incorporate into our dishes. We also offer starts and seasonal tours. Please view the schedule below for tours and more information.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <div className="card-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e', marginRight: '10px' }}
          >
            Boards
          </button>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: '#ece8e1', borderColor: '#333c2e', marginLeft: '10px' }}
          >
            Surf
          </button>
        </div>
      </div>

      <footer style={{ background: '#d4ccc9', padding: '20px', textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        111PNW | Made with &#x2665; | ERO
      </footer>
    </div>
  );
};

export default Surf;