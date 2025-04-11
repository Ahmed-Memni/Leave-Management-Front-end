import React, { useState, useCallback, ChangeEvent } from 'react';
import { Box, Paper, Stack, Button, Typography, TextField, Modal } from '@mui/material';
import LeaveApplicationForm from 'components/Applyleave/applyleave';
import ApplyMakeUpSession from 'components/Applyleave/applyMakeupSession';

interface TimetableSlot {
  className: string;
  matiere: string;
  place: string;
}

const Timetable = () => {
  const [modalMode, setModalMode] = useState<"leave" | "edit" | "fill" | null |"MakeUpSession">(null);
  const [showForm, setShowForm] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00'
  ];

  const [open, setOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; index: number } | null>(null);
  const [className, setClassName] = useState<string>('');
  const [matiere, setMatiere] = useState<string>('');
  const [place, setPlace] = useState<string>('');

  const [timetable, setTimetable] = useState<{ [key: string]: TimetableSlot[] }>({
    Monday: Array(8).fill({ className: '', matiere: '', place: '' }),
    Tuesday: Array(8).fill({ className: '', matiere: '', place: '' }),
    Wednesday: Array(8).fill({ className: '', matiere: '', place: '' }),
    Thursday: Array(8).fill({ className: '', matiere: '', place: '' }),
    Friday: Array(8).fill({ className: '', matiere: '', place: '' }),
    Saturday: Array(8).fill({ className: '', matiere: '', place: '' }),
  });

  const handleClickOpen = (day: string, index: number) => {
    setSelectedSlot({ day, index });
    setClassName(timetable[day][index].className);
    setMatiere(timetable[day][index].matiere);
    setPlace(timetable[day][index].place);
    setOpen(true);
    setModalMode(null);
  };

  const handleClose = () => {
    setOpen(false);
    setModalMode(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (selectedSlot) {
      const updatedTimetable = { ...timetable };
      updatedTimetable[selectedSlot.day][selectedSlot.index] = {
        className,
        matiere,
        place,
      };
      setTimetable(updatedTimetable);
      setOpen(false);
      setModalMode(null);
      setShowForm(false);
    }
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
      setter(event.target.value);
    },
    []
  );

  const handleButtonClick = (buttonType: 'leave' | 'edit' | 'fill'|'MakeUpSession') => {
    const isContentFilled = Boolean(className && matiere && place);

    if (buttonType === 'leave' && isContentFilled) {
      setModalMode('leave');
      setShowForm(true);
    } else if (buttonType === 'edit' && isContentFilled) {
      setModalMode('edit');
    } else if (buttonType === 'fill' && !isContentFilled) {
      setModalMode('fill');
    }
    else if (buttonType == 'MakeUpSession' && !isContentFilled){
      setModalMode('MakeUpSession');
    }

    setOpen(true);
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
                <th key={day} style={{ textAlign: 'center', padding: '10px', width: '14%' }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center', padding: '10px', verticalAlign: 'top' }}>{time}</td>
                {daysOfWeek.map((day) => (
                  <td key={day} style={{ textAlign: 'center', padding: '10px', verticalAlign: 'top' }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleClickOpen(day, index)}
                      sx={{
                        minHeight: '70px',
                        height: '70px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textTransform: 'none',
                      }}
                    >
                      {timetable[day][index].className || timetable[day][index].matiere || timetable[day][index].place
                        ? `${timetable[day][index].className} - ${timetable[day][index].matiere} - ${timetable[day][index].place}`
                        : 'Free'}
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* Modal for editing or leave application */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Edit Timetable Slot
          </Typography>

          {modalMode === "leave" && showForm && (
            <LeaveApplicationForm onClose={() => {
              setShowForm(false);
              setModalMode(null);
            }} />
          )}
          


          {(modalMode === "edit" || modalMode === "fill") && (
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

              <Stack direction="row" spacing={2} mt={2}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </Stack>
            </>
          )}

{modalMode === "MakeUpSession" && (
            <ApplyMakeUpSession onClose={() => {
              setShowForm(false);
              setModalMode(null);
            }} />
          )}

          {!modalMode && (
            <Stack direction="row" spacing={2} mt={3}>
              {Boolean(className && matiere && place) ? (
                <>
                  <Button onClick={() => handleButtonClick("leave")}>Apply for a Leave</Button>
                  <Button onClick={() => handleButtonClick("edit")}>Edit</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleButtonClick("MakeUpSession")}>Apply for a Make-up Session</Button>
                  <Button onClick={() => handleButtonClick("fill")}>Fill</Button>
                </>
              )}
            </Stack>
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

// Modal style
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
