import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { requestData, Request } from './../../data/Requestsdata';

const RequestsList: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (request: Request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  const handleApprove = () => {
    if (selectedRequest) {
      console.log(`Request ID ${selectedRequest.id} approved.`);
      handleClose(); // Close the dialog after approving
    }
  };

  const handleDecline = () => {
    if (selectedRequest) {
      console.log(`Request ID ${selectedRequest.id} declined.`);
      handleClose(); // Close the dialog after declining
    }
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
      {/* Title */}
      <Typography variant="h4" color="common.white" mb={6}>
        Requests List
      </Typography>

      {/* Table Container */}
      <TableContainer>
        <Table>
          <TableBody>
            {requestData.map((req) => (
              <TableRow key={req.id}>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleOpen(req)}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      borderColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderColor: 'white',
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Typography variant="body1" fontWeight={500} color="white">
                        {req.professor}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        {req.date}
                      </Typography>
                    </Stack>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog / Popout */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'common.white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
          }}
        >
          <Typography variant="h6" color="common.white">
            Request Details
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'common.white' }}>
            <IconifyIcon icon="mdi:close" />
          </IconButton>
        </Box>

        <DialogContent dividers>
  {selectedRequest && (
    <>
      <Typography variant="body1" gutterBottom>
        <strong>Professor:</strong> {selectedRequest.professor}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Date:</strong> {selectedRequest.date}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Description:</strong> {selectedRequest.description}
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleApprove}
          sx={{ width: '48%' }}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDecline}
          sx={{ width: '48%' }}
        >
          Decline
        </Button>
      </Box>
    </>
  )}
</DialogContent>

      </Dialog>
    </Paper>
  );
};

export default RequestsList;
