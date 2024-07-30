import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import AddCourseImage from "../../assets/AddCourseImage.png";
import DeleteImage from "../../assets/DeleteImage.png";
import "../../styles/Effects.css";
import NotificationToast from '../NotificationToast';
import AddCourseModal from './modals/AddCourseModal';
import RemoveCourseModal from './modals/RemoveCourseModal';
import UpdateCourseModal from './modals/UpdateCourseModal';

function ManageCoursesBody() {
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [showRemoveCourseModal, setShowRemoveCourseModal] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [modalUpdated, setModalUpdated] = useState(false);

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleShowAddCourseModal = () => setShowAddCourseModal(true);
    const handleCloseAddCourseModal = () => {
        setShowAddCourseModal(false);
        setModalUpdated(!modalUpdated);
    }
    const handleShowRemoveCourseModal = () => setShowRemoveCourseModal(true);
    const handleCloseRemoveCourseModal = () => {
        setShowRemoveCourseModal(false);
        setModalUpdated(!modalUpdated);
    }
    const handleShowUpdateCourseModal = (course) => {
        setSelectedCourse(course);
        setShowUpdateCourseModal(true);
    };
    const handleCloseUpdateCourseModal = () => {
        setShowUpdateCourseModal(false);
        setModalUpdated(!modalUpdated);
    }

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
    };

    useEffect(() => {
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
        const filtered = courses.filter(course => course.name.includes(searchName));
        setFilteredCourses(filtered);
    }, [searchName, courses]);

    return (
        <div className="d-flex justify-content-center">
            <div>
                <div className="d-flex mx-5">
                    <Card
                        className="m-3 p-3 shadow align-items-center pe-auto"
                        style={{ width: "18rem" }}
                        onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                        onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                        onClick={handleShowAddCourseModal}
                        role='button'
                    >
                        <Card.Img
                            className="p-0"
                            variant="top"
                            src={AddCourseImage}
                            style={{ width: "5rem", height: "5rem" }}
                        />
                        <Card.Body className="d-flex align-items-center">
                            <div>
                                <Card.Title>Add Course</Card.Title>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card
                        className="m-3 mx-5 p-3 shadow align-items-center"
                        style={{ width: "18rem" }}
                        onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
                        onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
                        role='button'
                        onClick={handleShowRemoveCourseModal}
                    >
                        <Card.Img
                            className="p-0 rounded-circle"
                            variant="top"
                            src={DeleteImage}
                            style={{ width: "5rem", height: "5rem" }}
                        />
                        <Card.Body className="d-flex align-items-center">
                            <div>
                                <Card.Title>Remove Course</Card.Title>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className="mt-4 mx-5 p-4 pt-3 border border-3 border-success rounded-4" style={{ width: "42rem" }}>
                    <Form>
                        <Form.Group controlId="searchName">
                            <Form.Label>Search by Name</Form.Label>
                            <div className="input-group">
                                <Form.Control
                                    className=''
                                    type="text"
                                    placeholder="Enter course name"
                                    value={searchName}
                                    onChange={handleSearchChange}
                                />
                                <button className="btn btn-success" type="button">Search</button>
                            </div>
                        </Form.Group>
                    </Form>

                    <div className='mt-3 border border-2 rounded-2 '>
                        <div className="d-flex w-100">
                            <Col xs={5} className="p-3 px-3 fw-bold">Course Name</Col>
                        </div>
                        <hr className="text-black m-0" />
                        <div className="scrollable-container" style={{ maxHeight: '160px', overflowY: 'auto' }}>
                            {filteredCourses
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(course => (
                                    <div
                                        className='d-flex bg-hover-div'
                                        key={course._id}
                                        role='button'
                                        onClick={() => handleShowUpdateCourseModal(course)}
                                    >
                                        <Row className="w-100">
                                            <Col xs={5} className="p-3">
                                                <p className="px-3 mb-0 fw-bold">{course.name}</p>
                                            </Col>
                                            <Col xs={5} className="p-3">
                                                <div className="overflow-auto" style={{ maxWidth: "100%", maxHeight: "3rem" }}>
                                                    <p className="mb-0 text-muted">{course.description}</p>
                                                </div>
                                            </Col>
                                            <Col xs={2} className="p-3">
                                                <i className="bi bi-pencil-square"> Edit</i>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <AddCourseModal show={showAddCourseModal} handleClose={handleCloseAddCourseModal} setMessage={setMessage} handleShowToast={handleShowToast} />
                <RemoveCourseModal show={showRemoveCourseModal} handleClose={handleCloseRemoveCourseModal} setMessage={setMessage} handleShowToast={handleShowToast} />
                <UpdateCourseModal show={showUpdateCourseModal} handleClose={handleCloseUpdateCourseModal} course={selectedCourse} setMessage={setMessage} handleShowToast={handleShowToast} />
                <NotificationToast show={showToast} setShow={setShowToast} message={message} />
            </div>
        </div>
    )
}

export default ManageCoursesBody;
