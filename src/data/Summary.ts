import totalAbsences from 'assets/images/todays-sales/Accpeted.png';
import Accepted from 'assets/images/todays-sales/MakeUp.png';
import Makeup from 'assets/images/todays-sales/New.png';

export interface Item {
  id?: number;
  icon: string;
  title: string;
  subtitle: string;
  increment: number;
  color: string;
}

const Data: Item[] = [
  {
    id: 1,
    icon: totalAbsences,
    title: '50',
    subtitle: 'Total Absents Requested',
    increment: 10,
    color: 'warning.main',
  },
  {
    id: 2,
    icon: Accepted,
    title: '25',
    subtitle: 'Total Absents Accepted',
    increment: 5,
    color: 'primary.main',
  },
  {
    id: 3,
    icon: Makeup,
    title: '9',
    subtitle: 'Total Additional Sessions ',
    increment: 2,
    color: 'secondary.main',
  },
  
];

export default Data;
