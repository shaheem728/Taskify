import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/useContext'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import moment from "moment"
import { addThousandsSeparator } from '../../utils/helper'
import InfoCard from "../../components/Cards/InfoCard"
import { LuArrowRight, LuFileSpreadsheet } from 'react-icons/lu'
import TaskLisTable from '../../components/TaskLisTable'
import CustomPieChart from '../../components/Charts/CustomPieChart'
import CustomBarChart from '../../components/Charts/CustomBarChart'

const COLORS = ["#8D51FF","#00B8DB","#7BCE00"]

const UserDashboard = () => {
  useUserAuth()
  const {user}=useContext(UserContext)
  const navigate = useNavigate()
  const [dashboardData,setDashboardData] = useState(null);
  const [pieChartData,setPieChartData] = useState([]);
  const [barChartData,setBarChartData] = useState([]);
  const hasDistributionData = pieChartData.some((item) => Number(item.count) > 0);
  const hasPriorityData = barChartData.some((item) => Number(item.count) > 0);
  const recentTasks = dashboardData?.recentTasks || [];
  
//Prpare Chart Data
const prepareChartData = (data) => {
  const taskDistribution = data?.taskDistribution || null;
  const taskPriorityLevels = data?.taskPriorityLevels || null ;
  const taskDistributionData = [
    {status:"Pending",count:taskDistribution?.Pending || 0},
    {status:"In Progress",count:taskDistribution?.InProgress || 0},
    {status:"Completed",count:taskDistribution?.Completed || 0},
  ];
  setPieChartData(taskDistributionData);

  const PriorityLevelData = [
    {priority:"Low",count:taskPriorityLevels?.Low || 0},
    {priority:"Medium",count:taskPriorityLevels?.Medium || 0},
    {priority:"High",count:taskPriorityLevels?.High || 0},
  ];
  setBarChartData(PriorityLevelData);
}

  const getDashboardData = async()=>{
    try{
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );
      if(response.data){
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    }catch(error){
      console.error("Error fetching users:",error)
    }
  }
  const onSeeMore =()=>{
    navigate('/user/tasks')
  }
  useEffect(()=>{
    getDashboardData();
    return ()=>{}
  },[]);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='card my-5'>
        <div>
        <div className='col-span-3'>
          <h2 className='text-xl md:text-2xl'>Good Morning!{user?.name}</h2>
          <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
            {moment().format("dddd Do MM YYYY")}
          </p>
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
            
            {hasDistributionData ? (
              <CustomPieChart 
              data={pieChartData}
              colors={COLORS}/>
            ) : (
              <EmptyState
                title="No task distribution found"
                message="Assigned tasks will appear here by status."
              />
            )}

          </div>
        </div>

        <div>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='font-medium'>Task Priority Levels</h5>
            </div>
            
            {hasPriorityData ? (
              <CustomBarChart 
              data={barChartData}
              colors={COLORS}/>
            ) : (
              <EmptyState
                title="No task priority data found"
                message="Assigned tasks will appear here by priority."
              />
            )}

          </div>
        </div>

        <div className='md:col-span-2'>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='text-lg'>Recent Tasks</h5>

              <button className='card-btn' onClick={onSeeMore}>
                See All<LuArrowRight className='text-base'/>
              </button>
            </div>

            {recentTasks.length > 0 ? (
              <TaskLisTable tableData={recentTasks}/>
            ) : (
              <EmptyState
                title="No recent tasks found"
                message="Your recently assigned tasks will appear here."
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const EmptyState = ({ title, message }) => (
  <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 mt-4 text-center'>
    <LuFileSpreadsheet className='text-4xl text-slate-300 mb-3' />
    <h3 className='text-base font-medium text-slate-700'>{title}</h3>
    <p className='text-sm text-slate-500 mt-1'>{message}</p>
  </div>
);

export default UserDashboard

