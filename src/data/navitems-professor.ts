import { rootPaths } from "routes/paths";

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
      path: `${rootPaths.timetableRoot}`,
      title: 'TimeTable',
      icon: 'mingcute:home-1-fill',
      active: true,
    },
     {
      id: 2,
      path: `${rootPaths.editRoot}`,
      title: 'Profile',
      icon: 'clarity:user-line',
      active: true,
    },
  
  /*   {
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
    },*/
    {
      id: 10,
      path: `${rootPaths.requestsRoot}`,
      title: 'Requests',
      icon: 'ic:round-history',
      active: false,
    }, 
    {
      id: 2,
      path: 'authentication/login',
      title: 'Login',
      icon: 'tabler:login',
      active: true,
    },

  ];
  
  export default navItems;
  