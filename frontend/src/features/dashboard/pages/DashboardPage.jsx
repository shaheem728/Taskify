import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck } from 'lucide-react';
import { useUserAuth } from '@/features/auth/hooks/useUserAuth';
import { UserContext } from '@/shared/context/useContext';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import useDashboard from '@/features/dashboard/hooks/useDashboard';
import { fetchUserDashboard, fetchAdminDashboard } from '@/features/dashboard/api/dashboardAPI';
import DashboardView from '@/features/dashboard/components/DashboardView';
import WelcomeBanner from '@/features/dashboard/components/WelcomeBanner';

const DashboardPage = () => {
    useUserAuth();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const dashboard = useDashboard(user.role === "admin" ? fetchAdminDashboard : fetchUserDashboard);
    const orgName = user?.organization?.orgname;

    return (
        <DashboardLayout activeMenu="Dashboard">
            <DashboardView
                dashboard={dashboard}
                onSeeMore={() => navigate(user?.user?.role === "admin" ? '/admin/tasks' : '/user/tasks')}
                hero={
                    <WelcomeBanner
                        orgName={orgName}
                        roleLabel={user?.user?.role === "admin" ? "Administrator Workspace" : "Member Workspace"}
                        RoleIcon={UserCheck}
                        description={`You are viewing your workspace for ${orgName} as a Member. Stay on top of your tasks, update progress, and collaborate seamlessly.`}
                    />
                }
            />
        </DashboardLayout>
    );
};

export default DashboardPage;