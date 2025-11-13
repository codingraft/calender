import { useState } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import eventsData from '../data/events.json';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dateEvents = getEventsForDate(date);
    if (dateEvents.length > 0) {
      setShowModal(true);
    }
  };

  const getEventsForDate = (date) => {
    return eventsData.filter(event => 
      dayjs(event.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );
  };

  const checkEventConflicts = (date) => {
    const dateEvents = getEventsForDate(date);
    if (dateEvents.length <= 1) return [];

    const conflicts = [];
    for (let i = 0; i < dateEvents.length; i++) {
      for (let j = i + 1; j < dateEvents.length; j++) {
        const event1 = dateEvents[i];
        const event2 = dateEvents[j];
        
        const start1 = dayjs(`${event1.date} ${event1.startTime}`);
        const end1 = dayjs(`${event1.date} ${event1.endTime}`);
        const start2 = dayjs(`${event2.date} ${event2.startTime}`);
        const end2 = dayjs(`${event2.date} ${event2.endTime}`);

        if (start1.isBefore(end2) && start2.isBefore(end1)) {
          conflicts.push({ event1, event2 });
        }
      }
    }
    return conflicts;
  };

  return (
    <div className="calendar-container">
      <CalendarHeader
        currentDate={currentDate}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
      />
      <CalendarGrid
        currentDate={currentDate}
        events={eventsData}
        onDateClick={handleDateClick}
        getEventsForDate={getEventsForDate}
        checkEventConflicts={checkEventConflicts}
      />
      {showModal && selectedDate && (
        <EventModal
          date={selectedDate}
          events={getEventsForDate(selectedDate)}
          conflicts={checkEventConflicts(selectedDate)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
