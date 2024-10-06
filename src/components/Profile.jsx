import React from 'react';
import profpic from '../images/profile_dude.png';

const Profile = () => {
    return (
        <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full mb-8">
            <div className="flex items-center">
                <img src = {profpic} alt="Profile" className="w-32 h-32 rounded-full mr-6" />
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold mb-2">Geetha V.</h2>
                    <p className="text-lg">Head of Department</p>
                    <div className="flex space-x-4 text-lg">
                        <p>Admin | Associate Professor and Head</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;