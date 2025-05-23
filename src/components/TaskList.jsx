import React, { useState, useEffect } from 'react';
import moment from 'moment';
import TaskListFilter from './TaskListFilter';
import './TaskList.css';

/**
 * TaskList Component
 * Displays a list of events with filtering capabilities
 * 
 * @param {Object[]} events - Array of event objects
 * @param {Function} onDeleteEvent - Callback function for event deletion
 */
const TaskList = ({ events, onDeleteEvent }) => {
  // State for filtered events and filter settings
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    color: '',
    startDate: null,
    endDate: null,
    description: ''
  });

  /**
   * Apply filters whenever events or filter settings change
   */
  useEffect(() => {
    applyFilters(events, filters);
  }, [events, filters]);

  /**
   * Apply filters to events based on current filter settings
   * @param {Object[]} eventsToFilter - Events to be filtered
   * @param {Object} currentFilters - Current filter settings
   */
  const applyFilters = (eventsToFilter, currentFilters) => {
    let filtered = [...eventsToFilter];

    // Filter by title (case-insensitive)
    if (currentFilters.title) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(currentFilters.title.toLowerCase())
      );
    }

    // Filter by description (case-insensitive)
    if (currentFilters.description) {
      filtered = filtered.filter(event =>
        event.description.toLowerCase().includes(currentFilters.description.toLowerCase())
      );
    }

    // Filter by color
    if (currentFilters.color) {
      filtered = filtered.filter(event => event.color === currentFilters.color);
    }

    // Filter by date range
    if (currentFilters.startDate || currentFilters.endDate) {
      filtered = filtered.filter(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        const filterStart = currentFilters.startDate ? new Date(currentFilters.startDate) : null;
        const filterEnd = currentFilters.endDate ? new Date(currentFilters.endDate) : null;

        if (filterStart && filterEnd) {
          return eventStart >= filterStart && eventEnd <= filterEnd;
        } else if (filterStart) {
          return eventStart >= filterStart;
        } else if (filterEnd) {
          return eventEnd <= filterEnd;
        }
        return true;
      });
    }

    // Sort events by start time
    filtered.sort((a, b) => moment(a.start).valueOf() - moment(b.start).valueOf());
    setFilteredEvents(filtered);
  };

  /**
   * Handle filter changes from TaskListFilter component
   * @param {Object} newFilters - New filter settings
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2 className="task-list-title">Upcoming Events</h2>
        <TaskListFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="task-list-content">
        {filteredEvents.length === 0 ? (
          <div className="no-events">No upcoming events</div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="task-item">
              <div 
                className="task-color-dot" 
                style={{ backgroundColor: event.color || '#3174ad' }}
              />
              <div className="task-main-info">
                <div className="task-header">
                  <h3 className="task-title">{event.title}</h3>
                  <div className="task-date">
                    {moment(event.start).format('MMMM D, YYYY')}
                  </div>
                </div>
                <div className="task-time">
                  {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
                </div>
                {event.description && (
                  <p className="task-description">{event.description}</p>
                )}
              </div>
              <button 
                className="delete-button"
                onClick={() => onDeleteEvent(event.id)}
                title="Delete event"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;