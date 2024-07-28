export const IS_SERVER = typeof window === 'undefined';
export const USE_MOCK_DATA = process.env.useMockData;

export const amenitiesMap = {
  wifi: {
    icon: 'fa fa-wifi',
    name: 'Wifi',
  },
  kitchen: {
    icon: 'fa fa-cutlery',
    name: 'Kitchens',
  },
  tv: {
    icon: 'fa fa-television',
    name: 'TV',
  },
  ac: {
    icon: 'fa fa-snowflake-o',
    name: 'Air conditioning',
  },
  washingmachine: {
    icon: 'fa fa-archive',
    name: 'Washing machine',
  },
  freeparking: {
    icon: 'fa fa-car',
    name: 'Free parking on premises',
  },
  iron: {
    icon: 'fa fa-ioxhost',
    name: 'Iron',
  },
  hairdryer: {
    icon: 'fa fa-steam',
    name: 'Hair Dryer',
  },
  essential: {
    icon: 'fa fa-bath',
    name: 'Essential',
  },
};

export const things_to_knowMap = {
  checkin: {
    icon: 'fa fa-clock-o',
    name: 'Check-in:',
  },
  checkout: {
    icon: 'fa fa-clock-o',
    name: 'Checkout:',
  },
  smoking: {
    icon: 'fa fa-fire',
    name: 'No smoking',
    type: 'checkbox',
  },
  parties: {
    icon: 'fa fa-glass',
    name: 'No parties',
    type: 'checkbox',
  },
};
