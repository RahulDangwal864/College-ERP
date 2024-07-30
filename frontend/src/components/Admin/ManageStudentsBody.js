import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import AddStudentImage from "../../assets/AddStudentImage.png";
import DeleteImage from "../../assets/DeleteImage.png";
import "../../styles/Effects.css";
import NotificationToast from '../NotificationToast';
import AddStudentModal from './modals/AddStudentModal';
import RemoveStudentModal from './modals/RemoveStudentModal';
import UpdateStudentModal from './modals/UpdateStudentModal';

function ManageStudentsBody() {
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showRemoveStudentModal, setShowRemoveStudentModal] = useState(false);
    const [searchEmail, setSearchEmail] = useState('');
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [showUpdateStudentModal, setShowUpdateStudentModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [modalUpdated, setModalUpdated] = useState(false);

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleShowAddStudentModal = () => setShowAddStudentModal(true);
    const handleCloseAddStudentModal = () => {
        setShowAddStudentModal(false);
        setModalUpdated(!modalUpdated);
    }
    const handleShowRemoveStudentModal = () => setShowRemoveStudentModal(true);
    const handleCloseRemoveStudentModal = () => {
        setShowRemoveStudentModal(false);
        setModalUpdated(!modalUpdated);
    }
    const handleShowUpdateStudentModal = (student) => {
        setSelectedStudent(student);
        setShowUpdateStudentModal(true);
    };
    const handleCloseUpdateStudentModal = () => {
        setShowUpdateStudentModal(false);
        setModalUpdated(!modalUpdated);
    }

    const handleSearchChange = (e) => {
        setSearchEmail(e.target.value);
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/students");
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();

        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/courses");
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, [modalUpdated]);

    useEffect(() => {
        const filtered = students.filter(student => student.email.includes(searchEmail));
        setFilteredStudents(filtered.map(student => ({
            ...student,
            courseName: courses.find(course => course._id === student.course)?.name
        })));
    }, [searchEmail, students, courses]);

    return (
        <div className="d-flex justify-content-center">
            <div>
                <div className="d-flex mx-5">
                    <Card
                        className="m-3 p-3 shadow align-items-center pe-auto"
                        style={{ width: "18rem" }}
                        onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                        onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                        onClick={handleShowAddStudentModal}
                        role='button'
                    >
                        <Card.Img
                            className="p-0"
                            variant="top"
                            src={AddStudentImage}
                            style={{ width: "5rem", height: "5rem" }}
                        />
                        <Card.Body className="d-flex align-items-center">
                            <div>
                                <Card.Title>Add Student</Card.Title>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card
                        className="m-3 mx-5 p-3 shadow align-items-center"
                        style={{ width: "18rem" }}
                        onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                        onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                        role='button'
                        onClick={handleShowRemoveStudentModal}
                    >
                        <Card.Img
                            className="p-0 rounded-circle"
                            variant="top"
                            src={DeleteImage}
                            style={{ width: "5rem", height: "5rem" }}
                        />
                        <Card.Body className="d-flex align-items-center">
                            <div>
                                <Card.Title>Remove Student</Card.Title>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="mt-4 mx-5 p-4 pt-3 border border-3 border-success rounded-4" style={{ width: "42rem" }}>
                    <Form>
                        <Form.Group controlId="searchEmail">
                            <Form.Label>Search by Email</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter student's email"
                                    value={searchEmail}
                                    onChange={handleSearchChange}
                                />
                                <button className="btn btn-success" type="button">Search</button>
                            </div>
                        </Form.Group>
                    </Form>

                    <div className='mt-3 border border-2 rounded-2 '>
                        <div className="d-flex w-100">
                            <Col xs={3} className="p-3 px-4 fw-bold">Name</Col>
                            <Col xs={3} className="p-3 px-2 fw-bold">Course</Col>
                            <Col xs={4} className="p-3 px-0 fw-bold">Email</Col>
                        </div>
                        <hr className="text-black m-0" />
                        <div className="scrollable-container" style={{ height: '160px', overflowY: 'auto' }}>
                            {filteredStudents
                                .sort((a, b) => a.email.localeCompare(b.email))
                                .map(student => (
                                    <div
                                        className='d-flex bg-hover-div'
                                        key={student._id}
                                        role='button'
                                        onClick={() => handleShowUpdateStudentModal(student)}
                                    >
                                        <Row className="w-100">
                                            <Col xs={3} className="p-4">
                                                <p className="px-3 mb-0 fw-bold" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.name}</p>
                                            </Col>

                                            <Col xs={3} className="p-4">
                                                <p className="mb-0 text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.course.name}</p>
                                            </Col>
                                            <Col xs={4} className="pt-3">
                                                <p className="mb-0 text-muted overflow-auto">{student.email}</p>
                                            </Col>
                                            <Col xs={2} className="px-4 pt-4 ">
                                                <i className="bi bi-pencil-square"> Edit</i>
                                            </Col>
                                        </Row>

                                    </div>
                                ))}
                        </div>
                    </div>
                </div >
                <AddStudentModal show={showAddStudentModal} handleClose={handleCloseAddStudentModal} setMessage={setMessage} handleShowToast={handleShowToast} />
                <RemoveStudentModal show={showRemoveStudentModal} handleClose={handleCloseRemoveStudentModal} setMessage={setMessage} handleShowToast={handleShowToast} />
                <UpdateStudentModal show={showUpdateStudentModal} handleClose={handleCloseUpdateStudentModal} student={selectedStudent} setMessage={setMessage} handleShowToast={handleShowToast} />
                <NotificationToast show={showToast} setShow={setShowToast} message={message} />
            </div>
        </div>
    )
}

export default ManageStudentsBody;
