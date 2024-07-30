import React, { useState, useEffect } from 'react';

import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function ViewStudentBody() {
    const [searchEmail, setSearchEmail] = useState('');
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [courses, setCourses] = useState([]);

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
    }, []);

    useEffect(() => {
        const filtered = students.filter(student => student.email.includes(searchEmail));
        setFilteredStudents(filtered.map(student => ({
            ...student,
            courseName: courses.find(course => course._id === student.course)?.name
        })));
    }, [searchEmail, students, courses]);

    return (
        <div className="d-flex justify-content-center">
            <div className="mt-4 mx-5 p-4 border border-3 border-success rounded-4 shadow" style={{ width: "42rem" }}>
                <Form>
                    <Form.Group controlId="searchEmail">
                        <Form.Label>Search by Email</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                className=''
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
                        <Col xs={4} className="p-3 px-4 fw-bold">Name</Col>
                        <Col xs={4} className="p-3 px-2 fw-bold">Course</Col>
                        <Col xs={4} className="p-3 px-0 fw-bold">Email</Col>
                    </div>
                    <hr className="text-black m-0" />
                    <div className="scrollable-container" style={{ height: '330px', overflowY: 'auto' }}>
                        {filteredStudents
                            .sort((a, b) => a.email.localeCompare(b.email))
                            .map(student => (
                                <div
                                    className='d-flex bg-hover-div'
                                    key={student._id}
                                    role='button'
                                >
                                    <Row className="w-100">
                                        <Col xs={4} className="p-4">
                                            <p className="px-3 mb-0" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.name}</p>
                                        </Col>

                                        <Col xs={4} className="p-4">
                                            <p className="mb-0 text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.course.name}</p>
                                        </Col>
                                        <Col xs={4} className="pt-3">
                                            <p className="mb-0 text-muted overflow-auto">{student.email}</p>
                                        </Col>
                                    </Row>

                                </div>
                            ))}
                    </div>
                </div>
            </div >
        </div>
    )
}

export default ViewStudentBody