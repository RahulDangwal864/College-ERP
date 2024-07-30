import Sidebar from './Admin/AdminSideBar';
import QuickMenu from './Admin/QuickMenu';

function HelpAndSupport() {
    return (
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>

            <div className="d-flex flex-column flex-grow-1" style={{ width: "40rem" }}>
                <h4 className="m-5 mt-4 mb-1 text-success">Help and Support</h4>
                <div className="m-4 mb-4 border-bottom border-3 rounded-5" />

                <div className="d-flex justify-content-center">
                    <div style={{ width: "40rem" }}>
                        <div className='text-center'>
                            <h4 className='text-success m-4 mt-0'>
                                How can we help you?
                            </h4>
                        </div>

                        <div className="faq-section m-3">
                            <div className="text-left mb-3 shadow p-3 rounded">
                                <h5>How to add a student?</h5>
                                <p>To add a student, go to 'Manage Students' → 'Add Student' → Enter email, name, password, and press enter.</p>
                            </div>

                            <div className="text-left mb-3 shadow p-3 rounded">
                                <h5>How to logout?</h5>
                                <p>To logout click on your profile and press logout.</p>
                            </div>

                            <div className="text-left mb-3 shadow p-3 rounded">
                                <h5>How to reset password?</h5>
                                <p>To reset password, go to 'Forgot Password' and follow the instructions.</p>
                            </div>

                            <div className="text-left shadow p-3 rounded">
                                <h5>How to edit details?</h5>
                                <p>To edit user details, use the search bar to find the user by email → Click on the user's email to edit their details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow-1 border-start border-3" style={{ width: "5rem" }}>
                <QuickMenu />
            </div>
        </div>
    )
}

export default HelpAndSupport;
