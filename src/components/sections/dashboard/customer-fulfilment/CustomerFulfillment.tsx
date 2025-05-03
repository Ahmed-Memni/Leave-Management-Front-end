import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Divider, Paper, Stack, Typography, alpha, useTheme, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import CustomerFulfillmentChart from './CustomerFulfillmentChart';
import { currencyFormat } from 'helpers/format-functions';
import { customerFulfillmentData } from 'data/chart-data/Chart';

interface CustomerFulfillmentProps {
  'This Month': number[];
  'Last Month': number[];
}

const CustomerFulfillment = (): ReactElement => {
  const theme = useTheme();
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<string>('All Professors');

  // Extract professor names
  const professorNames = ['All Professors', ...customerFulfillmentData.map((prof) => prof.name)];

  // Filter or aggregate data based on selected professor
  const filteredData: CustomerFulfillmentProps = selectedProfessor === 'All Professors'
    ? {
        'This Month': customerFulfillmentData.reduce(
          (acc, prof) => acc.map((val, i) => val + prof.data['This Month'][i]),
          Array(7).fill(0)
        ),
        'Last Month': customerFulfillmentData.reduce(
          (acc, prof) => acc.map((val, i) => val + prof.data['Last Month'][i]),
          Array(7).fill(0)
        ),
      }
    : customerFulfillmentData.find((prof) => prof.name === selectedProfessor)!.data;

  // Log filteredData for debugging
  useEffect(() => {
    console.log('Filtered Data:', filteredData);
  }, [filteredData]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getTotalFulfillment = useCallback(
    (chartData: number[]) => {
      return currencyFormat(chartData.reduce((prev, current) => prev + current, 0));
    },
    []
  );

  const handleProfessorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProfessor(event.target.value as string);
  };

  return (
    <Paper sx={{ p: { xs: 4, sm: 8 }, height: 1 }}>
      <Typography variant="h4" color="common.white" mb={1.25}>
        Absences vs Make up Sessions
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
      <CustomerFulfillmentChart
        chartRef={chartRef}
        sx={{ height: '220px !important', flexGrow: 1 }}
        data={filteredData}
      />
      <Stack
        direction="row"
        justifyContent="space-around"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: alpha(theme.palette.common.white, 0.06), height: 1 }}
          />
        }
        px={2}
        pt={3}
        sx={{
          transitionProperty: 'all',
          transitionDelay: '1s',
        }}
      >
        <Stack gap={1.25} alignItems="center">
          <Button
            variant="text"
            sx={{
              p: 0.5,
              borderRadius: 1,
              fontSize: 'body2.fontSize',
              color: 'text.disabled',
              '&:hover': {
                bgcolor: 'transparent',
              },
              '& .MuiButton-startIcon': {
                mx: 0,
                mr: 1,
              },
            }}
            disableRipple
            startIcon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  bgcolor: 'secondary.main',
                  borderRadius: 400,
                }}
              />
            }
          >
            Make up Sessions
          </Button>
          <Typography variant="body2" color="common.white">
            {getTotalFulfillment(filteredData['This Month'])}
          </Typography>
        </Stack>
        <Stack gap={1.25} alignItems="center">
          <Button
            variant="text"
            sx={{
              p: 0.5,
              borderRadius: 1,
              fontSize: 'body2.fontSize',
              color: 'text.disabled',
              '&:hover': {
                bgcolor: 'transparent',
              },
              '& .MuiButton-startIcon': {
                mx: 0,
                mr: 1,
              },
            }}
            disableRipple
            startIcon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  bgcolor: 'primary.main',
                  borderRadius: 400,
                }}
              />
            }
          >
            Absences
          </Button>
          <Typography variant="body2" color="common.white">
            {getTotalFulfillment(filteredData['Last Month'])}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CustomerFulfillment;