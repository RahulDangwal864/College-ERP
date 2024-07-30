import React, { useState } from "react";

import "../../styles/QuickMenu.css";
import NotificationToast from "../NotificationToast";
import AddCourseModal from "./modals/AddCourseModal";
import AddFacultyModal from "./modals/AddFacultyModal";
import AddStudentModal from "./modals/AddStudentModal";
import NoticeModal from "./modals/NoticeModal";

function QuickMenu() {
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    const handleShowToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleShowAddStudentModal = () => setShowAddStudentModal(true);
    const handleCloseAddStudentModal = () => { setShowAddStudentModal(false); }
    const handleShowAddFacultyModal = () => setShowAddFacultyModal(true);
    const handleCloseAddFacultyModal = () => { setShowAddFacultyModal(false); }
    const handleShowAddCourseModal = () => setShowAddCourseModal(true);
    const handleCloseAddCourseModal = () => { setShowAddCourseModal(false); }
    const handleShowNoticeModal = () => setShowNoticeModal(true);
    const handleCloseNoticeModal = () => { setShowNoticeModal(false); }

    return (
        <div className="quick-access ">
            <div className="p-3">
                <h4 className="m-3 mt-1 mb-0 text-success">Quick Menu</h4>
            </div>

            <div className='m-3 mb-0 border-bottom border-3 rounded-5' />

            <div className="d-flex flex-column justify-content-between p-3">
                <ul className="nav nav-pills flex-column p-0 m-0 w-100">
                    <li className="nav-item p-2 mb-2 w-100 nav-link text-black px-4 rounded-5" data-mdb-tooltip-init title="Add or View Notices" onClick={handleShowNoticeModal} role="button">
                        <i className="bi bi-bell-fill me-2 fs-5"></i>
                        <span className="fs-5">Notice</span>
                    </li>

                    <li className="nav-item p-2 mb-2 nav-link text-black px-4 rounded-5" data-mdb-tooltip-init title="Add faculty" onClick={handleShowAddFacultyModal} role="button">
                        <i className="bi bi-person-fill-gear me-2 fs-5"></i>
                        <span className="fs-5">Add faculty</span>
                    </li>

                    <li className="nav-item p-2 mb-2 nav-link text-black px-4 rounded-5" data-mdb-tooltip-init title="Add student" onClick={handleShowAddStudentModal} role="button">
                        <i className="bi bi-people me-2 fs-5"></i>
                        <span className="fs-5">Add student</span>
                    </li>

                    <li className="nav-item p-2 mb-2 nav-link text-black px-4 rounded-5" data-mdb-tooltip-init title="Add course" onClick={handleShowAddCourseModal} role="button">
                        <i className="bi bi-book me-2 fs-5"></i>
                        <span className="fs-5">Add course</span>
                    </li>
                </ul>
            </div>
            <AddStudentModal show={showAddStudentModal} handleClose={handleCloseAddStudentModal} setMessage={setMessage} handleShowToast={handleShowToast} />
            <AddFacultyModal show={showAddFacultyModal} handleClose={handleCloseAddFacultyModal} setMessage={setMessage} handleShowToast={handleShowToast} />
            <AddCourseModal show={showAddCourseModal} handleClose={handleCloseAddCourseModal} setMessage={setMessage} handleShowToast={handleShowToast} />
            <NoticeModal show={showNoticeModal} handleClose={handleCloseNoticeModal} setMessage={setMessage} handleShowToast={handleShowToast} />
            <NotificationToast show={showToast} setShow={setShowToast} message={message} />
        </div>
    )
}

export default QuickMenu;