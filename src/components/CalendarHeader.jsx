import './CalendarHeader.css';

const CalendarHeader = ({ currentDate, onPrevious, onNext }) => {
  return (
    <div className="calendar-header">
      <h1 className="calendar-title">
        {currentDate.format('MMMM YYYY')}
      </h1>
      <div className="calendar-navigation">
        <button 
          className="nav-button"
          onClick={onPrevious}
          aria-label="Previous month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          className="nav-button"
          onClick={onNext}
          aria-label="Next month"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
