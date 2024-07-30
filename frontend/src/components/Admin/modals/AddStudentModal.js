import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

function AddStudentModal({ show, handleClose, setMessage, handleShowToast }) {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [courseId, setCourseId] = useState(null);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCourseNameChange = (e) => {
        const selectedCourse = courses.find(course => course.name === e.target.value);
        if (selectedCourse) {
            setCourseId(selectedCourse._id);
        } else {
            setCourseId(null);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        setLoading(true);
        const response = await fetch("http://localhost:5173/api/students/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, course: courseId })
        });
        setLoading(false);

        if (!response.ok) {
            setMessage("Failed to add student: Email already exists");
            handleShowToast();
            handleClose();
            setValidated(false);
        } else {
            setMessage("Student added successfully");
            handleShowToast();
            handleClose();
            setValidated(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body className='px-5 py-4'>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter students name"
                                onChange={handleNameChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                This field can't be blank
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="validationCustom01.1">
                            <Form.Label>Course</Form.Label>
                            <Form.Select
                                required
                                type="text"
                                placeholder="Enter Course name"
                                onChange={handleCourseNameChange}
                            >
                                <option value="">Select a course...</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course.name}>{course.name}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                This field can't be blank
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter students email address"
                                required
                                onChange={handleEmailChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Enter a valid email address
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter students password"
                                required
                                onChange={handlePasswordChange}
                            />
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                This field can't be blank
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type="submit">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Add Student'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddStudentModal;
