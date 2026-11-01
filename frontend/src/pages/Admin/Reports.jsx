import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import Button from '../../components/Ui/Button';
import {
    LuFileSpreadsheet,
    LuDownload,
    LuClipboardCheck,
    LuUsers,
    LuInfo
} from 'react-icons/lu';

const Reports = () => {
    useUserAuth();
    const [downloadingTasks, setDownloadingTasks] = useState(false);
    const [downloadingUsers, setDownloadingUsers] = useState(false);

    // Download Task Report
    const handleDownloadTaskReport = async () => {
        setDownloadingTasks(true);
        try {
            const response = await axiosInstance.get(API_PATHS.REPORT.EXPORT_TASK, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Task_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success('Tasks report downloaded successfully!');
        } catch (error) {
            console.error('Error downloading task report:', error);
            toast.error('Failed to download tasks report. Please try again.');
        } finally {
            setDownloadingTasks(false);
        }
    };

    // Download User Report
    const handleDownloadUserReport = async () => {
        setDownloadingUsers(true);
        try {
            const response = await axiosInstance.get(API_PATHS.REPORT.EXPORT_USER, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'user_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success('Users report downloaded successfully!');
        } catch (error) {
            console.error('Error downloading user report:', error);
            toast.error('Failed to download users report. Please try again.');
        } finally {
            setDownloadingUsers(false);
        }
    };

    const reportsList = [
        {
            id: 'tasks-report',
            title: 'Tasks Report',
            description:
                'Export all organizational tasks with full details, including task ID, title, priority level, execution status, due date, and assigned team members.',
            icon: LuClipboardCheck,
            iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
            badge: 'Tasks & Workflow',
            columns: [
                'Task ID',
                'Title & Description',
                'Priority (Low, Medium, High)',
                'Status (Pending, In Progress, Completed)',
                'Due Date',
                'Assigned Member Details'
            ],
            filename: 'Task_details.xlsx',
            isLoading: downloadingTasks,
            onDownload: handleDownloadTaskReport,
            actionText: 'Download Tasks Report'
        },
        {
            id: 'users-report',
            title: 'Users & Workload Report',
            description:
                'Export a comprehensive summary of all organization members alongside their current task distribution, completion metrics, and active workloads.',
            icon: LuUsers,
            iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
            badge: 'Team & Workload',
            columns: [
                'Member Name',
                'Email Address',
                'Total Assigned Tasks',
                'Pending Tasks Count',
                'In Progress Tasks Count',
                'Completed Tasks Count'
            ],
            filename: 'user_details.xlsx',
            isLoading: downloadingUsers,
            onDownload: handleDownloadUserReport,
            actionText: 'Download Users Report'
        }
    ];

    return (
        <DashboardLayout activeMenu="Reports">
            <div className="my-6">
                {/* Page Header */}
                <div className="flex flex-col gap-1 mb-8">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-lime-100 text-lime-800 border border-lime-200">
                            <LuFileSpreadsheet className="text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                                Reports & Exports
                            </h2>
                            <p className="text-sm text-slate-500">
                                Generate and download real-time Excel spreadsheets for tasks and member performance.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {reportsList.map((report) => {
                        const Icon = report.icon;
                        return (
                            <div
                                key={report.id}
                                className="card flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 border border-slate-200/80"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-xl border ${report.iconBg}`}>
                                                <Icon className="text-2xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-800">
                                                    {report.title}
                                                </h3>
                                                <span className="text-xs font-medium text-slate-500">
                                                    Format: Excel (.xlsx)
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                            {report.badge}
                                        </span>
                                    </div>

                                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                                        {report.description}
                                    </p>

                                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                                            Included Columns & Data
                                        </h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                                            {report.columns.map((col, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <LuFileSpreadsheet className="text-emerald-500 shrink-0 text-sm" />
                                                    <span className="truncate">{col}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs text-slate-400 font-mono">
                                        {report.filename}
                                    </span>
                                    <Button
                                        onClick={report.onDownload}
                                        isLoading={report.isLoading}
                                        disabled={report.isLoading}
                                        leftIcon={<LuDownload className="text-base" />}
                                        className="!w-auto px-5"
                                    >
                                        {report.actionText}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Informational Banner */}
                <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 text-blue-900 text-sm">
                    <LuInfo className="text-xl text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <span className="font-semibold">Automated Real-Time Generation:</span> All reports are compiled live and scoped exclusively to your organization. Downloaded files are compatible with Microsoft Excel, Google Sheets, Apple Numbers, and LibreOffice Calc.
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;

