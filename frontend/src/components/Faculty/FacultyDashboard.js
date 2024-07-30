import React from 'react'

import Sidebar from './FacultySideBar';
import FacultyBody from './FacultyDashboardBody';
import QuickMenu from './QuickMenu';

function FacultyDashboard() {
    return (
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>

            <div className="d-flex flex-column flex-grow-1" style={{ width: "40rem" }}>
                <h4 className="m-5 mt-4 mb-1 text-success">Faculty Dashboard</h4>
                <div className="m-4 mb-5 border-bottom border-3 rounded-5" />
                <FacultyBody />
            </div>

            <div className="flex-grow-1 border-start border-3" style={{ width: "5rem" }} >
                <QuickMenu />
            </div>
        </div>
    )
}

export default FacultyDashboard