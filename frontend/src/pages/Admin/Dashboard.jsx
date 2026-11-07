import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../shared/hooks/useUserAuth'
import { UserContext } from '../../shared/context/useContext'
import DashboardLayout from '../../shared/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../shared/api/axiosInstance'
import { API_PATHS } from '../../shared/api/apiPaths'
import moment from "moment"
import { addThousandsSeparator } from '../../shared/utils/helper'
import InfoCard from "../../shared/components/cards/InfoCard"
import { LuArrowRight } from 'react-icons/lu'
import TaskLisTable from '../../shared/components/task/TaskLisTable'
import CustomPieChart from '../../shared/components/charts/CustomPieChart'
import CustomBarChart from '../../shared/components/charts/CustomBarChart'
import Loading from '../../shared/components/ui/Loading';
import { Building2, PieChart, BarChart3, ListChecks, ShieldCheck, Sparkles, Calendar } from 'lucide-react';
import EmptyState from '../../shared/components/ui/EmptyState';


const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"]

const Dashboard = () => {
  useUserAuth()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasDistributionData = pieChartData.some((item) => Number(item.count) > 0);
  const hasPriorityData = barChartData.some((item) => Number(item.count) > 0);
  const recentTasks = dashboardData?.recentTasks || [];

  //Prpare Chart Data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;
    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];
    setPieChartData(taskDistributionData);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];
    setBarChartData(PriorityLevelData);
  }

  const getDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false);
    }
  }
  const onSeeMore = () => {
    navigate('/admin/tasks')
  }
  useEffect(() => {
    getDashboardData();
    return () => { }
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='card my-5'>
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-6 shadow-md'>
          <div className='absolute -right-8 -bottom-10 opacity-10 pointer-events-none'>
            <Building2 size={160} />
          </div>
          <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-emerald-100 mb-2.5 border border-white/10'>
                <ShieldCheck size={14} className='text-emerald-300' />
                <span>Administrator Workspace</span>
              </div>
              <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2'>
                Welcome to {user?.organization?.orgname || 'your Organization'}
                <Sparkles size={22} className='text-amber-300 shrink-0' />
              </h2>
              <p className='text-sm md:text-base text-emerald-50/90 mt-1 max-w-xl leading-relaxed'>
                You are managing <span className='font-semibold text-white'>{user?.organization?.orgname}</span> as an Admin. Track productivity, manage tasks, and oversee team operations.
              </p>
            </div>
            <div className='self-start md:self-auto shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/15 backdrop-blur-sm border border-white/10 text-xs font-medium text-emerald-100'>
              <Calendar size={14} />
              <span>{moment().format("dddd, Do MMMM YYYY")}</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
            color="bg-primary"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
            color="bg-violet-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
            color="bg-cyan-500"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
            color="bg-lime-500"
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>

        <div>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'>Task Distribution</h5>
            </div>

            {isLoading ? <Loading /> : hasDistributionData ? (
              <CustomPieChart
                data={pieChartData}
                colors={COLORS} />
            ) : (
              <EmptyState
                title="No task distribution found"
                className='mt-4 min-h-[260px]'
                icon={<PieChart className='w-10 h-10 text-slate-300 mb-3' />}
                message="Tasks created for your organization will appear here by status."
              />
            )}

          </div>
        </div>

        <div>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'>Task Priority Levels</h5>
            </div>

            {isLoading ? <Loading /> : hasPriorityData ? (
              <CustomBarChart
                data={barChartData}
                colors={COLORS} />
            ) : (
              <EmptyState
                title="No task priority data found"
                className='mt-4 min-h-[260px]'
                icon={<BarChart3 className='w-10 h-10 text-slate-300 mb-3' />}
                message="Tasks created for your organization will appear here by priority."
              />
            )}

          </div>
        </div>

        <div className='md:col-span-2'>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='text-lg'>Recent Tasks</h5>

              <button className='card-btn' onClick={onSeeMore}>
                See All<LuArrowRight className='text-base' />
              </button>
            </div>
            {isLoading ? <Loading /> : recentTasks.length > 0 ? (
              <TaskLisTable tableData={recentTasks} />
            ) : (
              <EmptyState
                title="No recent tasks found"
                className='mt-4'
                icon={<ListChecks className='w-10 h-10 text-slate-300 mb-3' />}
                message="No tasks created yet. Create a task to get started."
                actionLabel="Create Task"
                onAction={() => navigate('/admin/create-task')}
              />
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


export default Dashboard
