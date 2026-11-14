import AttachmentItem from './AttachmentItem';
import { openExternalLink } from '@/features/tasks/utils/task.utils';

const TaskAttachments = ({ attachments = [] }) => {
    if (attachments.length === 0) return null;

    return (
        <div className="mt-2">
            <label className="text-xs font-medium text-muted">Attachments</label>
            {attachments.map((link, index) => (
                <AttachmentItem
                    key={`link_${index}`}
                    link={link}
                    index={index}
                    onClick={() => openExternalLink(link)}
                />
            ))}
        </div>
    );
};

export default TaskAttachments;