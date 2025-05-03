import React, { useState } from 'react';
import { Box, Paper, Stack, Button, Typography, Modal, TextField } from '@mui/material';

interface TimetableSlot {
  className: string;
  matiere: string;
  place: string;
  timeRange: { start: string; end: string };
}

const Timetable = () => {
  const [modalMode, setModalMode] = useState<"leave" | "MakeUpSession" | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; index: number | null; startTime: string } | null>(null);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Default time slots for display (set by admin)
  const defaultTimeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Sample timetable data (set by admin, professor cannot modify)
  const [timetable] = useState<{ [key: string]: TimetableSlot[] }>({
    Monday: [
      { className: 'Math 101', matiere: 'Algebra', place: 'Room 101', timeRange: { start: '09:00', end: '10:00' } },
    ],
    Tuesday: [],
    Wednesday: [
      { className: 'Physics 201', matiere: 'Mechanics', place: 'Room 202', timeRange: { start: '11:00', end: '12:00' } },
    ],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  const handleClickOpen = (day: string, index: number | null, startTime: string) => {
    setSelectedSlot({ day, index, startTime });
    if (index !== null && timetable[day][index]) {
      setModalMode('leave');
    } else {
      setModalMode('MakeUpSession');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalMode(null);
    setSelectedSlot(null);
  };

  // Generate time slots for display (based on admin-set slots and default times)
  const getTimeSlots = () => {
    const allTimes = new Set<string>(defaultTimeSlots);
    Object.values(timetable).forEach((daySlots) => {
      daySlots.forEach((slot) => {
        allTimes.add(slot.timeRange.start);
        allTimes.add(slot.timeRange.end);
      });
    });
    return Array.from(allTimes).sort();
  };

  // Mock LeaveApplicationForm component (for leave requests)
  const LeaveApplicationForm = ({ slotDetails, onClose }: { slotDetails: TimetableSlot; onClose: () => void }) => (
    <Box>
      <Typography color="text.primary">
        Request Leave for {slotDetails.className} ({slotDetails.timeRange.start} - {slotDetails.timeRange.end})
      </Typography>
      <TextField label="Reason for Leave" fullWidth margin="normal" />
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="contained" onClick={onClose}>Submit</Button>
        <Button onClick={onClose}>Cancel</Button>
      </Stack>
    </Box>
  );

  // ApplyMakeUpSession component for requesting make-up sessions with custom times
  const ApplyMakeUpSession = ({ slotDetails, onClose }: { slotDetails: { day: string; time: string }; onClose: () => void }) => {
    const [className, setClassName] = useState('');
    const [matiere, setMatiere] = useState('');
    const [place, setPlace] = useState('');
    const [startTime, setStartTime] = useState(slotDetails.time);
    const [endTime, setEndTime] = useState('');

    const handleSubmit = () => {
      if (className && matiere && place && startTime && endTime) {
        // Simulate submitting the make-up session request (no timetable modification)
        console.log('Make-up session request:', {
          day: slotDetails.day,
          className,
          matiere,
          place,
          timeRange: { start: startTime, end: endTime },
        });
        onClose();
      }
    };

    return (
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          label="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subject"
          value={matiere}
          onChange={(e) => setMatiere(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Time (HH:MM)"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="e.g., 14:30"
        />
        <TextField
          label="End Time (HH:MM)"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="e.g., 15:30"
        />
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Stack>
      </Box>
    );
  };

  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1, bgcolor: 'background.paper' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5} flexWrap="wrap" gap={3}>
        <Typography variant="h4" color="text.primary">
          Timetable
        </Typography>
      </Stack>

      <Box width={1} flexGrow={1} minHeight={325}>
        <table style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center', padding: '10px', width: '15%' }}>Time</th>
              {daysOfWeek.map((day) => (
                <th key={day} style={{ textAlign: 'center', padding: '10px', width: '14%' }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getTimeSlots().map((time, timeIndex) => (
              <tr key={timeIndex}>
                <td style={{ textAlign: 'center', padding: '10px', verticalAlign: 'top' }}>{time}</td>
                {daysOfWeek.map((day) => {
                  const slot = timetable[day].find((s) => s.timeRange.start === time);
                  return (
                    <td key={day} style={{ textAlign: 'center', padding: '10px', verticalAlign: 'top' }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleClickOpen(day, slot ? timetable[day].findIndex((s) => s === slot) : null, time)}
                        sx={{
                          minHeight: '70px',
                          height: '70px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'none',
                        }}
                      >
                        {slot
                          ? `${slot.className} - ${slot.matiere} - ${slot.place} (${slot.timeRange.start} - ${slot.timeRange.end})`
                          : 'Free'}
                      </Button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" color="text.primary">
            {modalMode === 'leave' ? 'Request Leave' : 'Request Make-up Session'}
          </Typography>

          {modalMode === 'leave' && selectedSlot && selectedSlot.index !== null && timetable[selectedSlot.day][selectedSlot.index] && (
            <LeaveApplicationForm
              slotDetails={timetable[selectedSlot.day][selectedSlot.index]}
              onClose={handleClose}
            />
          )}

          {modalMode === 'MakeUpSession' && (
            <ApplyMakeUpSession
              slotDetails={{ day: selectedSlot?.day || 'Monday', time: selectedSlot?.startTime || '08:00' }}
              onClose={handleClose}
            />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default Timetable;