import { Paper, Typography, List, ListItem, ListItemText, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, CircularProgress } from '@mui/material';
import { useRequestData, Request } from '../data/RequestListAdmin';
import { useState } from 'react';

const AdminRequestHistory = () => {
  const { acceptedRequests, declinedRequests, loading, error } = useRequestData();
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
      {requests.map((request) => (
        <div key={request.id}>
          <ListItem
            sx={{
              backgroundColor: 'background.paper',
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
              primaryTypographyProps={{ color: 'text.primary' }}
              secondaryTypographyProps={{ color: 'text.secondary' }}
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
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h4" color="text.primary" mb={6}>
        Request History
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error">Error loading requests: {error}</Typography>
      )}

      {!loading && !error && (
        <>
          <Typography variant="h6" color="text.primary" mb={2}>
            Accepted Requests
          </Typography>
          {acceptedRequests.length > 0 ? renderRequestList(acceptedRequests) : (
            <Typography variant="body1" color="text.secondary">
              No accepted requests.
            </Typography>
          )}

          <Typography variant="h6" color="text.primary" mt={4} mb={2}>
            Declined Requests
          </Typography>
          {declinedRequests.length > 0 ? renderRequestList(declinedRequests) : (
            <Typography variant="body1" color="text.secondary">
              No declined requests.
            </Typography>
          )}
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { bgcolor: 'background.paper' },
        }}
      >
        <DialogTitle sx={{ color: 'text.primary' }}>
          Request Details
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box>
              <Typography variant="h6" color="text.primary">
                Professor: {selectedRequest.professorName}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                Date: {selectedRequest.date}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                Reason: {selectedRequest.reason}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Status: {selectedRequest.status}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AdminRequestHistory;