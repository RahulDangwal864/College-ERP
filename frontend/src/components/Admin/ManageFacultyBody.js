import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import AddFacultyImage from "../../assets/AddFacultyImage.png";
import DeleteImage from "../../assets/DeleteImage.png";
import NotificationToast from '../NotificationToast';
import AddFacultyModal from './modals/AddFacultyModal';
import RemoveFacultyModal from './modals/RemoveFacultyModal';
import UpdateFacultyModal from './modals/UpdateFacultyModal';

function ManageFacultyBody() {
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showRemoveFacultyModal, setShowRemoveFacultyModal] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [faculty, setFaculty] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [showUpdateFacultyModal, setShowUpdateFacultyModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [modalUpdated, setModalUpdated] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShowAddFacultyModal = () => setShowAddFacultyModal(true);
  const handleCloseAddFacultyModal = () => {
    setShowAddFacultyModal(false);
    setModalUpdated(!modalUpdated);
  }
  const handleShowRemoveFacultyModal = () => setShowRemoveFacultyModal(true);
  const handleCloseRemoveFacultyModal = () => {
    setShowRemoveFacultyModal(false);
    setModalUpdated(!modalUpdated);
  }
  const handleShowUpdateFacultyModal = (faculty) => {
    setSelectedFaculty(faculty);
    setShowUpdateFacultyModal(true);
  };
  const handleCloseUpdateFacultyModal = () => {
    setShowUpdateFacultyModal(false);
    setModalUpdated(!modalUpdated);
  }

  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/faculty");
        if (!response.ok) {
          throw new Error('Failed to fetch faculty');
        }
        const data = await response.json();
        setFaculty(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFaculty();
  }, [modalUpdated]);

  useEffect(() => {
    const filtered = faculty.filter(faculty => faculty.email.includes(searchEmail));
    setFilteredFaculty(filtered);
  }, [searchEmail, faculty]);

  return (
    <div className='d-flex justify-content-center'>
      <div>
        <div className="d-flex mt-0 mx-5">
          <Card
            className="m-3 p-3 shadow align-items-center pe-auto"
            style={{ width: "18rem" }}
            onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
            onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
            onClick={handleShowAddFacultyModal}
            role='button'
          >
            <Card.Img
              className="p-0"
              variant="top"
              src={AddFacultyImage}
              style={{ width: "5rem", height: "5rem" }}
            />
            <Card.Body className="d-flex align-items-center">
              <div>
                <Card.Title>Add Faculty</Card.Title>
              </div>
            </Card.Body>
          </Card>

          <Card
            className="m-3 mx-5 p-3 shadow align-items-center"
            style={{ width: "18rem" }}
            onMouseEnter={(e) => e.target.classList.add('shadow-lg')}
            onMouseLeave={(e) => e.target.classList.remove('shadow-lg')}
            role='button'
            onClick={handleShowRemoveFacultyModal}
          >
            <Card.Img
              className="p-0 rounded-circle"
              variant="top"
              src={DeleteImage}
              style={{ width: "5rem", height: "5rem" }}
            />
            <Card.Body className="d-flex align-items-center">
              <div>
                <Card.Title>Remove Faculty</Card.Title>
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
                  className=''
                  type="email"
                  placeholder="Enter faculty's email"
                  value={searchEmail}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-success" type="button">Search</button>
              </div>
            </Form.Group>
          </Form>

          <div className='mt-3 border border-2 rounded-2 '>
            <div className="d-flex w-100">
              <Col xs={5} className="p-3 px-4 fw-bold">Name</Col>
              <Col xs={5} className="p-3 px-0 fw-bold">Email</Col>
            </div>
            <hr className="text-black m-0" />
            <div className="scrollable-container" style={{ height: '160px', overflowY: 'auto' }}>
              {filteredFaculty
                .sort((a, b) => a.email.localeCompare(b.email))
                .map(faculty => (
                  <div
                    className='d-flex bg-hover-div'
                    key={faculty._id}
                    role='button'
                    onClick={() => handleShowUpdateFacultyModal(faculty)}
                  >
                    <Row className="w-100">
                      <Col xs={5} className="p-3">
                        <p className="px-3 mb-0 fw-bold">{faculty.name}</p>
                      </Col>
                      <Col xs={5} className="p-3">
                        <div className="overflow-auto" style={{ maxWidth: "100%", maxHeight: "3rem" }}>
                          <p className="mb-0 text-muted">{faculty.email}</p>
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
        <AddFacultyModal show={showAddFacultyModal} handleClose={handleCloseAddFacultyModal} setMessage={setMessage} handleShowToast={handleShowToast} />
        <RemoveFacultyModal show={showRemoveFacultyModal} handleClose={handleCloseRemoveFacultyModal} setMessage={setMessage} handleShowToast={handleShowToast} />
        <UpdateFacultyModal show={showUpdateFacultyModal} handleClose={handleCloseUpdateFacultyModal} faculty={selectedFaculty} setMessage={setMessage} handleShowToast={handleShowToast} />
        <NotificationToast show={showToast} setShow={setShowToast} message={message} />
      </div>
    </div>
  )
}

export default ManageFacultyBody;
