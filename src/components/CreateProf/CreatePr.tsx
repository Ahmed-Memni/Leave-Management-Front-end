import  { useState } from 'react';
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

const CreateProf = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  const handleSubmit = () => {
    console.log({
      fullName,
      email,
      phone,
      gender,
      birthDate,
    });
    // Add validation or API call if needed
    
  };

  return (
    <Paper
      sx={{
        p: { xs: 4, sm: 8 },
        height: '100%',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" color="common.white" mb={6}>
        Create Professor Account
      </Typography>

      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        sx={{
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.23)',
          },
        }}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.23)',
          },
        }}
      />

      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.23)',
          },
        }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="gender-label" sx={{ color: 'common.white' }}>
          Gender
        </InputLabel>
        <Select
          labelId="gender-label"
          value={gender}
          label="Gender"
          onChange={handleGenderChange}
          sx={{
            color: 'common.white',
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
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Birthdate"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        sx={{
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.23)',
          },
        }}
      />
      <TextField
        label="Password"
         type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255,255,255,0.23)',
          },
        }}
      />
{/* i need to take off this button and add it down under timetable and i need to add a variable that saves timetable  so i can console.log or give it to my classmate to change do the backend code  */}
     {/*  <Box mt={4} display="flex" justifyContent="flex-end">
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
          Create 
        </Button>
      </Box> */}
    </Paper>
  );
};

export default CreateProf;
