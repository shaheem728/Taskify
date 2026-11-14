import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query'
import {
    buildBarChartData,
    buildPieChartData,
    hasChartData,
} from '@/features/dashboard/utils/dashboard.utils.js';

const useDashboard = (fetcher) => {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: fetcher
    })
    const charts = data?.charts || null;
    const pieChartData = useMemo(() => buildPieChartData(charts), [charts]);
    const barChartData = useMemo(() => buildBarChartData(charts), [charts]);

    return {
        isLoading,
        taskDistribution: charts?.taskDistribution || {},
        pieChartData,
        barChartData,
        hasDistributionData: hasChartData(pieChartData),
        hasPriorityData: hasChartData(barChartData),
        recentTasks: data?.recentTasks || [],
    };
};

export default useDashboard;