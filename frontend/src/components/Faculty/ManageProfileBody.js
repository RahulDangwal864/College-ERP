import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import NotificationToast from '../NotificationToast';

function ManageProfileBody() {
    const [faculty, setFaculty] = useState([]);
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
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
                    const response = await fetch(`http://localhost:5173/api/faculty/${id}`);
                    if (response.ok) {
                        const facultyData = await response.json();
                        setFaculty(facultyData);
                    } else {
                        console.error('Failed to fetch faculty data');
                    }
                } catch (error) {
                    setMessage("Somethigh went wrong");
                    handleShowToast();
                    console.error('Error fetching faculty data:', error);
                }
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (faculty) {
            setName(faculty.name || '');
            setEmail(faculty.email || '');
            setPassword(faculty.password || '');
        }
    }, [faculty]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
        const response = await fetch(`http://localhost:5173/api/faculty/${faculty._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        setLoading(false);

        if (!response.ok) {
            setMessage("Somethingh went wrong");
            handleShowToast();
            setValidated(false);
        } else {
            setMessage("Profile updated successfully");
            handleShowToast();
            setValidated(false);
        }
    };
    return (
        <div className="d-flex justify-content-center">
            <div className='mb-5'>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    className='border shadow rounded-3 p-4 m-5'
                    style={{ width: "40rem" }}
                >
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email address"
                                required
                                value={email}
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
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className='d-flex justify-content-end'>
                        <Button variant="success" type="submit" className='m-1'>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
                        </Button>
                    </div>
                </Form>
                <NotificationToast show={showToast} setShow={setShowToast} message={message} />
            </div>
        </div>
    )
}

export default ManageProfileBody;