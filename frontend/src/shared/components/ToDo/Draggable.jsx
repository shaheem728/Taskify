import { useDraggable } from '@dnd-kit/react';

export function Draggable({ id, data, children }) {
  const { ref, isDragging } = useDraggable({ id, data });

  return (
    <div
      ref={ref}
      className={`cursor-grab rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition hover:border-sky-300 hover:shadow active:cursor-grabbing ${isDragging ? 'opacity-40' : ''}`}
    >
      {children}
    </div>
  );
}
