import Toast from 'react-bootstrap/Toast';

function NotificationToast({ show, setShow, message }) {
    return (
        <Toast
            show={show}
            onClose={() => setShow(false)}
            delay={3000}
            style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
            }}
        >
            <Toast.Header
                className='p-2'
                style={{
                    backgroundColor: '#5fe7a8',
                }}
            >
                <i
                    className="bi bi-chat-left-dots rounded me-2 px-2 pt-1"
                    alt=""
                />
                <strong className="me-auto">Message</strong>
                <small className="ml-auto">just now</small>
            </Toast.Header>
            <Toast.Body className='bg-light text-muted'>{message}</Toast.Body>
        </Toast>
    );
}

export default NotificationToast;
