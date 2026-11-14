import moment from 'moment';

export const TASK_STATUS = Object.freeze({
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
});

const STATUS_TAG_CLASSES = {
    [TASK_STATUS.IN_PROGRESS]: 'text-cyan-500 bg-cyan-50 border  border-cyan-500/10',
    [TASK_STATUS.COMPLETED]: 'text-lime-500 bg-lime-50 border border-lime-500/20',
};

const DEFAULT_STATUS_TAG_CLASSES = 'text-violet-500 bg-violet-50 border border-violet-500/10';

export const getStatusTagClasses = (status) =>
    STATUS_TAG_CLASSES[status] ?? DEFAULT_STATUS_TAG_CLASSES;

export const formatTaskDate = (date, fallback = 'N/A') =>
    date ? moment(date).format('Do MMM YYYY') : fallback;

/** Prefix links with https:// when no protocol is given. */
export const normalizeLink = (link) =>
    /^https?:\/\//i.test(link) ? link : `https://${link}`;

export const openExternalLink = (link) => {
    window.open(normalizeLink(link), '_blank', 'noopener,noreferrer');
};

/** 0 -> "01", 8 -> "09", 9 -> "10" */
export const formatIndex = (index) => String(index + 1).padStart(2, '0');

export const getActiveMenu = (role) =>
    role === 'admin' ? 'Manage Tasks' : 'My Tasks';