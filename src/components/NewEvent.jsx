import React, { useState } from 'react';
import EventDialog from './EventDialog';
import './NewEvent.css';

/**
 * NewEvent Component
 * Provides functionality to create new events
 * 
 * @param {Function} onEventAdd - Callback function for adding new events
 */
const NewEvent = ({ onEventAdd }) => {
  // State for dialog visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Dialog control handlers
   */
  const handleClickOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  /**
   * Handle new event submission
   * @param {Object} eventData - Data for the new event
   */
  const handleSubmit = (eventData) => {
    onEventAdd(eventData);
    handleClose();
  };

  return (
    <div className="newEvent">
      {/* New Event Button */}
      <button 
        className="add-event-button" 
        onClick={handleClickOpen}
      >
        + New Event
      </button>

      {/* Event Creation Dialog */}
      <EventDialog
        open={isDialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </div>
  );
};

export default NewEvent;