import React, { useState, useEffect } from 'react';

function StudentPage() {
  const [openElectives, setOpenElectives] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [totalStudents, setTotalStudents] = useState(0);

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

  useEffect(() => {
    // Calculate total students
    if (selectedCourse) {
      const fetchTotalStudents = async () => {
        try {
          const response = await fetch(`/api/courses/${selectedCourse._id}/total-students`);
          const data = await response.json();
          if (response.ok) {
            setTotalStudents(data.total);
          } else {
            throw new Error(data.message || "Failed to fetch total students.");
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };

      fetchTotalStudents();
    }
  }, [selectedCourse]);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleSubmit = () => {
    if (selectedCourse) {
      const currentTime = new Date().toLocaleString();
      setSuccessMessage(`Successfully selected: ${selectedCourse.open_elective} at ${currentTime}`);
  
      // Update total-students for the selected course
      fetch(`/api/courses/${selectedCourse.courseCode}/increment-total-students`, {
        method: 'POST',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to increment total students.');
          }
          // Increment totalStudents state by 1
          // setTotalStudents(prevTotalStudents => prevTotalStudents + 1);
        })
        .catch(error => console.error('Error incrementing total students:', error));
    } else {
      setSuccessMessage('Please select a course first.');
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
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                <input
                  type="radio"
                  name="selectedElective"
                  onClick={() => handleSelectCourse(elective)}
                  disabled={totalStudents >= 60 || elective.totalStudents >= 60} // Disable if total students is >= 60
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleSubmit} 
          disabled={!selectedCourse || totalStudents >= 60} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: totalStudents >= 60 ? 'gray' : 'blue',
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
