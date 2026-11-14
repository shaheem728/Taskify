import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { formatIndex } from '@/features/tasks/utils/task.utils';

const AttachmentItem = ({ link, index, onClick }) => (
    <div
        className="mb-3 mt-2 flex cursor-pointer justify-between rounded-md bg-info-bg px-3 py-2"
        onClick={onClick}
    >
        <div className="flex">
            <span className="mr-2 text-xs font-semibold text-muted">
                {formatIndex(index)}
            </span>
            <p className="text-xs text-text-primary">{link}</p>
        </div>
        <LuSquareArrowOutUpRight className="text-muted hover:text-info-text" />
    </div>
);

export default AttachmentItem;