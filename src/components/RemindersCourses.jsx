import React from 'react';
import { Link } from 'react-router-dom';

const RemindersCourses = () => {
    return (
        <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Reminders</h2>
                <ul className="list-disc list-inside">
                    <li>Prototype Submission on 27th September.</li>
                    <li>DFD Submission deadline extended.</li>
                    <li>Guide Allotment Results are now released.</li>
                </ul>
            </div>

            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                <div className="flex flex-col space-y-4">
                    <Link to="/btech/guide-allotment" className="w-full">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full flex justify-between items-center">
                            <span>Allotment</span>
                            <span className="ml-2">→</span>
                        </button>
                    </Link>
                    
                    <Link to="/feedback" className="w-full">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg w-full flex justify-between items-center">
                            <span>Feedback</span>
                            <span className="ml-2">→</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RemindersCourses;