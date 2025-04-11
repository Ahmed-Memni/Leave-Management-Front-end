import { lazy, Suspense, ReactElement, PropsWithChildren } from 'react';
import { Outlet, RouteObject, RouterProps, createBrowserRouter } from 'react-router-dom';

import PageLoader from 'components/loading/PageLoader';
import Splash from 'components/loading/Splash';
import { rootPaths } from './paths';
import paths from './paths';


const App = lazy<() => ReactElement>(() => import('App'));

const MainLayout = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import('layouts/main-layout'),
);
const AuthLayout = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import('layouts/auth-layout'),
);
const ProfessorLayout = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import('layouts/Professor-Layout'),
);
const AdminLayout = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import('layouts/admin-layout'),
);

const Dashboard = lazy<() => ReactElement>(() => import('pages/DirectreurPages/Dashboard'));
const Login = lazy<() => ReactElement>(() => import('pages/authentication/Login'));
const SignUp = lazy<() => ReactElement>(() => import('pages/authentication/SignUp'));
const ErrorPage = lazy<() => ReactElement>(() => import('pages/error/ErrorPage'));
const HomePage = lazy<() => ReactElement>(() => import('pages/ProfessorPages/TimeTable')); // Corrected to HomePage cuz TimeTable both names gives an error 
const EditPage = lazy<() => ReactElement>(() => import('pages/ProfessorPages/Edit-Profile'));
const RequestPage = lazy<() => ReactElement>(() => import('pages/ProfessorPages/Requests'));
const CreatePage = lazy<() => ReactElement>(() => import('pages/AdminPages/CreateProfessor'));
const  RequestsListPage = lazy<() => ReactElement>(() => import('pages/AdminPages/RequestsTab'));
const  ManagePage = lazy<() => ReactElement>(() => import('pages/AdminPages/ManageProfessors')); 

const routes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.home,
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <AuthLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: paths.login,
            element: <Login />,
          },
          {
            path: paths.signup,
            element: <SignUp />,
          },
        ],
      },
      {
        path: rootPaths.timetableRoot, // requests route for "Professor"
        element: (
          <ProfessorLayout>
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          </ProfessorLayout>
        ),
      },
      {
        path: rootPaths.editRoot, // editpage route for "Professor"
        element: (
          <ProfessorLayout>
            <Suspense fallback={<PageLoader />}>
              <EditPage />
            </Suspense>
          </ProfessorLayout>
        ),
      },
      {
        path: rootPaths.requestsRoot, // editpage route for "Professor"
        element: (
          <ProfessorLayout>
            <Suspense fallback={<PageLoader />}>
              <RequestPage />
            </Suspense>
          </ProfessorLayout>
        ),
      },
      {
        path: rootPaths.createProfRoot, // editpage route for "Professor"
        element: (
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <CreatePage />
            </Suspense>
          </AdminLayout>
        ),
      },
      {
        path: rootPaths.RequestsListRoot, // editpage route for "Professor"
        element: (
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <RequestsListPage />
            </Suspense>
          </AdminLayout>
        ),
      },
      {
        path: rootPaths.ManageRoot, // editpage route for "Professor"
        element: (
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <ManagePage />
            </Suspense>
          </AdminLayout>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];


const options: { basename: string } = {
  basename: '',
};

const router: Partial<RouterProps> = createBrowserRouter(routes, options);

export default router;
