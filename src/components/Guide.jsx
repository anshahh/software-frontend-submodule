import React, { useState, useEffect } from 'react';
import './styles.css';

const Guide = () => {
  const [students, setStudents] = useState([
    { name: 'John', registerNumber: '011', projectType: 'MAJOR', status: 'Complete' },
    { name: 'Jane', registerNumber: '012', projectType: 'MINOR', status: 'Incomplete' },
    { name: 'Ria D', registerNumber: '013', projectType: 'MAJOR', status: 'Complete' },
    { name: 'Brown', registerNumber: '044', projectType: 'MAJOR', status: 'Complete' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [marks, setMarks] = useState({
    depth: '',
    workDone: '',
    exceptionalWork: '',
    viva: '',
    presentation: '',
    report: '',
    attendance: '',
  });

  const fieldDisplayNames = {
    depth: 'Depth of Understanding',
    workDone: 'Work done and Results',
    exceptionalWork: 'Exceptional Work',
    viva: 'Viva-Voce',
    presentation: 'Presentation',
    report: 'Report',
    attendance: 'Attendance',
  };

  useEffect(() => {
    if (currentStudent) {
      // Fetch stored marks for the current student from localStorage
      const savedMarks = localStorage.getItem(currentStudent.registerNumber);
      if (savedMarks) {
        setMarks(JSON.parse(savedMarks));
      }
    }
  }, [currentStudent]);

  const openModal = (student) => {
    if (student.status === 'Complete') {
      setCurrentStudent(student);
      setModalOpen(true);
    } else {
      alert('Evaluation not completed. You cannot enter marks.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentStudent(null);
  };

  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({ ...prevMarks, [name]: value }));
  };

  const submitMarks = () => {
    if (Object.values(marks).some((mark) => mark === '')) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate each field
    const depth = parseInt(marks.depth);
    const workDone = parseInt(marks.workDone);
    const exceptionalWork = parseInt(marks.exceptionalWork);
    const viva = parseInt(marks.viva);
    const presentation = parseInt(marks.presentation);
    const report = parseInt(marks.report);
    const attendance = parseInt(marks.attendance);

    if (depth < 0 || workDone < 0 || exceptionalWork < 0 || viva < 0 || presentation < 0 || report < 0 || attendance < 0) {
      alert('Marks cannot be negative.');
      return;
    }
    if (depth > 12) {
      alert('Maximum marks for "Depth of Understanding" is 12.');
      return;
    }
    if (workDone > 18) {
      alert('Maximum marks for "Work done and Results" is 18.');
      return;
    }
    if (exceptionalWork > 6) {
      alert('Maximum marks for "Exceptional Work" is 6.');
      return;
    }
    if (viva > 12) {
      alert('Maximum marks for "Viva-Voce" is 12.');
      return;
    }
    if (presentation > 6) {
      alert('Maximum marks for "Presentation" is 6.');
      return;
    }
    if (report > 3) {
      alert('Maximum marks for "Report" is 3.');
      return;
    }
    if (attendance > 3) {
      alert('Maximum marks for "Attendance" is 3.');
      return;
    }

    const totalMarks = depth + workDone + exceptionalWork + viva + presentation + report + attendance;
    if (totalMarks > 60) {
      alert('Total marks cannot exceed 60. Please adjust the marks.');
      return;
    }

    if (currentStudent) {
      localStorage.setItem(currentStudent.registerNumber, JSON.stringify(marks));
      alert('Marks have been successfully submitted!');
      closeModal();
    }
  };

  return (
    <div className="examiner-container">
      {/* Header */}
      <div className="header">
        GUIDE MODE
      </div>

      {/* Image Section */}
      <div className="image-container">
        
      </div>

      {/* Student List Title */}
      <h1 className="student-list-title">STUDENT LIST</h1>

      {/* Student Table */}
      <div className="table-container">
        <table id="studentsTable">
          <thead>
            <tr>
              <th>STUDENT NAME</th>
              <th>REGISTER NUMBER</th>
              <th>PROJECT TYPE</th>
              <th>PRESENTATION STATUS</th>
              <th>ENTER MARKS</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.registerNumber} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{student.name}</td>
                <td>{student.registerNumber}</td>
                <td>{student.projectType}</td>
                <td className={student.status === 'Complete' ? 'status-complete' : 'status-incomplete'}>
                  {student.status}
                </td>
                <td>
                  <button onClick={() => openModal(student)}
                    className={localStorage.getItem(student.registerNumber) ? 'button-edit' : ''}>
                    {localStorage.getItem(student.registerNumber) ? 'Edit Marks' : 'Enter Marks'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit All Marks Button */}
      <div className="submit-button-container">
        <button onClick={() => alert('Marks updated successfully.')}>
          Submit All Marks
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="enter-marks">Enter Marks for {currentStudent?.name}</h2>
            <div className="modal-form">
              {Object.keys(marks).map((field) => (
                <div key={field} className="modal-field">
                  <label className="modal-label">{fieldDisplayNames[field]}</label>
                  <input
                    type="number"
                    name={field}
                    value={marks[field]}
                    onChange={handleMarksChange}
                    className="modal-input"
                  />
                </div>
              ))}
            </div>
            <div className="button-group">
              <button onClick={submitMarks}>Submit Marks</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
