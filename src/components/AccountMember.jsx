import React, { useState, useEffect } from 'react';

const AccountMember = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  // Get member data on component mount
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch('/api/members', { method: 'GET' });
        const data = await response.json();
        if (response.ok) {
          // Assume that the logged in user is the first one in the data array
          setMembers(data.members);
          console.log('Member data:', data)
        } else {
          setError('Failed to fetch member data');
        }
      } catch (err) {
        console.error('Failed to fetch member data:', err);
        setError('Failed to fetch member data');
      }
    };

    fetchMemberData();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '100px' }}>
        <div style={{ flex: 2, marginRight: '20px' }}>
          <div className="card" style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: '0 20px' }}>
            <div className="card-body" style={{ justifyContent: 'center', flex: 1, display: 'flex', alignItems: 'center' }}>
              <div className="card-text" style={{ width: '1200px', height: '80%', fontSize: '22px', fontWeight: 'bold', color: '#ddd', overflow: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.6)', textAlign: 'center', padding: '10px' }}>
                {
                  members.map((m) => {
                    return (
                      <div key={m._id}>
                        <strong>ID:</strong> {m._id}
                        <br /><br />
                        <strong>Name:</strong> {m.name}
                        <br /><br />
                        <strong>Email:</strong> {m.email}
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <div>{error}</div>}
      <footer style={{ background: '#d4ccc9', padding: '20px', textAlign: 'center', position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
        111PNW | Made with &#x2665; | ERO
      </footer>
      <style>
        {`
          /* Hide the test mode button using CSS */
          button[data-testid="disabled-stripe-button"] {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default AccountMember;
