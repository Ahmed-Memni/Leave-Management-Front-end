import totalSales from 'assets/images/todays-sales/total-sales.png';
import totalOrder from 'assets/images/todays-sales/total-order.png';
import productSold from 'assets/images/todays-sales/product-sold.png';
import newCustomer from 'assets/images/todays-sales/new-customer.png';

export interface SaleItem {
  id?: number;
  icon: string;
  title: string;
  subtitle: string;
  increment: number;
  color: string;
}

const salesData: SaleItem[] = [
  {
    id: 1,
    icon: totalSales,
    title: '50',
    subtitle: 'Total Absents Requested',
    increment: 10,
    color: 'warning.main',
  },
  {
    id: 2,
    icon: totalOrder,
    title: '25',
    subtitle: 'Total Absents Accepted',
    increment: 5,
    color: 'primary.main',
  },
  {
    id: 3,
    icon: productSold,
    title: '9',
    subtitle: 'Total Additional Sessions ',
    increment: 2,
    color: 'secondary.main',
  },
  
];

export default salesData;
