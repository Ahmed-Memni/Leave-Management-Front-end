import { ReactElement } from 'react';
import { Box } from '@mui/material';

import CustomerFulfillment from 'components/sections/dashboard/customer-fulfilment/CustomerFulfillment';


import TopProducts from 'components/sections/dashboard/top-products/TopProducts';
/* import TrendingNow from 'components/sections/dashboard/trending-now/TrendingNow'; */
import Customers from 'components/sections/dashboard/Professors/Professors';

import Level from 'components/sections/dashboard/level/Level';
/* import LeaveApplicationForm from 'components/Applyleave/applyleave';
import Timetable from 'components/Timetable/Timetable';
import RequestsList from 'components/RequestsTabl/RequestsTabl'; */
import TodaysSales from 'components/sections/dashboard/todays-sales/TodaySales';

const Dashboard = (): ReactElement => {
  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3.5}>
        <Box gridColumn={{ xs: 'span 12', '2xl': 'span 12' }} order={{ xs: 0 }}>
          <TodaysSales />
        </Box>
        <Box gridColumn={{ xs: 'span 12', lg: 'span 12' }} order={{ xs: 1, '2xl': 1 }}>
          <Level />
        </Box>
        <Box gridColumn={{ xs: 'span 12', lg: 'span 12' }} order={{ xs: 2, '2xl': 2 }}>
          <TopProducts />
        </Box>
        <Box
          gridColumn={{ xs: 'span 12', xl: 'span 8', '2xl': 'span 12' }}
          order={{ xs: 3, xl: 3, '2xl': 3 }}
        >
          <CustomerFulfillment />
        </Box> 
      {/*    <Box
            gridColumn={{ xs: 'span 12', xl: 'span 8', '2xl': 'span 6' }}
            order={{ xs: 6, '2xl': 6 }}
          >
            <TrendingNow />
          </Box> */}
       {/*  <Box  gridColumn={{ xs: 'span 12', lg: 'span 10' }} order={{ xs: 7 }} style={{ padding: '2rem' }}>
        <LeaveApplicationForm onClose={() => console.log('Form closed')} />
    </Box> */}
        <Box gridColumn={{ xs: 'span 12', lg: 'span 12' }} order={{ xs: 7 }}>
          <Customers />
        </Box>
        </Box>
{/*      

        <Box gridColumn={{ xs: 'span 12', lg: 'span 10' }} order={{ xs: 7 }}>
          <RequestsList />
        </Box>
    <Box >
      <Timetable></Timetable>
      </Box> */}
      
    </>
  );
};

export default Dashboard;
