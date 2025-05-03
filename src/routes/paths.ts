// Root-level paths for use in nested routing structures
export const rootPaths = {
  // 🌐 Main i have to change it to add it to the directuer or wut we call main-layout 
  homeRoot: '/',

  // 🔐 Authentication
  authRoot: 'authentication',

  // ❌ Errors
  errorRoot: 'error',

  // 👨‍🏫 Professor
  timetableRoot: 'professor/timetable',
  editRoot: 'professor/edit',
  requestsRoot: 'professor/requests',
  changeRoot: 'professor/pass',

  // 👨‍💼 Admin
  createProfRoot: 'admin/create',
  RequestsListRoot: 'admin/requests',
  ManageRoot: 'admin/manage',
  RlistRoot : 'admin/History'
};

// Public-facing absolute paths used in routes or navigation
const paths = {
  // 🌐 Main
  home: `/${rootPaths.homeRoot}`,

  // 🔐 Authentication
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,

  // ❌ Errors
  404: `/${rootPaths.errorRoot}/404`,

  // 👨‍🏫 Professor
  timetable: `/${rootPaths.timetableRoot}`,
  edit: `/${rootPaths.editRoot}`,
  requests: `/${rootPaths.requestsRoot}`,
  pass: `/${rootPaths.changeRoot}`,

  // 👨‍💼 Admin
  createProf: `/${rootPaths.createProfRoot}`,
  requestsList: `/${rootPaths.RequestsListRoot}`,
  manage: `/${rootPaths.ManageRoot}`,
  History: `/${rootPaths.RlistRoot}`,
};

export default paths;
