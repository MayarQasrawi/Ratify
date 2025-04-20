import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import RootLayout from '../layouts/RootLayout';
import Dashboard from '../layouts/Dashboard';
import Home from '../pages/user/Home';
import  ExpertsPage from '../pages/user/ExpertsPage';
import TrackPage from '../pages/user/TrackPage';
import  TrackDetailsPage from '../pages/user/TrackDetailsPage';

const MyTracksPage = lazy(() => import('../pages/applicant/MyTracksPage'));
const Login = lazy(() => import('../components/view/Login'));
const Register = lazy(() => import('../components/view/Register'));
const ForgetPassword = lazy(() => import('../pages/general/ForgetPassword'));
const ResetPassword = lazy(() => import('../pages/general/ResetPassword'));
const UnAuthorized = lazy(() => import('../pages/general/UnAuthorized'));
const NotFoundPage = lazy(() => import('../pages/general/NotFoundPage'));
const AdminHome = lazy(() => import('../pages/admin/AdminHome'));
const Team = lazy(() => import('../pages/admin/Team'));
const AdminTrack = lazy(() => import('../pages/admin/track/Track'));
const TrackSetup = lazy(() => import('../pages/admin/track/TrackSetup'));
const TrackDetails = lazy(() => import('../pages/admin/track/TrackDetails'));
const SeniorHome = lazy(() => import('../pages/seniorExaminer/SeniorHome'));
const Plan = lazy(() => import('../pages/seniorExaminer/plan/Plan'));
const PlanSetup = lazy(() => import('../pages/seniorExaminer/plan/definePlan/PlanSetup'));
const PlanStructure = lazy(() => import('../pages/seniorExaminer/plan/definePlan/PlanStructure'));
const EditCriteria = lazy(() => import('../pages/seniorExaminer/plan/definePlan/EditCriteria'));

const LoadingFallback = () => <div>Loading...</div>;

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: (
            <Home />
        ),
      },
      {
        path: 'our-tracks',
        element: (
            <TrackPage />
        ),
      },
      {
        path: 'our-experts',
        element: (
            <ExpertsPage />
        ),
      },
      {
        path: 'my-tracks',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MyTracksPage />
          </Suspense>
        ),
      },
      {
        path: 'track-details/:id',
        element: (
            <TrackDetailsPage />
        ),
      },
    ],
  },
  {
    path: 'login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: 'signup',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: 'forgetPassword',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: 'resetPassword',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: 'unAuthorized',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <UnAuthorized />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    ),
    children: [
      {
        path: 'admin',
          // element: <ProtectedRoute allowRole="Admin" />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AdminHome />
              </Suspense>
            ),
          },
          {
            path: 'teams',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <Team />
              </Suspense>
            ),
          },
          {
            path: 'tracks',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AdminTrack />
              </Suspense>
            ),
          },
          {
            path: 'tracks/setup',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <TrackSetup />
              </Suspense>
            ),
          },
          {
            path: 'track-details',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <TrackDetails />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'seniorExaminer',
        // element: <ProtectedRoute allowRole="Examiner" />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <SeniorHome />
              </Suspense>
            ),
          },
          {
            path: 'plan',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <Plan />
              </Suspense>
            ),
          },
          {
            path: 'plan-setup',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <PlanSetup />
              </Suspense>
            ),
          },
          {
            path: 'plan-structure',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <PlanStructure />
              </Suspense>
            ),
          },
          {
            path: 'edit-criteria',
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <EditCriteria />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'examiner',
        // element: <ProtectedRoute allowRole="Examiner" />, 
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <SeniorHome />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

