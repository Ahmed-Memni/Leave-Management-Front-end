import React, { useState, useCallback, ChangeEvent } from 'react';
import { Box, Paper, Stack, Button, Typography, TextField, Modal } from '@mui/material';
import LeaveApplicationForm from 'components/Applyleave/applyleave';
import ApplyMakeUpSession from 'components/Applyleave/applyMakeupSession';

interface TimetableSlot {
  className: string;
  matiere: string;
  place: string;
  timeRange: { start: string; end: string };
}

const Timetable = () => {
  const [modalMode, setModalMode] = useState<"leave" | "edit" | "fill" | "MakeUpSession" | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; index: number } | null>(null);
  const [className, setClassName] = useState<string>('');
  const [matiere, setMatiere] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Default time slots for display
  const defaultTimeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const [timetable, setTimetable] = useState<{ [key: string]: TimetableSlot[] }>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  const handleClickOpen = (day: string, index: number | null, startTime?: string, endTime?: string) => {
    if (index !== null && timetable[day][index]) {
      setSelectedSlot({ day, index });
      setClassName(timetable[day][index].className);
      setMatiere(timetable[day][index].matiere);
      setPlace(timetable[day][index].place);
      setStartTime(timetable[day][index].timeRange.start);
      setEndTime(timetable[day][index].timeRange.end);
      setModalMode('edit');
    } else {
      setSelectedSlot({ day, index: timetable[day].length });
      setClassName('');
      setMatiere('');
      setPlace('');
      setStartTime(startTime || '');
      setEndTime(endTime || '');
      setModalMode('fill');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalMode(null);
    setShowForm(false);
  };

  // Helper function to get the next time slot (e.g., add 1 hour or use next default slot)
  const getNextTime = (currentTime: string): string => {
    const [hours, minutes] = currentTime.split(':').map(Number);
    const time = new Date();
    time.setHours(hours, minutes);
    time.setHours(time.getHours() + 1); // Assume next slot is 1 hour later
    const nextHours = time.getHours().toString().padStart(2, '0');
    const nextMinutes = time.getMinutes().toString().padStart(2, '0');
    const nextTime = `${nextHours}:${nextMinutes}`;
    // Return the next default time slot if it exists, otherwise the calculated time
    return defaultTimeSlots.find((t) => t > currentTime) || nextTime;
  };

  const handleSave = () => {
    if (selectedSlot && startTime && endTime) {
      const updatedTimetable = { ...timetable };
      const newSlot = {
        className,
        matiere,
        place,
        timeRange: { start: startTime, end: endTime },
      };
      if (modalMode === 'edit' && selectedSlot.index < updatedTimetable[selectedSlot.day].length) {
        updatedTimetable[selectedSlot.day][selectedSlot.index] = newSlot;
      } else {
        updatedTimetable[selectedSlot.day].push(newSlot);
      }
      // Sort slots by start time
      updatedTimetable[selectedSlot.day].sort((a, b) =>
        a.timeRange.start.localeCompare(b.timeRange.start)
      );
      setTimetable(updatedTimetable);
      handleClose();
    }
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
      setter(event.target.value);
    },
    []
  );

  const handleButtonClick = (buttonType: 'leave' | 'edit' | 'fill' | 'MakeUpSession') => {
    const isContentFilled = Boolean(className && matiere && place && startTime && endTime);
    if (buttonType === 'leave' && isContentFilled) {
      setModalMode('leave');
      setShowForm(true);
    } else if (buttonType === 'edit' && isContentFilled) {
      setModalMode('edit');
    } else if (buttonType === 'fill' && !isContentFilled) {
      setModalMode('fill');
    } else if (buttonType === 'MakeUpSession' && !isContentFilled) {
      setModalMode('MakeUpSession');
    }
    setOpen(true);
  };

  // Generate time slots, including default slots and user-defined times
  const getTimeSlots = () => {
    const allTimes = new Set<string>(defaultTimeSlots);
    Object.values(timetable).forEach((daySlots) => {
      daySlots.forEach((slot) => {
        allTimes.add(slot.timeRange.start);
        allTimes.add(slot.timeRange.end);
        // Add the next time slot after the end time
        const nextTime = getNextTime(slot.timeRange.end);
        if (nextTime) {
          allTimes.add(nextTime);
        }
      });
    });
    return Array.from(allTimes).sort();
  };

  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5} flexWrap="wrap" gap={3}>
        <Typography variant="h4" color="common.white">
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
                  const slot = timetable[day].find(
                    (s) => s.timeRange.start === time
                  );
                  const nextTime = getTimeSlots().find((t, i) => i > timeIndex) || getNextTime(time);
                  return (
                    <td key={day} style={{ textAlign: 'center', padding: '10px', verticalAlign: 'top' }}>
                      {slot ? (
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() =>
                            handleClickOpen(
                              day,
                              timetable[day].findIndex((s) => s === slot),
                              time
                            )
                          }
                          sx={{
                            minHeight: '70px',
                            height: '70px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textTransform: 'none',
                          }}
                        >
                          {`${slot.className} - ${slot.matiere} - ${slot.place} (${slot.timeRange.start} - ${slot.timeRange.end})`}
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => handleClickOpen(day, null, time, nextTime)}
                          sx={{
                            minHeight: '70px',
                            height: '70px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textTransform: 'none',
                          }}
                        >
                          Free
                        </Button>
                      )}
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
          <Typography variant="h6" component="h2">
            {modalMode === 'edit' ? 'Edit Timetable Slot' : 'Add Timetable Slot'}
          </Typography>

          {modalMode === 'leave' && showForm && (
            <LeaveApplicationForm
              onClose={() => {
                setShowForm(false);
                setModalMode(null);
              }}
            />
          )}

          {(modalMode === 'edit' || modalMode === 'fill') && (
            <>
              <TextField
                label="Class Name"
                value={className}
                onChange={(e) => handleChange(e, setClassName)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Matière"
                value={matiere}
                onChange={(e) => handleChange(e, setMatiere)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Place"
                value={place}
                onChange={(e) => handleChange(e, setPlace)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Start Time (HH:MM)"
                value={startTime}
                onChange={(e) => handleChange(e, setStartTime)}
                fullWidth
                sx={{ mb: 2 }}
                placeholder="e.g., 08:00"
              />
              <TextField
                label="End Time (HH:MM)"
                value={endTime}
                onChange={(e) => handleChange(e, setEndTime)}
                fullWidth
                sx={{ mb: 2 }}
                placeholder="e.g., 09:00"
              />
              <Stack direction="row" spacing={2} mt={2}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </Stack>
            </>
          )}

          {modalMode === 'MakeUpSession' && (
            <ApplyMakeUpSession
              onClose={() => {
                setShowForm(false);
                setModalMode(null);
              }}
            />
          )}

          {!modalMode && (
            <Stack direction="row" spacing={2} mt={3}>
              {Boolean(className && matiere && place && startTime && endTime) ? (
                <>
                  <Button onClick={() => handleButtonClick('leave')}>Apply for a Leave</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleButtonClick('MakeUpSession')}>
                    Apply for a Make-up Session
                  </Button>
                </>
              )}
            </Stack>
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