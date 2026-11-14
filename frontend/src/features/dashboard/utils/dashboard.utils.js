export const DASHBOARD_COLORS = ['#8D51FF', '#00B8DB', '#7BCE00'];

export const buildPieChartData = (charts) => {
    const distribution = charts?.taskDistribution;
    return [
        { status: 'Pending', count: distribution?.Pending || 0 },
        { status: 'In Progress', count: distribution?.InProgress || 0 },
        { status: 'Completed', count: distribution?.Completed || 0 },
    ];
};

export const buildBarChartData = (charts) => {
    const levels = charts?.taskPriorityLevels;
    return [
        { priority: 'Low', count: levels?.Low || 0 },
        { priority: 'Medium', count: levels?.Medium || 0 },
        { priority: 'High', count: levels?.High || 0 },
    ];
};

export const hasChartData = (data) => data.some((item) => Number(item.count) > 0);