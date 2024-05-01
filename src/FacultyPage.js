import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FacultyPage.css';
import Header from './Header';
import Footer from './Footer';


function RegistrationForm() {
  const [formData, setFormData] = useState({
    open_elective: '',
    faculty: '',
    department: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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

  // Form JSX goes here (unchanged)


  return (
    <form onSubmit={handleSubmit}>
      <h2>Faculty Registration For New Course</h2>
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
        <label>Faculty</label>
        <input
          type="text"
          name="faculty"
          value={formData.faculty}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
