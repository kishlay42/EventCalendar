import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormControlLabel,
  Switch,
  Chip,
  IconButton,
  Typography
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

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
 * Week days configuration for recurring events
 */
const WEEK_DAYS = [
  { value: 'monday', label: 'Mon' },
  { value: 'tuesday', label: 'Tue' },
  { value: 'wednesday', label: 'Wed' },
  { value: 'thursday', label: 'Thu' },
  { value: 'friday', label: 'Fri' },
  { value: 'saturday', label: 'Sat' },
  { value: 'sunday', label: 'Sun' }
];

/**
 * ColorSelect Component
 * Renders a color selection dropdown with visual color indicators
 * 
 * @param {string} value - Selected color value
 * @param {Function} onChange - Color change handler
 */
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

/**
 * EventDialog Component
 * Dialog for creating and editing events with support for recurring events
 * 
 * @param {boolean} open - Controls dialog visibility
 * @param {Function} onClose - Dialog close handler
 * @param {Function} onSubmit - Event submission handler
 * @param {Function} onDelete - Event deletion handler
 * @param {Object} event - Event data for editing
 * @param {boolean} isEdit - Whether dialog is in edit mode
 * @param {Date} initialStart - Initial start date for new events
 * @param {Date} initialEnd - Initial end date for new events
 */
const EventDialog = ({
  open,
  onClose,
  onSubmit,
  onDelete,
  event,
  isEdit = false,
  initialStart,
  initialEnd
}) => {
  // Initial event data state
  const [eventData, setEventData] = React.useState({
    title: '',
    description: '',
    start: moment(),
    end: moment().add(1, 'hour'),
    recurrence: {
      enabled: false,
      type: 'daily',
      days: [],
      interval: 1,
      endDate: moment().add(1, 'month')
    },
    color: '#3174ad'
  });

  /**
   * Update event data when event prop or initial dates change
   */
  React.useEffect(() => {
    if (event) {
      setEventData({
        ...event,
        start: moment(event.start),
        end: moment(event.end),
        recurrence: event.recurrence || {
          enabled: false,
          type: 'daily',
          days: [],
          interval: 1,
          endDate: moment().add(1, 'month')
        }
      });
    } else if (initialStart && initialEnd) {
      setEventData(prev => ({
        ...prev,
        start: moment(initialStart),
        end: moment(initialEnd)
      }));
    }
  }, [event, initialStart, initialEnd]);

  /**
   * Handle field value changes
   * @param {string} field - Field name to update
   * @param {any} value - New field value
   */
  const handleChange = (field, value) => {
    if (field.startsWith('recurrence.')) {
      const recurrenceField = field.split('.')[1];
      setEventData(prev => ({
        ...prev,
        recurrence: {
          ...prev.recurrence,
          [recurrenceField]: value
        }
      }));
    } else {
      setEventData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = () => {
    const eventToSubmit = {
      ...eventData,
      start: eventData.start.toDate(),
      end: eventData.end.toDate(),
      recurrence: eventData.recurrence.enabled ? {
        ...eventData.recurrence,
        endDate: eventData.recurrence.endDate.toDate()
      } : null
    };
    onSubmit(eventToSubmit);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Dialog Header */}
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isEdit ? 'Edit Event' : 'Create New Event'}
          </Typography>
          {isEdit && onDelete && (
            <IconButton onClick={onDelete} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {/* Basic Event Information */}
          <TextField
            label="Event Title"
            fullWidth
            value={eventData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={eventData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <ColorSelect
            value={eventData.color}
            onChange={(color) => handleChange('color', color)}
          />

          {/* Date and Time Selection */}
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label="Start Date & Time"
              value={eventData.start}
              onChange={(value) => handleChange('start', value)}
            />
            <DateTimePicker
              label="End Date & Time"
              value={eventData.end}
              onChange={(value) => handleChange('end', value)}
            />
          </LocalizationProvider>

          {/* Recurrence Settings */}
          <FormControlLabel
            control={
              <Switch
                checked={eventData.recurrence.enabled}
                onChange={(e) => handleChange('recurrence.enabled', e.target.checked)}
              />
            }
            label="Recurring Event"
          />

          {eventData.recurrence.enabled && (
            <>
              <FormControl fullWidth>
                <InputLabel>Recurrence Type</InputLabel>
                <Select
                  value={eventData.recurrence.type}
                  onChange={(e) => handleChange('recurrence.type', e.target.value)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="custom">Custom</MenuItem>
                </Select>
              </FormControl>

              {/* Weekly Recurrence Options */}
              {eventData.recurrence.type === 'weekly' && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {WEEK_DAYS.map((day) => (
                    <Chip
                      key={day.value}
                      label={day.label}
                      onClick={() => {
                        const days = eventData.recurrence.days.includes(day.value)
                          ? eventData.recurrence.days.filter(d => d !== day.value)
                          : [...eventData.recurrence.days, day.value];
                        handleChange('recurrence.days', days);
                      }}
                      color={eventData.recurrence.days.includes(day.value) ? 'primary' : 'default'}
                    />
                  ))}
                </Box>
              )}

              {/* Custom Recurrence Options */}
              {eventData.recurrence.type === 'custom' && (
                <TextField
                  type="number"
                  label="Repeat every (weeks)"
                  value={eventData.recurrence.interval}
                  onChange={(e) => handleChange('recurrence.interval', parseInt(e.target.value))}
                />
              )}

              {/* Recurrence End Date */}
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="End Date"
                  value={eventData.recurrence.endDate}
                  onChange={(value) => handleChange('recurrence.endDate', value)}
                />
              </LocalizationProvider>
            </>
          )}
        </Box>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEdit ? 'Save Changes' : 'Create Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog; 