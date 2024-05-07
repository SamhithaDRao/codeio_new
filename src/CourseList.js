import React, { useState } from 'react';
import './App.css';
function CourseList({ courses, onApprove, onReject }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const selectedCourseDetails = courses.find((course) => course.id === selectedCourse);

  return (
    <div>
      <h2>Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Open Elective</th>
            <th>Total Students</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseCode}>
              <td>{course.courseCode}</td>
              <td>{course.open_elective}</td>
              <td>{course['total-students']}</td>
              <td>
                {course.approved ? (
                  <span>Approved!</span>
                ) : (
                  <>
                    <button className="approve-btn" onClick={() => onApprove(course.courseCode)}>Approve</button>
                    <button className="reject-btn" onClick={() => onReject(course.courseCode)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
