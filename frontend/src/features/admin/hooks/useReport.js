import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { fetchTaskReport, fetchUserReport } from '@/features/admin/api/adminAPI';
import { saveBlobAsFile } from '@/features/admin/utils/report.utils';

const useReport = () => {
    const [downloadingTasks, setDownloadingTasks] = useState(false);
    const [downloadingUsers, setDownloadingUsers] = useState(false);

    const download = useCallback(async ({ fetcher, filename, label, setLoading }) => {
        setLoading(true);
        try {
            const response = await fetcher();
            saveBlobAsFile(response.data, filename);
            toast.success(`${label} report downloaded successfully!`);
        } catch (error) {
            console.error(`Error downloading ${label.toLowerCase()} report:`, error);
            toast.error(`Failed to download ${label.toLowerCase()} report. Please try again.`);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDownloadTaskReport = useCallback(
        () =>
            download({
                fetcher: fetchTaskReport,
                filename: 'Task_details.xlsx',
                label: 'Tasks',
                setLoading: setDownloadingTasks,
            }),
        [download]
    );

    const handleDownloadUserReport = useCallback(
        () =>
            download({
                fetcher: fetchUserReport,
                filename: 'user_details.xlsx',
                label: 'Users',
                setLoading: setDownloadingUsers,
            }),
        [download]
    );

    return {
        downloadingTasks,
        downloadingUsers,
        handleDownloadTaskReport,
        handleDownloadUserReport,
    };
};

export default useReport;