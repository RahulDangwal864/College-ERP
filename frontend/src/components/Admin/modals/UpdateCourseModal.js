import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Col, Row, Spinner } from 'react-bootstrap';

function UpdateCourseModal({ show, handleClose, course, setMessage, handleShowToast }) {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (course) {
            setName(course.name || '');
        }
    }, [course]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        setLoading(true);
        const response = await fetch(`http://localhost:5173/api/courses/${course._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        setLoading(false);

        if (!response.ok) {
            setMessage("Failed to  update course");
            handleShowToast();
            handleClose();
            setValidated(false);
        } else {
            setMessage("Course updated successfully");
            handleShowToast();
            handleClose();
            setValidated(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Course</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body className='px-5 py-4'>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter course name"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type="submit">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdateCourseModal;
