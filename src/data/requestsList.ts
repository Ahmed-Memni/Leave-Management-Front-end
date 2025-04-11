

import { useState } from 'react';

// Define the Request type properly
export interface Request {
  professorName: string;
  date: string;
  reason: string;
  status: 'Accepted' | 'Declined' | 'Pending';
}

export const useRequestData = () => {
  const [requests] = useState<Request[]>([
    { professorName: 'Prof. John Doe', date: '2025-04-01', reason: 'Lecture on Embedded Systems', status: 'Accepted' },
    { professorName: 'Prof. Jane Smith', date: '2025-04-05', reason: 'Research Meeting', status: 'Pending' },
    { professorName: 'Prof. Mark Lee', date: '2025-04-08', reason: 'Lab Session', status: 'Declined' },
    { professorName: 'Prof. Alice Brown', date: '2025-04-10', reason: 'Workshop on AI', status: 'Pending' },
  ]);

  // Filter requests based on their status
  const acceptedRequests = requests.filter((request) => request.status === 'Accepted');
  const declinedRequests = requests.filter((request) => request.status === 'Declined');
  const pendingRequests = requests.filter((request) => request.status === 'Pending');

  return { acceptedRequests, declinedRequests, pendingRequests };
};
