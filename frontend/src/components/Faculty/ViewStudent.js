import React from 'react'
import Sidebar from './FacultySideBar';
import ViewStudentBody from './ViewStudentBody';
import QuickMenu from './QuickMenu';

function ViewStudent() {
    return (
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>

            <div>

            </div>

            <div className="d-flex flex-column flex-grow-1" style={{ width: "40rem" }}>
                <h4 className="m-5 mt-4 mb-1 text-success">View Students</h4>
                <div className="m-4 mb-4 border-bottom border-3 rounded-5" />
                <ViewStudentBody />
            </div>

            <div className="flex-grow-1 border-start border-3" style={{ width: "5rem" }} >
                <QuickMenu />
            </div>
        </div>
    )
}

export default ViewStudent