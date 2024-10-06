import React from 'react';

const Student = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#E5E7EB' }}>
            <div style={{ backgroundColor: '#F3F4F6', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '800px' }}>
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px', color: 'white', padding: '8px', borderRadius: '4px', backgroundColor: '#6366F1' }}>
                        Student: Ria D
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '8px' }}>Guide Name: Mr. AmritPal</p>
                    <p style={{ fontSize: '18px', marginBottom: '16px' }}>Examiner Name: Ms. Sima Rai</p>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ minWidth: '100%', backgroundColor: '#E5E7EB', border: '1px solid #9CA3AF' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#6366F1', color: 'white' }}>
                                <th style={{ padding: '8px 16px', border: '1px solid' }}>Criteria</th>
                                <th style={{ padding: '8px 16px', border: '1px solid' }}>Guide Marks</th>
                                <th style={{ padding: '8px 16px', border: '1px solid' }}>Max Guide Marks</th>
                                <th style={{ padding: '8px 16px', border: '1px solid' }}>Examiner Marks</th>
                                <th style={{ padding: '8px 16px', border: '1px solid' }}>Max Examiner Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { criteria: 'Depth of Understanding', guideMarks: 10, maxGuideMarks: 12, examinerMarks: 7, maxExaminerMarks: 8 },
                                { criteria: 'Results and Work Done', guideMarks: 15, maxGuideMarks: 18, examinerMarks: 10, maxExaminerMarks: 12 },
                                { criteria: 'Exceptional Work', guideMarks: 5, maxGuideMarks: 6, examinerMarks: 5, maxExaminerMarks: 6 },
                                { criteria: 'Viva-Voce', guideMarks: 9, maxGuideMarks: 12, examinerMarks: 6, maxExaminerMarks: 8 },
                                { criteria: 'Presentation', guideMarks: 5, maxGuideMarks: 6, examinerMarks: 3, maxExaminerMarks: 4 },
                                { criteria: 'Report', guideMarks: 2, maxGuideMarks: 3, examinerMarks: 2, maxExaminerMarks: 2 },
                                { criteria: 'Attendance', guideMarks: 3, maxGuideMarks: 3, examinerMarks: '-', maxExaminerMarks: '-' }
                            ].map((row, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F9FAFB' : '#FFFFFF' }}>
                                    <td style={{ padding: '8px 16px', border: '1px solid' }}>{row.criteria}</td>
                                    <td style={{ padding: '8px 16px', border: '1px solid', textAlign: 'center' }}>{row.guideMarks}</td>
                                    <td style={{ padding: '8px 16px', border: '1px solid', textAlign: 'center' }}>{row.maxGuideMarks}</td>
                                    <td style={{ padding: '8px 16px', border: '1px solid', textAlign: 'center' }}>{row.examinerMarks}</td>
                                    <td style={{ padding: '8px 16px', border: '1px solid', textAlign: 'center' }}>{row.maxExaminerMarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ textAlign: 'right', marginTop: '24px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Total Marks: 49 (Guide) + 33 (Examiner) = <span style={{ color: '#4F46E5' }}>82/100</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Student;
