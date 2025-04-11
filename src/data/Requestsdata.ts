// Requestas-data.ts

export type Request = {
  id: number;
  professor: string;
  date: string;
  description: string;
};

export const requestData: Request[] = [
  {
    id: 1,
    professor: 'Dr. Smith',
    date: '2025-04-01',
    description: 'Request for research leave during spring semester.',
  },
  {
    id: 2,
    professor: 'Dr. Johnson',
    date: '2025-04-03',
    description: 'Request to reschedule upcoming lectures.',
  },
  {
    id: 3,
    professor: 'Dr. Williams',
    date: '2025-04-07',
    description: 'Request for additional lab equipment.',
  },
];
