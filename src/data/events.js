// Initial events data
let events = [
  {
    id: 1,
    title: 'Team Meeting',
    start: new Date(2025, 4, 20, 10, 0), // May 20, 2025, 10:00 AM
    end: new Date(2025, 4, 20, 11, 0),   // May 20, 2025, 11:00 AM
    description: 'Weekly team sync',
    recurrence: null,
    color: '#3174ad'
  },
  {
    id: 2,
    title: 'Project Review',
    start: new Date(2025, 4, 21, 14, 0), // May 21, 2025, 2:00 PM
    end: new Date(2025, 4, 21, 15, 30),  // May 21, 2025, 3:30 PM
    description: 'Quarterly project review meeting',
    recurrence: {
      type: 'weekly',
      days: ['monday', 'wednesday'],
      endDate: new Date(2025, 5, 30) // June 30, 2025
    },
    color: '#4caf50'
  },
  {
    id: 3,
    title: 'Client Presentation',
    start: new Date(2025, 4, 26, 9, 0), // May 26, 2025, 9:00 AM
    end: new Date(2025, 4, 26, 11, 0),  // May 26, 2025, 11:00 AM
    description: 'Quarterly client presentation and review',
    recurrence: null,
    color: '#f44336'
  },
  {
    id: 4,
    title: 'Team Building',
    start: new Date(2025, 4, 27, 14, 0), // May 27, 2025, 2:00 PM
    end: new Date(2025, 4, 27, 17, 0),  // May 27, 2025, 5:00 PM
    description: 'Team building activities and games',
    recurrence: null,
    color: '#ff9800'
  },
  {
    id: 5,
    title: 'Training Session',
    start: new Date(2025, 4, 28, 10, 0), // May 28, 2025, 10:00 AM
    end: new Date(2025, 4, 30, 12, 0),  // May 28, 2025, 12:00 PM
    description: 'New software training session',
    recurrence: {
      type: 'weekly',
      days: ['tuesday'],
      endDate: new Date(2025, 5, 30) // June 30, 2025
    },
    color: '#9c27b0'
  },
  {
    id: 6,
    title: 'Product Launch',
    start: new Date(2025, 4, 29, 13, 0), // May 29, 2025, 1:00 PM
    end: new Date(2025, 4, 29, 15, 0),  // May 29, 2025, 3:00 PM
    description: 'New product launch event',
    recurrence: null,
    color: '#795548'
  },
  {
    id: 7,
    title: 'End of Month Review',
    start: new Date(2025, 4, 30, 15, 0), // May 30, 2025, 3:00 PM
    end: new Date(2025, 4, 30, 16, 30), // May 30, 2025, 4:30 PM
    description: 'Monthly performance review meeting',
    recurrence: {
      type: 'monthly',
      endDate: new Date(2025, 11, 30) // December 30, 2025
    },
    color: '#3174ad'
  },
  {
    id: 8,
    title: 'Summer Workshop',
    start: new Date(2025, 5, 5, 9, 0), // June 5, 2025, 9:00 AM
    end: new Date(2025, 5, 5, 16, 0),  // June 5, 2025, 4:00 PM
    description: 'Annual summer workshop for team development',
    recurrence: null,
    color: '#4caf50'
  },
  {
    id: 9,
    title: 'Code Review Session',
    start: new Date(2025, 5, 12, 14, 0), // June 12, 2025, 2:00 PM
    end: new Date(2025, 5, 12, 16, 0),  // June 12, 2025, 4:00 PM
    description: 'Bi-weekly code review and best practices discussion',
    recurrence: {
      type: 'weekly',
      days: ['friday'],
      endDate: new Date(2025, 6, 31) // July 31, 2025
    },
    color: '#f44336'
  },
  {
    id: 10,
    title: 'Quarterly Planning',
    start: new Date(2025, 5, 25, 10, 0), // June 25, 2025, 10:00 AM
    end: new Date(2025, 5, 25, 15, 0),  // June 25, 2025, 3:00 PM
    description: 'Q3 planning and strategy meeting',
    recurrence: null,
    color: '#9c27b0'
  }
];

// Event management functions
export const getEvents = () => {
  return events;
};

export const addEvent = (newEvent) => {
  events = [...events, newEvent];
  return events;
};

export const updateEvent = (updatedEvent) => {
  events = events.map(event => 
    event.id === updatedEvent.id ? updatedEvent : event
  );
  return events;
};

export const deleteEvent = (eventId) => {
  events = events.filter(event => event.id !== eventId);
  return events;
};

// Export the events array for initial state
export default events; 