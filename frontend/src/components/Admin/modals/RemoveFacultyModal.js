import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

function RemoveFacultyModal({ show, handleClose, setMessage, handleShowToast }) {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
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
            const response = await fetch(`http://localhost:5173/api/faculty/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            setLoading(false);

            if (!response.ok) {
                setMessage("Failed to delete faculty");
                handleShowToast();
                handleClose();
                setValidated(false);
            } else {
                setMessage("Faculty deleted successfully");
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
                <Modal.Title>Remove Faculty</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body className='px-5 py-4'>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter faculty's email address"
                                required
                                onChange={handleEmailChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Enter a valid email address
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Remove Faculty'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default RemoveFacultyModal;
