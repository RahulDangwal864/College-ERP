import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import CourseImage from "../../assets/CourseImage.png";
import FacultyImage from "../../assets/FacultyImage.png";
import FeesImage from "../../assets/FeesImage.png";
import StudentImage from "../../assets/StudentImage.png";

function AdminBody() {
  const [totalFaculties, setTotalFaculties] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourse, setTotalCourse] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5173/api/faculty/")
      .then((response) => response.json())
      .then((data) => setTotalFaculties(data.length))
      .catch((error) => console.error("Error fetching faculties:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5173/api/students/")
      .then((response) => response.json())
      .then((data) => setTotalStudents(data.length))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5173/api/courses/")
      .then((response) => response.json())
      .then((data) => setTotalCourse(data.length))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-stretch mt-4 mx-5">
      {/* Faculty Card */}
      <Link to="/admin/dashboard/manage-faculty" title="Manage Faculty" className="text-decoration-none">
        <Card
          className="m-3 p-3 shadow-lg rounded-lg border-0"
          style={{ width: "20rem", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
          }}
        >
          <Card.Body className="d-flex align-items-center">
            <Card.Img className="me-3" variant="top" src={FacultyImage} style={{ width: "6rem", height: "6rem", borderRadius: "50%" }} />
            <div>
              <Card.Title className="mb-1">Faculty</Card.Title>
              <Card.Text className="fs-4">{totalFaculties}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Link>

      {/* Students Card */}
      <Link to="/admin/dashboard/manage-students" title="Manage Students" className="text-decoration-none">
        <Card
          className="m-3 p-3 shadow-lg rounded-lg border-0"
          style={{ width: "20rem", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
          }}
        >
          <Card.Body className="d-flex align-items-center">
            <Card.Img className="me-3" variant="top" src={StudentImage} style={{ width: "6rem", height: "6rem", borderRadius: "50%" }} />
            <div>
              <Card.Title className="mb-1">Students</Card.Title>
              <Card.Text className="fs-4">{totalStudents}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Link>

      {/* Courses Card */}
      <Link to="/admin/dashboard/manage-courses" title="Manage Courses" className="text-decoration-none">
        <Card
          className="m-3 p-3 shadow-lg rounded-lg border-0"
          style={{ width: "20rem", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
          }}
        >
          <Card.Body className="d-flex align-items-center">
            <Card.Img className="me-3" variant="top" src={CourseImage} style={{ width: "6rem", height: "6rem", borderRadius: "50%" }} />
            <div>
              <Card.Title className="mb-1">Courses</Card.Title>
              <Card.Text className="fs-4">{totalCourse}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Link>

      {/* Fees Card */}
      <Card
        className="m-3 p-3 shadow-lg rounded-lg border-0"
        style={{ width: "20rem", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        }}
      >
        <Card.Body className="d-flex align-items-center">
          <Card.Img className="me-3" variant="top" src={FeesImage} style={{ width: "6rem", height: "6rem", borderRadius: "50%" }} />
          <div>
            <Card.Title className="mb-1">Total Fees</Card.Title>
            <Card.Text className="fs-4">89,000$</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminBody;
