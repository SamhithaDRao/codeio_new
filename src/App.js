import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Footer from './Footer';

import LoginPage from './LoginPage';
import DeanLogin from './DeanLogin';
import StudentLogin from './StudentLogin';
import FacultyLogin from './FacultyLogin';
import FacultyPage from './FacultyPage';
import StudentPage from './StudentPage';
import CourseList from './CourseList';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [courses, setCourses] = useState([]);
  const location = useLocation(); // Gets the current location

  useEffect(() => {
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleApprove = (courseCode) => {
    fetch(`/api/courses/approve/${courseCode}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setCourses(courses.map(course => 
          course.code === courseCode ? { ...course, approved: true } : course
        ));
      })
      .catch(error => console.error('Error approving course:', error));
  };

  const handleReject = (courseCode) => {
    fetch(`/api/courses/reject/${courseCode}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        setCourses(prevCourses => prevCourses.filter(course => course.code !== courseCode));
      })
      .catch(error => console.error('Error rejecting course:', error));
  };

  const handleStudentApprove = (courseId, studentId) => {
    fetch(`/api/courses/${courseId}/approve/student/${studentId}`, { method: 'POST' })
      .then(() => {
        setCourses(courses.map(course => {
          if (course.id === courseId) {
            return {
              ...course,
              students: course.students.map(student => 
                student.id === studentId ? { ...student, approved: true } : student
              )
            };
          }
          return course;
        }));
      })
      .catch(error => console.error('Error approving student:', error));
  };

  const handleStudentReject = (courseId, studentId) => {
    fetch(`/api/courses/${courseId}/reject/student/${studentId}`, { method: 'POST' })
      .then(() => {
        setCourses(courses.map(course => {
          if (course.id === courseId) {
            return {
              ...course,
              students: course.students.map(student => 
                student.id === studentId ? { ...student, approved: false } : student
              )
            };
          }
          return course;
        }));
      })
      .catch(error => console.error('Error rejecting student:', error));
  };

  const isLoginRoute = location.pathname === '/login' || location.pathname === '/dean-login' || location.pathname === '/student-login' || location.pathname === '/faculty-login';

  return (
    <>
      {isLoginRoute ? <Header /> : <Header />}
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dean-login" element={<DeanLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/main" element={
          <main>
            <CourseList 
              courses={courses}
              onApprove={handleApprove}
              onReject={handleReject}
              onStudentApprove={handleStudentApprove}
              onStudentReject={handleStudentReject}
            />
          </main>
        } />
        <Route path="/student-page" element={<StudentPage />} />
        <Route path="/faculty-page" element={<FacultyPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppWrapper;
