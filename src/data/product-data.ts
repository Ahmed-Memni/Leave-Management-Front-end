import { LinearProgressProps } from '@mui/material';

export interface ProductItem {
  id?: string;
  name: string;
  color: LinearProgressProps['color'];
  sales: number;
}

export const productTableRows: ProductItem[] = [
  {
    id: '01',
    name: 'Ahmed Memni',
    color: 'warning',
    sales: 78,
  },
  {
    id: '02',
    name: 'Bin Ali ',
    color: 'primary',
    sales: 62,
  },
  {
    id: '03',
    name: 'Akrem',
    color: 'info',
    sales: 51,
  },
  {
    id: '04',
    name: 'Didi',
    color: 'secondary',
    sales: 29,
  },
];
