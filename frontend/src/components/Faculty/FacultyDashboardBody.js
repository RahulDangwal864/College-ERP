import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import StudentImage from "../../assets/StudentImage.png";
import ManageProfileImage from "../../assets/ManageProfileImage.png";
import ManageAttendanceImage from "../../assets/ManageAttendanceImage.png";
import SalaryImage from "../../assets/SalaryImage.png";

function FacultyBody() {
    const [totalStudents, setTotalStudents] = useState(0);
    const [averageAttendance, setAverageAttendance] = useState(0);
    const [totalAttendance, setTotalAttendance] = useState(0);

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
                setTotalAttendance(data.updatedAttendance.attendance);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTotalAttendance();

        const fetchStudentsData = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/students/");
                const data = await response.json();
                setTotalStudents(data.length);

                let sum = 0;
                data.forEach((student) => {
                    sum = sum + student.attendance;
                });

                if (data.length > 0 && totalAttendance !== 0) {
                    const average = (sum / data.length) * 100 / totalAttendance;
                    setAverageAttendance(average.toFixed(2));
                } else {
                    setAverageAttendance(0);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudentsData();
    }, [totalAttendance]);


    return (
        <div className="d-flex justify-content-center">
            <div>
                <div className="d-flex mt-5 mx-5">
                    <Link
                        to={"/faculty/dashboard/manage-profile"}
                        data-mdb-tooltip-init
                        title="Click to edit your profile"
                        className="text-decoration-none"
                    >
                        <Card
                            className="m-3 p-4 shadow"
                            style={{ width: "18rem" }}
                            onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                            onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                        >
                            <div className="d-flex">
                                <Card.Img
                                    className="p-0"
                                    variant="top"
                                    src={ManageProfileImage}
                                    style={{ width: "7rem", height: "7rem", borderRadius: "50%" }}
                                />
                                <Card.Body className="d-flex align-items-center">
                                    <div>
                                        <Card.Title>Profile</Card.Title>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                    </Link>

                    <Link to={"/faculty/dashboard/manage-attendance"}
                        data-mdb-tooltip-init
                        title="Manage Attendance"
                        className="text-decoration-none"
                    >
                        <Card
                            className="m-3 p-4 shadow"
                            style={{ width: "18rem" }}
                            onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                            onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                        >
                            <div className="d-flex">
                                <Card.Img
                                    className="p-0"
                                    variant="top"
                                    src={ManageAttendanceImage}
                                    style={{ width: "7rem", height: "7rem", borderRadius: "50%" }}
                                />
                                <Card.Body className="d-flex align-items-center">
                                    <div>
                                        <Card.Title>Attendance</Card.Title>
                                        <Card.Text>Average {averageAttendance}</Card.Text>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                    </Link>
                </div>

                <div className="d-flex mx-5">
                    <Link
                        data-mdb-tooltip-init
                        title="Current Salary"
                        className="text-decoration-none"
                    >
                        <Card
                            className="m-3 p-4 shadow"
                            style={{ width: "18rem" }}
                            onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                            onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                        >
                            <div className="d-flex">
                                <Card.Img
                                    className="p-0"
                                    variant="top"
                                    src={SalaryImage}
                                    style={{ width: "7rem", height: "7rem", borderRadius: "50%" }}
                                />
                                <Card.Body className="d-flex align-items-center">
                                    <div>
                                        <Card.Title>Salary</Card.Title>
                                        <Card.Text>400$</Card.Text>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                    </Link>

                    <Link to={"/faculty/dashboard/view-students"}
                        data-mdb-tooltip-init
                        title="View Students"
                        className="text-decoration-none"
                    >
                        <Card
                            className="m-3 p-4 shadow"
                            style={{ width: "18rem" }}
                            onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                            onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                        >
                            <div className="d-flex">
                                <Card.Img
                                    className="p-0"
                                    variant="top"
                                    src={StudentImage}
                                    style={{ width: "7rem", height: "7rem", borderRadius: "2%" }}
                                />
                                <Card.Body className="d-flex align-items-center">
                                    <div>
                                        <Card.Title>Students</Card.Title>
                                        <Card.Text>{totalStudents}</Card.Text>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FacultyBody;
