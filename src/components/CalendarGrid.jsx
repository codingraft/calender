import dayjs from 'dayjs';
import './CalendarGrid.css';

const CalendarGrid = ({ currentDate, onDateClick, getEventsForDate, checkEventConflicts }) => {
  const today = dayjs();
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const generateCalendarDays = () => {
    const days = [];
    let day = startDate;

    while (day.isBefore(endDate) || day.isSame(endDate, 'day')) {
      days.push(day);
      day = day.add(1, 'day');
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const isToday = (date) => {
    return date.format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
  };

  const isCurrentMonth = (date) => {
    return date.month() === currentDate.month();
  };

  const renderEventDots = (date) => {
    const dateEvents = getEventsForDate(date);
    const conflicts = checkEventConflicts(date);
    const hasConflicts = conflicts.length > 0;

    if (dateEvents.length === 0) return null;

    return (
      <div className="event-dots">
        {hasConflicts && (
          <div className="conflict-indicator" title="Time conflict detected">
            ⚠️
          </div>
        )}
        {dateEvents.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className="event-dot"
            style={{ backgroundColor: event.color }}
            title={event.title}
          />
        ))}
        {dateEvents.length > 3 && (
          <span className="more-events">+{dateEvents.length - 3}</span>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-grid-container">
      <div className="weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const dateEvents = getEventsForDate(day);
          const hasEvents = dateEvents.length > 0;
          const conflicts = checkEventConflicts(day);
          const hasConflicts = conflicts.length > 0;

          return (
            <div
              key={index}
              className={`calendar-day ${!isCurrentMonth(day) ? 'other-month' : ''} ${
                isToday(day) ? 'today' : ''
              } ${hasEvents ? 'has-events' : ''} ${hasConflicts ? 'has-conflicts' : ''}`}
              onClick={() => onDateClick(day)}
            >
              <span className="day-number">{day.format('D')}</span>
              {renderEventDots(day)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
