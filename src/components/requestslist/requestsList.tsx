// src/components/requestslist/requestsList.tsx

import {  Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useRequestData , Request } from 'data/requestsList';

const RequestsList = () => {
  const { acceptedRequests, declinedRequests, pendingRequests } = useRequestData();

  const renderRequestList = (requests: Request[]) => (
    <List>
      {requests.map((request, index) => (
        <div key={index}>
          <ListItem
            sx={{
              backgroundColor: 'background.default',
              borderRadius: 1,
              marginBottom: 1,
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <ListItemText
              primary={`${request.professorName} - ${request.date}`}
              secondary={request.reason}
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );

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
        Submitted Requests
      </Typography>

      {/* Accepted Requests */}
      <Typography variant="h6" color="common.white" mb={2}>
        Accepted Requests
      </Typography>
      {renderRequestList(acceptedRequests)}

      {/* Declined Requests */}
      <Typography variant="h6" color="common.white" mt={4} mb={2}>
        Declined Requests
      </Typography>
      {renderRequestList(declinedRequests)}

      {/* Pending Requests */}
      <Typography variant="h6" color="common.white" mt={4} mb={2}>
        Pending Requests
      </Typography>
      {renderRequestList(pendingRequests)}
    </Paper>
  );
};

export default RequestsList;
