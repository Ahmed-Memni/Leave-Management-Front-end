import { ReactElement, useState } from 'react';
import AcceptIcon from '../../../../assets/images/popout/mark.png';
import RejectIcon from '../../../../assets/images/popout/decline.png';
import {
  Card,
  Stack,
  CardMedia,
  Typography,
  CardContent,
  LinearProgress,
  Modal,
  Box,
} from '@mui/material';
import { TrendingItem } from 'data/MightUse';

const SlideItem = ({ trendingItem }: { trendingItem: TrendingItem }): ReactElement => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        sx={{
          bgcolor: 'background.default',
          height: 1,
          cursor: 'pointer',
          transition: '0.2s',
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          image={trendingItem.imgsrc}
          sx={{
            height: 187,
          }}
        />
        <CardContent
          sx={{
            height: 110,
          }}
        >
          <Typography variant="body1" color="text.secondary" mb={2}>
            {trendingItem.name}
          </Typography>
          <Stack direction="row" justifyContent="space-between" color="text.primary" mb={2}>
            <Typography variant="body2">Popularity</Typography>
            <Typography variant="body2">{trendingItem.popularity}%</Typography>
          </Stack>
          <LinearProgress variant="determinate" color="info" value={trendingItem.popularity} />
        </CardContent>
      </Card>

      {/* Popout Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
      <Box
       sx={{
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       bgcolor: 'background.paper',
       boxShadow: 24,
       borderRadius: 2,
       p: 4,
       width: 320,
       textAlign: 'center',
       }}
        >
  <Typography variant="h6" mb={2}>
    {trendingItem.name}
  </Typography>

  <img
    src={trendingItem.imgsrc}
    alt={trendingItem.name}
    style={{ width: '100%', borderRadius: 8, marginBottom: 12 }}
  />

  <Typography variant="body1" mb={3}>
    ti5dim ya3tik b asba
  </Typography>

  <Stack direction="row" justifyContent="center" gap={4}>
    <img
      src={AcceptIcon}
      alt="Accept"
      style={{ width: 40, height: 40, cursor: 'pointer' }}
      onClick={() => {
        console.log('Accepted');
        setOpen(false);
      }}
    />
    <img
      src={RejectIcon}
      alt="Reject"
      style={{ width: 40, height: 40, cursor: 'pointer' }}
      onClick={() => {
        console.log('Rejected');
        setOpen(false);
      }}
    />
  </Stack>
</Box>

      </Modal>
    </>
  );
};

export default SlideItem;
