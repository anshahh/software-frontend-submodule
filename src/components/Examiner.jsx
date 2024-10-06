import React, { useState, useEffect } from 'react';
import './styles.css';

const Examiner = () => {
  const [students, setStudents] = useState([
    { name: 'Anshah', registerNumber: '001', projectType: 'MAJOR', status: 'Complete' },
    { name: 'Bhoomika', registerNumber: '002', projectType: 'MINOR', status: 'Incomplete' },
    { name: 'Alice', registerNumber: '003', projectType: 'MAJOR', status: 'Complete' },
    { name: 'Bob', registerNumber: '004', projectType: 'MAJOR', status: 'Complete' },
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
  });

  const fieldDisplayNames = {
    depth: 'Depth of Understanding',
    workDone: 'Work done and Results',
    exceptionalWork: 'Exceptional Work',
    viva: 'Viva-Voce',
    presentation: 'Presentation',
    report: 'Report',
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

    if (depth < 0 || workDone < 0 || exceptionalWork < 0 || viva < 0 || presentation < 0 || report < 0) {
      alert('Marks cannot be negative.');
      return;
    }
    if (depth > 8) {
      alert('Maximum marks for "Depth of Understanding" is 8.');
      return;
    }
    if (workDone > 12) {
      alert('Maximum marks for "Work done and Results" is 12.');
      return;
    }
    if (exceptionalWork > 6) {
      alert('Maximum marks for "Exceptional Work" is 6.');
      return;
    }
    if (viva > 8) {
      alert('Maximum marks for "Viva-Voce" is 8.');
      return;
    }
    if (presentation > 4) {
      alert('Maximum marks for "Presentation" is 4.');
      return;
    }
    if (report > 2) {
      alert('Maximum marks for "Report" is 2.');
      return;
    }

    const totalMarks = depth + workDone + exceptionalWork + viva + presentation + report;

    if (totalMarks > 40) {
      alert('Total marks cannot exceed 40. Please adjust the marks.');
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
      <div className="header">EXAMINER MODE</div>

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
                  <button
                    onClick={() => openModal(student)}
                    className={localStorage.getItem(student.registerNumber) ? 'button-edit' : ''}
                  >
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
        <button onClick={() => alert('Marks updated successfully.')}>Submit All Marks</button>
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

export default Examiner;
