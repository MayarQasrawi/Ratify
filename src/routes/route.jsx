import React, { Suspense, lazy } from "react";
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import Dashboard from "../layouts/Dashboard";
import Home from "../pages/user/Home";
import ExpertsPage from "../pages/user/ExpertsPage";
import TrackPage from "../pages/user/TrackPage";
import TrackDetailsPage from "../pages/user/TrackDetailsPage";
const ExamStage = lazy(() => import("../pages/applicant/ExamStage"));
const InterviewStage = lazy(() => import("../pages/applicant/InterviewStage"));
const TaskStage = lazy(() => import("../pages/applicant/TaskStage"));
const MyTracksPage = lazy(() => import("../pages/applicant/MyTracksPage"));
const Login = lazy(() => import("../components/view/Login"));
const Register = lazy(() => import("../components/view/Register"));
const ForgetPassword = lazy(() => import("../pages/general/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/general/ResetPassword"));
const UnAuthorized = lazy(() => import("../pages/general/UnAuthorized"));
const NotFoundPage = lazy(() => import("../pages/general/NotFoundPage"));
const AdminHome = lazy(() => import("../pages/admin/AdminHome"));
const Team = lazy(() => import("../pages/admin/Team"));
const AdminTrack = lazy(() => import("../pages/admin/track/Track"));
const TrackSetup = lazy(() => import("../pages/admin/track/TrackSetup"));
const TrackDetails = lazy(() => import("../pages/admin/track/TrackDetails"));
const SeniorHome = lazy(() => import("../pages/seniorExaminer/SeniorHome"));
const Plan = lazy(() => import("../pages/seniorExaminer/plan/Plan"));
const PlanSetup = lazy(() =>
  import("../pages/seniorExaminer/plan/definePlan/PlanSetup")
);
const PlanStructure = lazy(() =>
  import("../pages/seniorExaminer/plan/definePlan/PlanStructure")
);
const EditCriteria = lazy(() =>
  import("../pages/seniorExaminer/plan/definePlan/EditCriteria")
);
const Applicants = lazy(() => import("../components/admin/Applicants"));
const Deriver = lazy(() => import("../components/applicant/dashboard/deriver"));
const ErrorPage = lazy(() => import("../pages/general/ErrorPage"));
import SchedulingView from "@/components/seniorExaminer/appointments/SchedulingView";
import AppointmentDashboard from "@/components/allExaminer/appointment/AppointmentDashboard";
import Derivers from "@/components/applicant/dashboard/Deriver";
const TrackStructureDetails = lazy(() =>
  import("../pages/seniorExaminer/plan/TrackStructureDetails")
);
import LoadingFallback, { 
  MinimalLoadingFallback, 
  SkeletonLoadingFallback, 
  MorphingLoadingFallback 
} from '@/pages/general/LoadingFallback';
import AssignCreationAssignments from "../pages/seniorExaminer/assignCreation/AssignCreationAssignments";
import AssignedWork from "../pages/examiner/AssignedWork";
import ExaminerHome from "@/pages/examiner/ExaminerHome";
import MyCertificate from "@/pages/applicant/MyCertificate";
import ManageFeadback from "@/pages/examiner/ManageFeadback";
import MaterialProvider from "@/contexts/MaterialProvider";
import AI from "@/pages/ai/AI";
import CourseOutline from "@/pages/ai/CourseOutline";
import Quiz from "@/pages/ai/Quiz";
import Material from "@/pages/ai/Material";
import FlashcardPage from "@/pages/ai/Flashcards";
const EvaluationWork = lazy(() => import("../pages/examiner/EvaluationWork"));
const EvaluationRequests = lazy(() =>
  import("../pages/examiner/task/evaluationRequest/EvaluationRequests")
);
const ExamRequest = lazy(() =>
  import("../pages/seniorExaminer/exam/ExamRequest")
);
const ExamStages = lazy(() =>
  import("../pages/seniorExaminer/exam/ExamStages")
);
const Task = lazy(() => import("../pages/seniorExaminer/manageTask/Task"));
const CreateTask = lazy(() => import("../pages/examiner/task/CreateTask"));
const ManageTask = lazy(() =>
  import("../pages/seniorExaminer/manageTask/ManageTask")
);
const TeamWorkload = lazy(() =>
  import("../pages/seniorExaminer/teams/TeamWorkload")
);
const ViewDetails = lazy(() => import("../pages/admin/ViewDetailes"));
const SidebarLayout = lazy(() =>
  import("../layouts/SidebarLayout")
);



export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <ScrollRestoration />
        <RootLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "test",
        element: <ViewDetails />,
      },
      {
        path: "our-tracks",
        element: <TrackPage />,
      },
      {
        path: "our-experts",
        element: <ExpertsPage />,
      },
      {
        path: "my-tracks",
        element: (
          <Suspense fallback={null}>
            <MyTracksPage />
          </Suspense>
        ),
      },
      {
        path: "track-details/:id",
        element: <TrackDetailsPage />,
      },
    ],
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "forgetPassword",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ForgetPassword />
      </Suspense>
    ),
  },
  {
    path: "resetPassword",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "unAuthorized",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <UnAuthorized />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <ScrollRestoration />
        <Dashboard />
      </AuthProvider>
    ),
    children: [
      {
        path: "admin",
        // element: <ProtectedRoute allowRole="Admin" />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={null}>
                <AdminHome />
              </Suspense>
            ),
          },
          {
            path: "teams",
            element: (
              <Suspense fallback={null}>
                <Team />
              </Suspense>
            ),
          },
          {
            path: "ViewDetails/:id",
            element: (
              <Suspense fallback={null}>
                <ViewDetails />
              </Suspense>
            ),
          },
          {
            path: "applicants",
            element: (
              <Suspense fallback={null}>
                <Applicants />
              </Suspense>
            ),
          },
          {
            path: "tracks",
            element: (
              <Suspense fallback={null}>
                <AdminTrack />
              </Suspense>
            ),
          },
          {
            path: "tracks/setup",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <TrackSetup />
              </Suspense>
            ),
          },
          {
            path: "track-details",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <TrackDetails />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "seniorExaminer",
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
            path: "workload-management",
            element: (
              // <Suspense fallback={<LoadingFallback />}>
              <TeamWorkload />
              // </Suspense>
            ),
          },
          {
            path: "assign-creation",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AssignCreationAssignments />
              </Suspense>
            ),
          },
          {
            path: "plan",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <Plan />
              </Suspense>
            ),
          },
          {
            path: "plan-setup",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <PlanSetup />
              </Suspense>
            ),
          },
          {
            path: "plan-structure",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <PlanStructure />
              </Suspense>
            ),
          },
          {
            path: "edit-criteria",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <EditCriteria />
              </Suspense>
            ),
          },
          {
            path: "appointments",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <SchedulingView />
              </Suspense>
            ),
          },
          {
            path: "manage-task",
            element: (
              <Suspense fallback={null}>
                <ManageTask />
              </Suspense>
            ),
          },
          {
            path: "stage-tasks",
            element: (
              <Suspense fallback={null}>
                <Task />
              </Suspense>
            ),
          },
          {
            path: "exams-stages",
            element: (
              <Suspense fallback={null}>
                <ExamStages />
              </Suspense>
            ),
          },
          {
            path: "exams-request",
            element: (
              <Suspense fallback={null}>
                <ExamRequest />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "examiner",
        // element: <ProtectedRoute allowRole="Examiner" />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <ExaminerHome />
              </Suspense>
            ),
          },
          {
            path: "appointments",
            element: <AppointmentDashboard />,
          },
          {
            path: "stage-tasks",
            element: (
              <Suspense fallback={null}>
                <Task />
              </Suspense>
            ),
          },
          {
            path: "add-task",
            element: (
              <Suspense fallback={null}>
                <CreateTask />
              </Suspense>
            ),
          },
          {
            path: "pending-evaluations",
            element: (
              <Suspense fallback={null}>
                <EvaluationRequests />
              </Suspense>
            ),
          },
          {
            path: "todo-assignments",
            element: (
              <Suspense fallback={null}>
                <AssignedWork />
              </Suspense>
            ),
          },
          {
            path: "evaluation-work",
            element: (
              <Suspense fallback={null}>
                <EvaluationWork />
              </Suspense>
            ),
          },
          {
            path: "manage-feedback",
            element: (
              <Suspense fallback={null}>
                <ManageFeadback />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "applicant",

    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AuthProvider>
              <ScrollRestoration />
              <RootLayout />
            </AuthProvider>
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<MinimalLoadingFallback />}>
                <MyTracksPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "applicant",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          <ScrollRestoration />
          <MaterialProvider>
            <SidebarLayout />
          </MaterialProvider>
        </AuthProvider>
      </Suspense>
    ),
    children: [
      {
        path: "my-tracks/:name/:enrollmentId",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Deriver />
          </Suspense>
        ),
      },

      {
        path: "my-certificate",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MyCertificate />
          </Suspense>
        ),
      },
               { path: "exam/:stageProgressId",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <ExamStage />
                  </Suspense>
                ),
              },
              {
                path: "interview/:stageProgressId",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <InterviewStage />
                  </Suspense>
                ),
              },
              {
                path: "task/:stageProgressId",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <TaskStage />
              </Suspense>
            ),
          },
          ,
      { path: "ai-assistant", element: <AI /> },
      { path: "ai-courseOutline", element: <CourseOutline /> },
      { path: "ai-quiz", element: <Quiz /> },
      { path: "ai-card", element: <FlashcardPage /> },
      { path: "ai-material", element: <Material /> },
          
            ],
          },

  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
        {/* <ErrorPage error={{"type":"not-found"}}  /> */}
      </Suspense>
    ),
  },
]);
