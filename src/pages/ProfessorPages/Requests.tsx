import { ReactElement } from 'react';
import { Box } from '@mui/material';
import RequestsList from 'components/requestslist/requestsList';





const Request = (): ReactElement => {
  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3.5}>
        <Box gridColumn={{ xs: 'span 12', '2xl': 'span 12' }} order={{ xs: 0 }}>
        <RequestsList />
        </Box>
       
      </Box>
    </>
  );
};

export default Request;
