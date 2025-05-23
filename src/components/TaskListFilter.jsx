import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Chip,
  Stack,
  IconButton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FilterListIcon from '@mui/icons-material/FilterList';
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
 * TaskListFilter Component
 * Provides filtering functionality for the TaskList component
 * 
 * @param {Function} onFilterChange - Callback function for filter changes
 */
const TaskListFilter = ({ onFilterChange }) => {
  // State for dialog visibility and filter settings
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    color: '',
    startDate: null,
    endDate: null,
    description: ''
  });

  /**
   * Dialog control handlers
   */
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /**
   * Handle individual filter changes
   * @param {string} field - Filter field name
   * @param {any} value - New filter value
   */
  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  /**
   * Reset all filters to their default values
   */
  const clearFilters = () => {
    const clearedFilters = {
      title: '',
      color: '',
      startDate: null,
      endDate: null,
      description: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <>
      {/* Filter Button */}
      <IconButton 
        onClick={handleOpen}
        color="primary"
        sx={{ position: 'absolute', right: 16, top: 16 }}
      >
        <FilterListIcon />
      </IconButton>

      {/* Filter Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Filter Events
          {/* Active Filters Display */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {Object.entries(filters).map(([key, value]) => {
              if (value && key !== 'startDate' && key !== 'endDate') {
                return (
                  <Chip
                    key={key}
                    label={`${key}: ${value}`}
                    onDelete={() => handleFilterChange(key, '')}
                    size="small"
                  />
                );
              }
              return null;
            })}
            {(filters.startDate || filters.endDate) && (
              <Chip
                label={`Date Range: ${filters.startDate ? moment(filters.startDate).format('MMM D, YYYY') : 'Any'} - ${filters.endDate ? moment(filters.endDate).format('MMM D, YYYY') : 'Any'}`}
                onDelete={() => {
                  handleFilterChange('startDate', null);
                  handleFilterChange('endDate', null);
                }}
                size="small"
              />
            )}
          </Box>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {/* Title Filter */}
            <TextField
              label="Search by Title"
              value={filters.title}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              fullWidth
              size="small"
            />

            {/* Description Filter */}
            <TextField
              label="Search by Description"
              value={filters.description}
              onChange={(e) => handleFilterChange('description', e.target.value)}
              fullWidth
              size="small"
            />

            {/* Color Filter */}
            <FormControl fullWidth size="small">
              <InputLabel>Event Color</InputLabel>
              <Select
                value={filters.color}
                onChange={(e) => handleFilterChange('color', e.target.value)}
                label="Event Color"
              >
                <MenuItem value="">All Colors</MenuItem>
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

            {/* Date Range Filters */}
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={(date) => handleFilterChange('startDate', date)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
              <DatePicker
                label="End Date"
                value={filters.endDate}
                onChange={(date) => handleFilterChange('endDate', date)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={clearFilters}>Clear All</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskListFilter; 