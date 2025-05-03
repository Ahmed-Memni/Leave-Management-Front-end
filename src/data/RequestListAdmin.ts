import { useState, useEffect } from 'react';

// Define the Request interface
export interface Request {
  id: string;
  professorName: string;
  date: string;
  reason: string;
  status: 'accepted' | 'declined';
}

// Mock data for requests
const mockRequests: Request[] = [
  {
    id: '1',
    professorName: 'Dr. John Smith',
    date: '2025-05-10',
    reason: 'Personal leave',
    status: 'accepted',
  },
  {
    id: '2',
    professorName: 'Dr. Jane Doe',
    date: '2025-05-12',
    reason: 'Conference attendance',
    status: 'declined',
  },
  {
    id: '3',
    professorName: 'Dr. Alice Brown',
    date: '2025-05-15',
    reason: 'Make-up session request',
    status: 'accepted',
  },
  {
    id: '4',
    professorName: 'Dr. Bob Wilson',
    date: '2025-05-16',
    reason: 'Sick leave',
    status: 'declined',
  },
];

// Custom hook to fetch and filter requests
export const useRequestData = () => {
  const [acceptedRequests, setAcceptedRequests] = useState<Request[]>([]);
  const [declinedRequests, setDeclinedRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchRequests = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Filter requests by status
        const accepted = mockRequests.filter((req) => req.status === 'accepted');
        const declined = mockRequests.filter((req) => req.status === 'declined');
        
        setAcceptedRequests(accepted);
        setDeclinedRequests(declined);
        setLoading(false);
      } catch (err) {
        setError('Failed to load requests');
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return { acceptedRequests, declinedRequests, loading, error };
};