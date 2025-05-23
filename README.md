# Event Calendar Application

A dynamic event calendar application built with React, featuring event management, recurring events, and a modern UI using Material-UI and React Big Calendar.

## Features

- 📅 Interactive calendar view with month, week, and day views
- ✨ Create, edit, and delete events
- 🔄 Support for recurring events (daily, weekly, monthly)
- 🎨 Customizable event colors
- 📱 Responsive design
- 🔍 Event filtering and search
- 📋 Task list view with upcoming events
- ⌨️ Keyboard navigation support

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd EventCalander
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/         # React components
│   ├── EventDialog.jsx    # Event creation/editing dialog
│   ├── Heading.jsx        # Calendar header
│   ├── MyCalendar.jsx     # Main calendar component
│   ├── NewEvent.jsx       # New event button
│   ├── TaskList.jsx       # Task list component
│   └── TaskListFilter.jsx # Task filtering component
├── data/
│   └── events.js       # Event data management
├── App.jsx             # Main application component
└── index.js           # Application entry point
```

## Usage

### Creating Events
1. Click the "+ New Event" button
2. Fill in the event details:
   - Title
   - Description
   - Start and end times
   - Color
   - Recurrence settings (optional)

### Managing Events
- Click an event to edit its details
- Drag and drop events to reschedule
- Resize events to change duration
- Use the task list to view and filter upcoming events

### Keyboard Navigation
- Use arrow keys to navigate between months
- Press 'Today' to return to current month

## Dependencies

- React
- Material-UI
- React Big Calendar
- Moment.js
- @mui/x-date-pickers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
