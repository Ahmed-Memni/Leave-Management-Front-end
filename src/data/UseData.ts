export const useRequestData = () => ({
    acceptedRequests: [
      { professorName: 'John Smith', date: '2025-05-01', reason: 'Conference' },
      { professorName: 'Jane Jones', date: '2025-05-02', reason: 'Personal' },
    ],
    declinedRequests: [
      { professorName: 'Robert Brown', date: '2025-05-03', reason: 'Insufficient notice' },
    ],
    pendingRequests: [], // Ignored
  });