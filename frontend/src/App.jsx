import React, { useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import HomePage from '@/features/home/pages/HomePage';
import { ManageTaskPage, CreateTaskPage, ManageUserPage, ReportsPage } from '@/features/admin/index';
import MyTasksPage from "@/features/user/pages/MyTasksPage";
import PrivateRoute from '@/shared/routes/PrivateRoute';
import UserProvider, { UserContext } from '@/shared/context/useContext';
import { Toaster } from "react-hot-toast";
import ViewTaskDetailPage from "@/features/tasks/pages/ViewTaskDetailPage";
import AuthPage from "@/features/auth/pages/AuthPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/auth/:method" element={<AuthPage />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/tasks" element={<ManageTaskPage />} />
            <Route path="/admin/create-task" element={<CreateTaskPage />} />
            <Route path="/admin/view-task/:id" element={<ViewTaskDetailPage />} />
            <Route path="/admin/users" element={<ManageUserPage />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={['member']} />}>
            <Route path="/user/dashboard" element={<DashboardPage />} />
            <Route path="/user/tasks" element={<MyTasksPage />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetailPage />} />
          </Route>

          {/* Default Route */}
          <Route path="/" element={<Root />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }} />
    </UserProvider>
  )
}

export default App

const Root = () => {
  const { user, loading } = useContext(UserContext);
  if (loading) return <Outlet />
  if (!user) {
    return <Navigate to='/Home' />
  }
  return user.role === "admin" ? <Navigate to='/admin/dashboard' /> : <Navigate to='/user/dashboard' />
}