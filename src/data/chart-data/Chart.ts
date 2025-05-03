interface ProfessorFulfillment {
  name: string;
  data: {
    'This Month': number[];
    'Last Month': number[];
  };
}

export const customerFulfillmentData: ProfessorFulfillment[] = [
  {
    name: 'Smith',
    data: {
      'This Month': [100, 120, 130, 110, 115, 125, 105],
      'Last Month': [90, 100, 110, 95, 100, 105, 90],
    },
  },
  {
    name: 'Jones',
    data: {
      'This Month': [250, 260, 270, 240, 245, 255, 250],
      'Last Month': [200, 210, 220, 205, 210, 215, 200],
    },
  },
  {
    name: 'Brown',
    data: {
      'This Month': [415, 415, 560, 145, 135, 280, 260],
      'Last Month': [390, 111, 554, 329, 421, 152, 322],
    },
  },
];