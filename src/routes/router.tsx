import { lazy, Suspense } from 'react';
import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';

// ⏳ Loaders
import PageLoader from 'components/loading/PageLoader';
import Splash from 'components/loading/Splash';

// 🛣️ Paths
import paths, { rootPaths } from './paths';

// 🧱 Layouts
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const ProfessorLayout = lazy(() => import('layouts/Professor-Layout'));
const AdminLayout = lazy(() => import('layouts/admin-layout'));

// 📄 Pages
const Dashboard = lazy(() => import('pages/DirectreurPages/Dashboard'));
const Login = lazy(() => import('pages/authentication/Login'));
const SignUp = lazy(() => import('pages/authentication/SignUp'));
const ErrorPage = lazy(() => import('pages/error/ErrorPage'));
const RListPage = lazy(() => import('pages/AdminPages/RequestsHistory'));

const HomePage = lazy(() => import('pages/ProfessorPages/TimeTable'));
const EditPage = lazy(() => import('pages/ProfessorPages/Edit-Profile'));
const RequestPage = lazy(() => import('pages/ProfessorPages/Requests'));
const Passw = lazy(() => import('pages/ProfessorPages/changepass'));

const CreatePage = lazy(() => import('pages/AdminPages/CreateProfessor'));
const RequestsListPage = lazy(() => import('pages/AdminPages/RequestsTab'));
const ManagePage = lazy(() => import('pages/AdminPages/ManageProfessors'));

const routes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      // 🌐 Main Layout
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

      // 🔐 Auth Layout
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

      // 👨‍🏫 Professor Layout
      {
        element: (
          <ProfessorLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </ProfessorLayout>
        ),
        children: [
          {
            path: rootPaths.timetableRoot,
            element: <HomePage />,
          },
          {
            path: rootPaths.editRoot,
            element: <EditPage />,
          },
          {
            path: rootPaths.changeRoot,
            element: <Passw />,
          },
          {
            path: rootPaths.requestsRoot,
            element: <RequestPage />,
          },
        ],
      },

      // 👨‍💼 Admin Layout
      {
        element: (
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </AdminLayout>
        ),
        children: [
          {
            path: rootPaths.createProfRoot,
            element: <CreatePage />,
          },
          {
            path: rootPaths.RequestsListRoot,
            element: <RequestsListPage />,
          },
          {
            path: rootPaths.ManageRoot,
            element: <ManagePage />,
          },
          {
            path: rootPaths.RlistRoot,
            element : <RListPage/>
          }
        ],
      },
    ],
  },

  // ❌ Error/Fallback route
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <ErrorPage />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
