import React, { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';

function AddCourseModal({ show, handleClose, setMessage, handleShowToast }) {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
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
        const response = await fetch("http://localhost:5173/api/courses/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        setLoading(false);

        if (!response.ok) {
            setMessage("Failed to add course");
            handleShowToast();
            handleClose();
            setValidated(false);
        } else {
            setMessage("Course added successfully");
            handleShowToast();
            handleClose();
            setValidated(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body className='px-5 py-4'>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter course name"
                            required
                            value={name}
                            autoFocus
                            onChange={handleNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid course name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type="submit">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Add Course'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddCourseModal;
