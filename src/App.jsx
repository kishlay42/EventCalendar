import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Component imports
import Heading from "./components/Heading";
import MyCalendar from "./components/MyCalendar";
import TaskList from "./components/TaskList";
import NewEvent from "./components/NewEvent";

// Data management imports
import { getEvents, addEvent, updateEvent, deleteEvent } from "./data/events";

// Styles
import "./App.css";

/**
 * Material-UI theme configuration
 * Defines the color palette and other theme settings
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

/**
 * Main App Component
 * Manages the application state and event handling
 */
const App = () => {
  // State for managing events
  const [events, setEvents] = useState([]);

  /**
   * Load initial events when component mounts
   */
  useEffect(() => {
    setEvents(getEvents());
  }, []);

  /**
   * Event Handlers
   */
  const handleAddEvent = (newEvent) => {
    const updatedEvents = addEvent(newEvent);
    setEvents(updatedEvents);
  };

  const handleUpdateEvent = (updatedEvent) => {
    const updatedEvents = updateEvent(updatedEvent);
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = deleteEvent(eventId);
    setEvents(updatedEvents);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="container">
        {/* Left Column: Calendar View */}
        <div className="left-column">
          <Heading events={events} />
          <MyCalendar
            events={events}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
            onAddEvent={handleAddEvent}
          />
        </div>

        {/* Right Column: Task List and New Event */}
        <div className="right-column">
          <NewEvent onEventAdd={handleAddEvent} />
          <TaskList 
            events={events} 
            onDeleteEvent={handleDeleteEvent} 
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
