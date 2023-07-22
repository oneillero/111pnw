import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const MemberDash = () => {
  const textWrapperRef = useRef(null);

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

      <footer style={{ background: '#d4ccc9', padding: '20px', textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        111PNW | Made with &#x2665; | ERO
      </footer>
    </div>
  );
};

export default MemberDash;
