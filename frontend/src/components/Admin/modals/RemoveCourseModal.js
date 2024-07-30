import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';

function RemoveCourseModal({ show, handleClose, setMessage, handleShowToast }) {
    const [validated, setValidated] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/courses');
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCourseNameChange = (e) => {
        setCourseName(e.target.value);
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

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5173/api/courses/${courseName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            setLoading(false);

            if (!response.ok) {
                setMessage("Failed to delete course");
                handleShowToast();
                handleClose();
                setValidated(false);
            } else {
                setMessage("Course deleted successfully");
                handleShowToast();
                handleClose();
                setValidated(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Remove Course</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body className='px-5 py-4'>
                    <Form.Group controlId="formBasicCourseId">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Select
                            required
                            value={courseName}
                            onChange={handleCourseNameChange}
                        >
                            <option value="">Select a course...</option>
                            {courses.map(course => (
                                <option key={course._id} value={course.name}>{course.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a valid course.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Remove Course'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default RemoveCourseModal;
