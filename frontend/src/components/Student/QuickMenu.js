import React, { useState } from "react";
import { Link } from "react-router-dom";
import NoticeModal from "./modals/NoticeModal";

function QuickMenu() {
    const [showNoticeModal, setShowNoticeModal] = useState(false);

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

                    <Link
                        to="/student/dashboard/manage-profile"
                        className="text-decoration-none"
                    >
                        <li className="nav-item p-2 mb-2 nav-link text-black px-4 rounded-5" data-mdb-tooltip-init title="Change Password" role="button">
                            <i className="bi bi-person-fill-gear me-2 fs-5"></i>
                            <span className="fs-5">Change Password</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <NoticeModal show={showNoticeModal} handleClose={handleCloseNoticeModal} />
        </div>
    )
}

export default QuickMenu;