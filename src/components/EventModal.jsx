import dayjs from 'dayjs';
import './EventModal.css';

const EventModal = ({ date, events, conflicts, onClose }) => {
  const formatTime = (time) => {
    return dayjs(`2000-01-01 ${time}`).format('h:mm A');
  };

  const calculateDuration = (startTime, endTime) => {
    const start = dayjs(`2000-01-01 ${startTime}`);
    const end = dayjs(`2000-01-01 ${endTime}`);
    const diffMinutes = end.diff(start, 'minute');
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{date.format('MMMM D, YYYY')}</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {conflicts.length > 0 && (
          <div className="conflict-warning">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Warning: {conflicts.length} time conflict{conflicts.length > 1 ? 's' : ''} detected!</span>
          </div>
        )}

        <div className="events-list">
          {sortedEvents.map((event) => {
            const isConflicting = conflicts.some(
              conflict => conflict.event1.id === event.id || conflict.event2.id === event.id
            );

            return (
              <div 
                key={event.id} 
                className={`event-item ${isConflicting ? 'conflicting' : ''}`}
                style={{ borderLeftColor: event.color }}
              >
                <div className="event-color-bar" style={{ backgroundColor: event.color }} />
                <div className="event-details">
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-time">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 4V8L10.5 10.5M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>
                      {formatTime(event.startTime)} - {formatTime(event.endTime)} ({calculateDuration(event.startTime, event.endTime)})
                    </span>
                  </div>
                  {isConflicting && (
                    <div className="conflict-badge">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 4V7M7 10H7.007M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Time Conflict
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
