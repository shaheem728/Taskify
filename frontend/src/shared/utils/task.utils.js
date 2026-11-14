import moment from 'moment';

// Maps statusSummary from the API to tabs with fixed labels and order
export const buildStatusTabs = (statusSummary = {}) => [
    { label: 'All', count: statusSummary.all || 0 },
    { label: 'Pending', count: statusSummary.pendingTasks || 0 },
    { label: 'In Progress', count: statusSummary.inProgressTasks || 0 },
    { label: 'Completed', count: statusSummary.completedTasks || 0 },
];

export const INITIAL_TASK_DATA = {
    title: '',
    description: '',
    priority: '',
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
};

// Returns an error message, or null when the form is valid
export const validateTaskData = (taskData) => {
    if (!taskData.title.trim()) return 'Title is required';
    if (!taskData.description.trim()) return 'Description is required';
    if (!taskData.dueDate) return 'Due date is required';
    if (!taskData.assignedTo?.length) return 'Task not assigned to any member';
    if (!taskData.todoChecklist?.length) return 'Add atleast one todo task';
    return null;
};

// Keeps the existing status of a todo (matched by text) when updating; new todos start as Pending
export const buildTaskPayload = (taskData, currentTask = null) => {
    const previousTodos = currentTask?.todoChecklist || [];
    return {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: taskData.todoChecklist?.map((item) => ({
            text: item.text,
            status: previousTodos.find((todo) => todo.text === item.text)?.status || 'Pending',
        })),
    };
};

// Maps an API task into the shape used by the form
export const mapTaskToFormData = (task) => ({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate ? moment(task.dueDate).format('YYYY-MM-DD') : null,
    assignedTo: task.assignedTo?.map((user) => user?._id) || [],
    todoChecklist: task.todoChecklist?.map((item) => item) || [],
    attachments:
        task.attachments
            ?.map((item) => (typeof item === 'string' ? item : item?.text))
            .filter(Boolean) || [],
});