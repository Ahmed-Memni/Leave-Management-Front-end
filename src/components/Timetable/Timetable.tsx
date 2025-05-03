import React, { useState } from 'react';
import { Box, Paper, Stack, Button, Typography, Modal } from '@mui/material';
import LeaveApplicationForm from 'components/Applyleave/applyleave';
import ApplyMakeUpSession from 'components/Applyleave/applyMakeupSession';

interface TimetableSlot {
  className: string;
  matiere: string;
  place: string;
  timeRange: { start: string; end: string };
}

const Timetable = () => {
  const [modalMode, setModalMode] = useState<"leave" | "MakeUpSession" | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; index: number | null } | null>(null);

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

  const handleClickOpen = (day: string, index: number | null, startTime?: string) => {
    setSelectedSlot({ day, index });
    if (index !== null && timetable[day][index]) {
      // Filled slot: Open leave request modal
      setModalMode('leave');
    } else {
      // Free slot: Open make-up session request modal
      setModalMode('MakeUpSession');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalMode(null);
    setSelectedSlot(null);
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
                  const slot = timetable[day].find((s) => s.timeRange.start === time);
                  const nextTime = getTimeSlots().find((t, i) => i > timeIndex) || getNextTime(time);
                  return (
                    <td key={day} style={{ textAlign: 'center', padding: '10px', verticalAlign: 'top' }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                          handleClickOpen(
                            day,
                            slot ? timetable[day].findIndex((s) => s === slot) : null,
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
          <Typography variant="h6" component="h2">
            {modalMode === 'leave' ? 'Request Leave' : 'Request Make-up Session'}
          </Typography>

          {modalMode === 'leave' && (
            <LeaveApplicationForm
              slotDetails={selectedSlot && timetable[selectedSlot.day][selectedSlot.index!]}
              onClose={handleClose}
            />
          )}

          {modalMode === 'MakeUpSession' && (
            <ApplyMakeUpSession
              slotDetails={{ day: selectedSlot?.day, time: selectedSlot ? getTimeSlots()[getTimeSlots().indexOf(timetable[selectedSlot.day][0]?.timeRange.start || '08:00')] : '08:00' }}
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