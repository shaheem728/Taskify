import { useDroppable } from '@dnd-kit/react';

export function Droppable({ id, children, className = '' }) {
  const { ref, isDropTarget } = useDroppable({ id });

  return (
    <div
      ref={ref}
      className={`${className} transition-colors ${isDropTarget ? 'bg-sky-100/70 ring-2 ring-inset ring-sky-300' : ''}`}
    >
      {children}
    </div>
  );
}
