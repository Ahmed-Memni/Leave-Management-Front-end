import { ReactElement, useState } from 'react';
import { Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Data from 'data/Summary';
import Card from './SaleCard';

const Today = (): ReactElement => {
  const [selectedProfessor, setSelectedProfessor] = useState<string>('All Professors');

  // Extract unique professor names from Data
  const professorNames = ['All Professors', ...new Set(Data.map((item) => item.professorName || 'Unknown'))];

  // Filter Data based on selected professor
  const filteredData = selectedProfessor === 'All Professors'
    ? Data
    : Data.filter((item) => item.professorName === selectedProfessor);

  const handleProfessorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProfessor(event.target.value as string);
  };

  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
      <Typography variant="h4" color="common.white" mb={1.25}>
        Absences Summary
      </Typography>
      <Typography variant="subtitle2" color="text.disabled" mb={2}>
        Summary
      </Typography>
      <FormControl fullWidth sx={{ mb: 4, maxWidth: 300 }}>
        <InputLabel id="professor-select-label">Professor</InputLabel>
        <Select
          labelId="professor-select-label"
          value={selectedProfessor}
          label="Professor"
          onChange={handleProfessorChange}
        >
          {professorNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={{ xs: 4, sm: 6 }}>
        {filteredData.map((Item) => (
          <Box key={Item.id} gridColumn={{ xs: 'span 12', sm: 'span 6', lg: 'span 3' }}>
            <Card Item={Item} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Today;