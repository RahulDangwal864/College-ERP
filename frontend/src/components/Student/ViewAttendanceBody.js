import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import { Col, Row } from 'react-bootstrap';
import ManageAttendanceImage from "../../assets/ManageAttendanceImage.png";
import TotalLectureImage from "../../assets/TotalLectureImage.png";
import Card from "react-bootstrap/Card";
import NotificationToast from '../NotificationToast';

function ViewAttendanceBody() {
    const [student, setStudent] = useState({});
    const [attendance, setAttendance] = useState(0);
    const [totalLecture, setTotalLecture] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("jwt");

            if (token) {
                const decodedToken = jwtDecode(token);
                const { id } = decodedToken;
                try {
                    const response = await fetch(`http://localhost:5173/api/students/${id}`);
                    if (response.ok) {
                        const studentData = await response.json();
                        setStudent(studentData);
                        setAttendance(studentData.attendance);
                    } else {
                        console.error('Failed to fetch student data');
                    }
                } catch (error) {
                    setMessage("Somethigh went wrong");
                    handleShowToast();
                    console.error('Error fetching student data:', error);
                }
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchTotalAttendance = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/students/total-attendance", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch Total Attendance');
                }
                const data = await response.json();
                setTotalLecture(data.updatedAttendance.attendance);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTotalAttendance();
    }, []);

    const calculateAttendancePercentage = () => {
        if (totalLecture === 0) return 0;
        return ((attendance / totalLecture) * 100).toFixed(2);
    };

    return (
        <div className="d-flex justify-content-center">
            <div>
                <div className="d-flex mx-5 justify-content-center">
                    <Card
                        className="m-3 p-3 shadow align-items-center pe-auto"
                        style={{ width: "18rem" }}
                        onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                        onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                    >
                        <Card.Img
                            className="p-0"
                            variant="top"
                            src={ManageAttendanceImage}
                            style={{ width: "5rem", height: "5rem" }}
                        />
                        <Card.Body className="d-flex align-items-center">
                            <div>
                                <Card.Title>Attendance: {calculateAttendancePercentage()}%</Card.Title>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card
                        className="m-3 p-3 shadow align-items-center pe-auto"
                        style={{ width: "18rem" }}
                        onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                        onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                    >
                        <Card.Img
                            className="p-0"
                            variant="top"
                            src={TotalLectureImage}
                            style={{ width: "5rem", height: "5rem" }}
                        />
                        <Card.Body className="d-flex align-items-center">
                            <div>
                                <Card.Title>Total Lectures: {totalLecture}</Card.Title>
                                <Card.Text></Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="mt-4 mx-5 p-4 border border-3 border-success rounded-4 shadow" style={{ width: "42rem" }}>
                    <div className='mt-1 border border-2 rounded-2 '>
                        <div className="d-flex w-100">
                            <Col xs={3} className="p-3 fw-bold text-center">Course</Col>
                            <Col xs={5} className="p-3 fw-bold text-center">Total Lectures Attended</Col>
                            <Col xs={4} className="p-3 fw-bold text-center">Total Lectures</Col>
                        </div>
                        <hr className="text-black m-0" />
                        <div className="scrollable-container" style={{ height: '200px', overflowY: 'auto' }}>
                            <div
                                className='d-flex bg-hover-div'
                                key={student._id}
                                role='button'
                            >
                                <Row className="w-100">
                                    <Col xs={4} className="p-4" style={{ width: "180px" }}>
                                        <p className="mb-0 text-muted text-center" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.course ? student.course.name : 'Fetching...'}</p>
                                    </Col>
                                    <Col xs={4} className="p-4" style={{ width: "230px" }}>
                                        <p className="mb-0 text-muted overflow-auto text-center">{attendance}</p>
                                    </Col>
                                    <Col xs={4} className="p-4">
                                        <p className="mb-0 text-muted text-center">{totalLecture}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div >
                </div>
                <NotificationToast show={showToast} setShow={setShowToast} message={message} />
            </div>
        </div>
    )
}

export default ViewAttendanceBody;