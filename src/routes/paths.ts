


export const rootPaths = {
  homeRoot: '/',
  authRoot: 'authentication',
  errorRoot: 'error',
  timetableRoot: 'professor/timetable', // Added timetable path (HomePage)
  editRoot: 'professor/edit',
  requestsRoot: 'professor/requests',
  createProfRoot: 'admin/create',
  RequestsListRoot : 'admin/requests',
  ManageRoot : 'admin/manage',
};

export default {
  home: `/${rootPaths.homeRoot}`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  404: `/${rootPaths.errorRoot}/404`,
  timetable: `/${rootPaths.timetableRoot}`, // Added timetable path here(HomePage)
  edit : `/${rootPaths.editRoot}`,
  requests : `/${rootPaths.requestsRoot}`,
  CreateProf :  `/${rootPaths.createProfRoot}`,
  RequestsLists :  `/${rootPaths.RequestsListRoot}`,
  Manage : `/${rootPaths.ManageRoot}`,
};
