import { Paper, Typography, List, ListItem, ListItemText, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box } from '@mui/material';
import { useRequestData, Request } from 'data/requestsList';
import { useState } from 'react';

const AdminRequestHistory = () => {
  const { acceptedRequests, declinedRequests } = useRequestData();
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleClickOpen = (request: Request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

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
              cursor: 'pointer',
            }}
            onClick={() => handleClickOpen(request)}
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
        Request History
      </Typography>

      {/* Accepted Requests */}
      <Typography variant="h6" color="common.white" mb={2}>
        Accepted Requests
      </Typography>
      {acceptedRequests.length > 0 ? renderRequestList(acceptedRequests) : (
        <Typography variant="body1" color="common.white">
          No accepted requests.
        </Typography>
      )}

      {/* Declined Requests */}
      <Typography variant="h6" color="common.white" mt={4} mb={2}>
        Declined Requests
      </Typography>
      {declinedRequests.length > 0 ? renderRequestList(declinedRequests) : (
        <Typography variant="body1" color="common.white">
          No declined requests.
        </Typography>
      )}

      {/* Dialog for request details */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#282339',
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: '#282339', color: 'common.white' }}>
          Request Details
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'background.default' }}>
          {selectedRequest && (
            <Box>
              <Typography variant="h6" color="common.white">
                Professor: {selectedRequest.professorName}
              </Typography>
              <Typography variant="body1" color="common.white" mb={2}>
                Date: {selectedRequest.date}
              </Typography>
              <Typography variant="body1" color="common.white">
                Reason: {selectedRequest.reason}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'background.default' }}>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminRequestHistory;