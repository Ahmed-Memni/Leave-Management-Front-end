import { ReactElement } from 'react';
import { Box } from '@mui/material';
import CreateProf from 'components/CreateProf/CreatePr';
import CreateTimetable from 'components/Timetable/TimetableCreate';

const Create = (): ReactElement => {
    
    
    
  
      return (
        <>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3.5}>
            <Box gridColumn={{ xs: 'span 12', '2xl': 'span 12' }} order={{ xs: 0 }}>
              <CreateProf />
            </Box>
           
          </Box>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3.5}>
            <Box gridColumn={{ xs: 'span 12', '2xl': 'span 12' }} order={{ xs: 0 }}>
              <CreateTimetable />
            </Box>
           
          </Box>
        </>
      );
   
}
export default Create;
