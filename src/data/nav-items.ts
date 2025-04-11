export interface NavItem {
  id: number;
  path: string;
  title: string;
  icon: string;
  active: boolean;
}

const navItems: NavItem[] = [
  {
    id: 1,
    path: '/',
    title: 'Dashboard',
    icon: 'mingcute:home-1-fill',
    active: true,
  },
/*   {
    id: 2,
    path: '#!',
    title: 'Profile',
    icon: 'clarity:user-line',
    active: false,
  },

  {
    id: 7,
    path: '#!',
    title: 'Requests',
    icon: 'bi:chat',
    active: false,
  },
  {
    id: 8,
    path: '#!',
    title: 'Settings',
    icon: 'mingcute:settings-3-line',
    active: false,
  },
  {
    id: 9,
    path: '#!',
    title: 'Favourite',
    icon: 'clarity:favorite-line',
    active: false,
  },
  {
    id: 10,
    path: '#!',
    title: 'History',
    icon: 'ic:round-history',
    active: false,
  }, */
  {
    id: 2,
    path: 'authentication/login',
    title: 'Sign Out',
    icon: 'tabler:login',
    active: true,
  },
 /*  {
    id: 12,
    path: 'authentication/sign-up',
    title: 'Sign Out',
    icon: 'tdesign:user-add',
    active: true,
  }, */
];

export default navItems;
