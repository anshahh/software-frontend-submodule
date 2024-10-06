import React from 'react';

const StudentStatus = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#e5e7eb' }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px', backgroundColor: '#6366f1', color: 'white', padding: '10px', borderRadius: '8px' }}>Student: Jane</h2>
                <p style={{ fontSize: '18px', marginBottom: '8px' }}>Guide Name: Mr. AmritPal</p>
                <p style={{ fontSize: '18px', marginBottom: '8px' }}>Examiner Name: Ms. Sima Rai</p>

                <div style={{ marginTop: '24px', backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', border: '1px solid #d1d5db', display: 'inline-block' }}>
                    <p style={{ fontSize: '16px', color: '#4b5563' }}>The presentation is pending.</p>
                    <p style={{ fontSize: '16px', fontWeight: 600, marginTop: '16px' }}>Scheduled Date:</p>
                    <p style={{ fontSize: '16px', color: '#6366f1' }}>Oct 10, 2024</p>
                    <p style={{ fontSize: '16px', fontWeight: 600, marginTop: '8px' }}>Time:</p>
                    <p style={{ fontSize: '16px', color: '#6366f1' }}>GUIDE EVALUATION: 2:00 PM - 2:30 PM</p>
                    <p style={{ fontSize: '16px', color: '#6366f1' }}>EXAMINER EVALUATION: 2:30 PM - 3:00 PM</p>
                </div>
            </div>
        </div>
    );
};

export default StudentStatus;
