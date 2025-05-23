import React from 'react';
import moment from 'moment';
import './Heading.css';

/**
 * Heading Component
 * Displays the current date and upcoming events count
 * 
 * @param {Object[]} events - Array of event objects
 */
const Heading = ({ events }) => {
  // Get current date and filter upcoming events
  const currentDate = moment();
  const upcomingEvents = events.filter(event => 
    moment(event.start).isSameOrAfter(currentDate, 'day')
  );

  return (
    <div className="heading-container">
      <div className="heading-content">
        {/* Date Section */}
        <div className="date-section">
          <h1 className="month-year">{currentDate.format('MMMM YYYY')}</h1>
          <p className="full-date">{currentDate.format('dddd, MMMM D')}</p>
        </div>

        {/* Events Summary Section */}
        <div className="events-section">
          <h2 className="events-count">
            {upcomingEvents.length} Upcoming Events
          </h2>
          <p className="events-remaining">
            {upcomingEvents.length === 1 ? 'Event' : 'Events'} remaining this month
          </p>
        </div>
      </div>
    </div>
  );
};

export default Heading;