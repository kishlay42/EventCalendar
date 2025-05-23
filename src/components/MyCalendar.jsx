import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import EventDialog from './EventDialog';
import './Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Initialize moment localizer for react-big-calendar
const localizer = momentLocalizer(moment);

/**
 * Available event colors with their labels
 */
const EVENT_COLORS = [
  { value: '#3174ad', label: 'Blue' },
  { value: '#4caf50', label: 'Green' },
  { value: '#f44336', label: 'Red' },
  { value: '#ff9800', label: 'Orange' },
  { value: '#9c27b0', label: 'Purple' },
  { value: '#795548', label: 'Brown' }
];

/**
 * MyCalendar Component
 * Main calendar view with event management capabilities
 * 
 * @param {Object[]} events - Array of event objects
 * @param {Function} onUpdateEvent - Callback for updating events
 * @param {Function} onDeleteEvent - Callback for deleting events
 * @param {Function} onAddEvent - Callback for adding events
 */
const MyCalendar = ({ events, onUpdateEvent, onDeleteEvent, onAddEvent }) => {
  // State management
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [initialStart, setInitialStart] = useState(null);
  const [initialEnd, setInitialEnd] = useState(null);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  /**
   * Event selection handlers
   */
  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setDialogMode('edit');
    setIsDialogOpen(true);
  }, []);

  const handleSelectSlot = useCallback(({ start, end }) => {
    setInitialStart(start);
    setInitialEnd(end);
    setDialogMode('create');
    setIsDialogOpen(true);
  }, []);

  /**
   * Event modification handlers
   */
  const handleEventDrop = useCallback(({ event, start, end }) => {
    onUpdateEvent({
      ...event,
      start,
      end
    });
  }, [onUpdateEvent]);

  const handleEventResize = useCallback(({ event, start, end }) => {
    onUpdateEvent({
      ...event,
      start,
      end
    });
  }, [onUpdateEvent]);

  /**
   * Dialog control handlers
   */
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
    setInitialStart(null);
    setInitialEnd(null);
  };

  const handleDialogSubmit = (eventData) => {
    if (dialogMode === 'edit') {
      onUpdateEvent(eventData);
    } else {
      onAddEvent({
        ...eventData,
        id: Date.now()
      });
    }
    handleDialogClose();
  };

  /**
   * Style configuration for calendar events
   */
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || '#3174ad',
      borderRadius: '3px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
  });

  const ColorSelect = ({ value, onChange }) => (
    <FormControl fullWidth>
      <InputLabel>Event Color</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Event Color"
      >
        {EVENT_COLORS.map((color) => (
          <MenuItem key={color.value} value={color.value}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: color.value,
                  borderRadius: '50%',
                  border: '1px solid #ccc'
                }}
              />
              {color.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div className="calendar">
      {/* Main Calendar Component */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 550 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        draggableAccessor={() => true}
        resizableAccessor={() => true}
        eventPropGetter={eventStyleGetter}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        defaultView={Views.MONTH}
        selectable
        popup
        showMultiDayTimes
        step={60}
        timeslots={1}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 20, 0, 0)}
      />

      {/* Event Dialog */}
      <EventDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        onDelete={dialogMode === 'edit' ? () => onDeleteEvent(selectedEvent.id) : null}
        event={dialogMode === 'edit' ? selectedEvent : null}
        isEdit={dialogMode === 'edit'}
        initialStart={initialStart}
        initialEnd={initialEnd}
      />
    </div>
  );
};

export default MyCalendar;