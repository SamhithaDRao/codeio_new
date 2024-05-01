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
        console.log("data");
        if (response.ok) {
          setOpenElectives(data);
          console.log(openElectives);
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

  const handleSubmit = () => {
    if (selectedCourse) {
      setSuccessMessage(`Successfully selected: ${selectedCourse.open_elective}`);
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
            <th>Department</th>
            <th>Faculty</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {openElectives.map(elective => (
            <tr key={elective._id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{elective.open_elective}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{elective.department}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{elective.faculty}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                <input
                  type="radio"
                  name="selectedElective"
                  onClick={() => handleSelectCourse(elective)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
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
