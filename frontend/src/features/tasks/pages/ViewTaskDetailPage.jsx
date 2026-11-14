import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';

import DashboardLayout from '@/shared/layouts/DashboardLayout';
import AssignedUserList from '@/shared/components/profile/AssignedUserList';
import { TodoCheckList } from '@/features/tasks/components/todo/TodoCheckList';
import { UserContext } from '@/shared/context/useContext';

import InfoBox from '@/features/tasks/components/InfoBox';
import TaskStatusBadge from '@/features/tasks/components/TaskStatusBadge';
import TaskAttachments from '@/features/tasks/components/TaskAttachments';
import { useTaskDetail } from '@/features/tasks/hooks/useTaskDetails';
import { formatTaskDate, getActiveMenu } from '@/features/tasks/utils/task.utils';

const ViewTaskDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { task, updateTodoStatus } = useTaskDetail(id, user?.user);

    return (
        <DashboardLayout activeMenu={getActiveMenu(user?.role)}>
            <div className="mt-5">
                {task && (
                    <div className="mt-4 flex flex-wrap">
                        <div className="form-card">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-medium md:text-xl">{task.title}</h2>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600 bg-slate-50 rounded px-2 py-1 border border-slate-200 cursor-pointer"
                                    >
                                        <LuArrowLeft className="text-base" /> Back
                                    </button>
                                    <TaskStatusBadge status={task.status} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <InfoBox label="Description" value={task.description} />
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div>
                                    <InfoBox label="Priority" value={task.priority} />
                                </div>
                                <div>
                                    <InfoBox label="Due Date" value={formatTaskDate(task.dueDate)} />
                                </div>
                                <div>
                                    <InfoBox label="Updated Date" value={formatTaskDate(task.updatedAt)} />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted">Assigned To</label>
                                    <AssignedUserList users={task.assignedTo || []} />
                                </div>
                            </div>

                            <TaskAttachments attachments={task.attachments} />

                            <div className="mt-2">
                                <label className="text-xs font-medium text-muted">Todo Checklist</label>
                                <TodoCheckList
                                    items={task.todoChecklist || []}
                                    onDrop={updateTodoStatus}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ViewTaskDetailPage;