import React, { useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import Dashboard from './pages/admin/Dashboard';
import ManageTasks from './pages/admin/ManageTasks';
import CreateTask from './pages/admin/CreateTask';
import ManageUsers from './pages/admin/ManageUsers';
import Reports from './pages/admin/Reports';
import MyTasks from "./pages/user/MyTasks";
import PrivateRoute from './shared/routes/PrivateRoute';
import UserProvider, { UserContext } from './shared/context/useContext';
import { Toaster } from "react-hot-toast";
import UserDashboard from "./pages/user/UserDashboard";
import ViewTaskDetail from "./shared/pages/ViewTaskDetail";
import Auth from "./pages/auth/Auth";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth/:method" element={<Auth />} />


          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/view-task/:id" element={<ViewTaskDetail />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={['member']} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetail />} />
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