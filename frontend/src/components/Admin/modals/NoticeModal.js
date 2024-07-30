import React, { useEffect, useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

function NoticeModal({ show, handleClose, setMessage, handleShowToast }) {
    const [notice, setNotice] = useState([]);
    const [noticeDescription, setNoticeDescription] = useState('');
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalUpdated, setModalUpdated] = useState(false);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/notice");
                const data = await response.json();

                setNotice(data);

                if (!response.ok) {
                    setMessage("Failed to fetch notice");
                    handleShowToast();
                    handleClose();
                    setValidated(false);
                } else {
                    setValidated(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchNotice();
    }, [modalUpdated, handleClose, handleShowToast, setMessage]);


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
        const maxNoticeNumber = notice.reduce((max, current) => Math.max(max, current.noticeNumber), 0);
        const noticeDate = new Date().toLocaleDateString('en-GB');
        const response = await fetch("http://localhost:5173/api/notice", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ noticeNumber: maxNoticeNumber + 1, noticeDescription, noticeDate })
        });
        setLoading(false);

        if (!response.ok) {
            setMessage("Failed to add notice");
            handleShowToast();
            setValidated(false);
        } else {
            setMessage("Notice added successfully");
            handleShowToast();
            setValidated(false);
            setModalUpdated(!modalUpdated);
            setNoticeDescription('');
        }
    };

    const handleNoticeChange = (e) => {
        setNoticeDescription(e.target.value);
    };

    const handleDeleteNotice = async (id) => {
        try {
            const response = await fetch(`http://localhost:5173/api/notice/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                setMessage("Failed to delete notice");
                handleShowToast();
            } else {
                setMessage("Notice deleted successfully");
                handleShowToast();
                setModalUpdated(!modalUpdated);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="px-2">Notice</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body className='px-3'>
                    <div className='mt-3 border border-2 rounded-2 '>
                        <div className="d-flex w-100">
                            <Col xs={6} className="p-3 px-4 fw-bold">Notice Description</Col>
                            <Col xs={4} className="p-3 px-2 fw-bold">Date</Col>
                        </div>
                        <hr className="text-black m-0" />
                        <div className="scrollable-container" style={{ height: '200px', overflowY: 'auto' }}>
                            {notice
                                .sort((a, b) => b.noticeNumber - a.noticeNumber)
                                .map(notice => (
                                    <div
                                        className='d-flex bg-hover-div'
                                        key={notice._id}
                                        role='button'
                                    >
                                        <Row className="w-100">
                                            <Col xs={6} className="p-4">
                                                <p className="px-3 mb-0 fw-bold" style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>{notice.noticeDescription}</p>
                                            </Col>

                                            <Col xs={4} className="p-4">
                                                <p className="mb-0 text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{notice.noticeDate}</p>
                                            </Col>
                                            <Col xs={2} className="px-2 pt-4" data-mdb-tooltip-init title="Delete Notice" onClick={() => handleDeleteNotice(notice._id)}>
                                                <i className="bi bi-trash3-fill"></i>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="mt-4 border border-2 rounded-2">
                        <Form.Group controlId="searchEmail">
                            <Form.Label className="p-2 px-3 fw-bold fs-5">Add Notice</Form.Label>
                            <hr className="text-black m-0" />
                            <div className="p-4 input-group">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter notice description"
                                    onChange={handleNoticeChange}
                                />
                            </div>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type="submit">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Add Notice'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default NoticeModal;
