import React from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

const STATUSES = ['Pending', 'In Progress', 'Completed'];

const statusStyles = {
  Pending: 'border-violet-100 bg-violet-50 text-violet-700',
  'In Progress': 'border-cyan-100 bg-cyan-50 text-cyan-700',
  Completed: 'border-lime-100 bg-lime-50 text-lime-700',
};

export function TodoCheckList({ items = [], onDrop }) {
  const handleDragEnd = (event) => {
    if (event.canceled) return;

    const todoId = event.operation.source?.id;
    const status = event.operation.target?.id;

    if (todoId && STATUSES.includes(status)) {
      onDrop(todoId, status);
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className='mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-white'>
        <div className='grid min-w-[720px] grid-cols-3 divide-x divide-slate-200'>
          {STATUSES.map((status) => {
            const todos = items.filter((item) => item.status === status);

            return (
              <section key={status} className='min-h-[220px] bg-slate-50/50'>
                <header className={`flex items-center justify-between border-b px-4 py-3 ${statusStyles[status]}`}>
                  <h3 className='text-xs font-semibold uppercase tracking-wide'>{status}</h3>
                  <span className='rounded-full bg-white px-2 py-0.5 text-xs font-bold shadow-sm'>
                    {todos.length}
                  </span>
                </header>

                <Droppable id={status} className='min-h-[164px] space-y-2 p-3'>
                  {todos.length ? todos.map((item) => (
                    <Draggable key={item._id} id={item._id} data={item}>
                      <p className='text-sm font-medium text-slate-700'>{item.text}</p>
                    </Draggable>
                  )) : (
                    <p className='py-8 text-center text-xs text-slate-400'>Drop items here</p>
                  )}
                </Droppable>
              </section>
            );
          })}
        </div>
      </div>
    </DragDropProvider>
  );
}
