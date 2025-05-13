const Notification = ({ message, type }) => {

    if (message === null) {
        return null;
    }

    const notificationClass = type === 'good' ? 'notification-good' : 'notification-bad';
    
    return (
        <div className={notificationClass}>
            {message}
        </div>
    )
}

export default Notification