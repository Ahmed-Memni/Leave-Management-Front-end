import { ReactElement } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'components/base/Image';
import { Item } from 'data/Summary';

const Card = ({ Item }: { Item: Item }): ReactElement => {
  return (
    <Stack gap={6} p={5} borderRadius={4} height={1} bgcolor="background.default">
      <Image src={Item.icon} alt={Item.subtitle} width={26} height={26} />
      <Box>
        <Typography variant="h4" color="common.white" mb={4}>
          {Item.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          {Item.subtitle}
        </Typography>
        <Typography variant="body2" color={Item.color} lineHeight={1.25}>
          +{Item.increment}% from yesterday
        </Typography>
      </Box>
    </Stack>
  );
};

export default Card;