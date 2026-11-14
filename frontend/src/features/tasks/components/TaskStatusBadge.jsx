import { getStatusTagClasses } from '@/features/tasks/utils/task.utils';

const TaskStatusBadge = ({ status }) => (
    <div
        className={`rounded px-4 py-0.5 text-[11px] font-medium md:text-[13px] ${getStatusTagClasses(status)}`}
    >
        {status}
    </div>
);

export default TaskStatusBadge;