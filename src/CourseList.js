import React, { useState } from 'react';

function CourseList({ courses, onApprove, onReject, onStudentApprove, onStudentReject }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const selectedCourseDetails = courses.find((course) => course.id === selectedCourse);

  return (
    <div>
      <h2>Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Number of Students</th>
            <th>Actions</th>
            <th>Student Details</th>
          </tr>
        </thead>
        <tbody>
        {courses.map((course) => (
  <tr key={course.code}>
    <td>{course.code}</td>
    <td>{course.name}</td>
    <td>{course.students?.length || 0}</td>
    <td>
      {course.approved ? (
        <span>Approved!</span>
      ) : (
        <>
          <button className="approve-btn" onClick={() => onApprove(course.code)}>Approve</button>
          <button className="reject-btn" onClick={() => onReject(course.code)}>Reject</button>
        </>
      )}
    </td>
    <td>
      <button className="view-details-btn" onClick={() => setSelectedCourse(course.id)}>View Students</button>
    </td>
  </tr>
))}
        </tbody>
      </table>

      {selectedCourse && (
        <div>
          <h3>Students in {selectedCourseDetails?.code} - {selectedCourseDetails?.name}</h3>
          <table>
            <thead>
              <tr>
                <th>USN</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourseDetails?.students?.map((student) => (
                <tr key={student.id}>
                  <td>{student.usn}</td>
                  <td>{student.name}</td>
                  <td>
                    <button 
                      className="approve-btn" 
                      onClick={() => onStudentApprove(selectedCourseDetails.id, student.id)}
                    >
                      Approve
                    </button>
                    <button 
                      className="reject-btn" 
                      onClick={() => onStudentReject(selectedCourseDetails.id, student.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CourseList;
