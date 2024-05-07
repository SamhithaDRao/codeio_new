import React, { useState } from 'react';
import axios from 'axios';
import './FacultyPage.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    open_elective: '',
    faculty: '',
    department: '',
    courseCode: '' // New state property for course code
  });

  // Faculty based on department
  const facultyOptions = {
    "Computer Science": ["Syed Akram", "Namratha M", "Selva Kumar"],
    "Electrical Engineering": ["Chandasree Das", "Padmavathi K", "R S Geetha"],
    "Mechanical Engineering": ["Ram Rohit V", "Bheemsha", "Sharana Basavaraja"]
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === "department") {
      setFormData(prevState => ({ ...prevState, faculty: '' })); // Reset faculty when department changes
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/courses/register', formData);
      console.log(response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error('Failed to register the course:', error);
      alert("Failed to register the course");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Faculty Registration For New Course</h2>
      <div>
        <label>Course Code</label>
        <input
          type="text"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Course name</label>
        <input
          type="text"
          name="open_elective"
          value={formData.open_elective}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select a Department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
        </select>
      </div>
      <div>
        <label>Faculty</label>
        <select
          name="faculty"
          value={formData.faculty}
          onChange={handleChange}
          disabled={!formData.department}
        >
          <option value="">Select Faculty</option>
          {formData.department && facultyOptions[formData.department].map(faculty => (
            <option key={faculty} value={faculty}>{faculty}</option>
          ))}
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
