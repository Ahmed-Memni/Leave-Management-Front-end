import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';

interface LeaveApplicationFormProps {
  onClose: () => void;
}

const LeaveApplicationForm = ({ onClose }: LeaveApplicationFormProps) => {
  const [leaveType, setLeaveType] = useState('');
  const [description, setDescription] = useState('');

  const handleLeaveTypeChange = (event: SelectChangeEvent) => {
    setLeaveType(event.target.value);
  };

  const handleSubmit = () => {
    if (!leaveType || !description.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    console.log({
      leaveType,
      description,
    });

    // Optional: submit to backend here
    onClose(); // Close form after submit
  };

  const handleCancel = () => {
    // Optional: reset form here if needed
    onClose(); // Close form when cancel is clicked
  };

  return (
    <Paper
      sx={{
        p: { xs: 4, sm: 8 },
        height: '100%',
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h4" color="common.white" mb={6}>
        Apply for a Leave
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="leave-type-label" sx={{ color: 'common.white' }}>
          Leave Type
        </InputLabel>
        <Select
          labelId="leave-type-label"
          value={leaveType}
          label="Leave Type"
          onChange={handleLeaveTypeChange}
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }}
        >
          <MenuItem value="Sick Leave">Sick Leave</MenuItem>
          <MenuItem value="Casual Leave">Casual Leave</MenuItem>
          <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
          <MenuItem value="Paternity Leave">Paternity Leave</MenuItem>
          <MenuItem value="Paid Leave">Paid Leave</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.23)',
          },
        }}
      />

      <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderColor: 'white',
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: 3,
            backgroundColor: 'background.paper',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default LeaveApplicationForm;
