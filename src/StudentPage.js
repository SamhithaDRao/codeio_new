import React, { useState, useEffect } from 'react';

function StudentPage() {
  const [openElectives, setOpenElectives] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchOpenElectives = async () => {
      try {
        const response = await fetch('/api/courses/open-electives');
        const data = await response.json();
        if (response.ok) {
          setOpenElectives(data);
        } else {
          throw new Error(data.message || "Failed to fetch data.");
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchOpenElectives();
  }, []);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleSubmit = async () => {
    // Ensure total-students is treated as 0 if undefined
    const currentTotalStudents = selectedCourse['total-students'] ?? 0;
  
    if (selectedCourse && currentTotalStudents < 60) {
      const response = await fetch(`/api/courses/${selectedCourse.courseCode}/increment-total-students`, {
        method: 'POST',
      });
  
      if (response.ok) {
        const updatedCourse = {
          ...selectedCourse,
          'total-students': currentTotalStudents + 1
        };
        setOpenElectives(openElectives.map(course =>
          course._id === selectedCourse._id ? updatedCourse : course
        ));
        setSelectedCourse(updatedCourse);
  
        const currentTime = new Date().toLocaleString();
        setSuccessMessage(`Successfully selected: ${selectedCourse.open_elective} at ${currentTime}`);
      } else {
        const errorData = await response.json();
        setSuccessMessage(errorData.message || 'Failed to increment total students.');
      }
    } else {
      setSuccessMessage('Please select a course first or course is full.');
    }
  };
  

  return (
    <div className="open-electives-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Open Electives</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Open Elective</th>
            <th>Course Code</th>
            <th>Department</th>
            <th>Faculty</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
  {openElectives.map(elective => (
    <tr key={elective._id}>
      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{elective.open_elective}</td>
      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{elective.courseCode}</td>
      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{elective.department}</td>
      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{elective.faculty}</td>
      {elective['total-students'] >= 60 ? (
        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center', color: 'red' }}>
          Seats Filled
        </td>
      ) : (
        <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
          <input
            type="radio"
            name="selectedElective"
            onClick={() => handleSelectCourse(elective)}
          />
        </td>
      )}
    </tr>
  ))}
</tbody>

      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleSubmit} 
          disabled={!selectedCourse || selectedCourse['total-students'] >= 60} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: selectedCourse && selectedCourse['total-students'] >= 60 ? 'gray' : 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Submit
        </button>
      </div>
      {successMessage && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
}

export default StudentPage;
