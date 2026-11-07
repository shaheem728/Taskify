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
      <div className='mt-2  rounded-xl border border-slate-200 bg-white'>
        <div className='lg:grid lg:min-w-[720px] grid-cols-3 divide-x divide-slate-200'>
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

                <Droppable id={status} className="min-h-[300px] space-y-2 p-3">
                  {todos.length ? (
                    todos.map((item) => (
                      <Draggable key={item._id} id={item._id} data={item}>
                        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">

                          {/* Todo Text */}
                          <p className="text-sm font-medium text-slate-700">
                            {item.text}
                          </p>

                          {/* Updated By */}
                          {item.updateBy && (
                            <div className="mt-3 flex justify-between items-center gap-2 border-t border-slate-100 pt-2">
                              <div className=' flex flex-col gap-1'>
                                <span className="text-[10px] text-slate-400">
                                  Updated By
                                </span>
                                <div className='flex items-center gap-2'>
                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                                    <span className="text-xs font-semibold text-slate-600">
                                      {item.updateBy.name?.charAt(0).toUpperCase()}
                                    </span>
                                  </div>

                                  <div className="flex flex-1 flex-col">
                                    <span className="text-sm font-medium text-slate-700">
                                      {item.updateBy.name}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {item.updateBy.email}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <span
                                className={`rounded-full px-2 pt-3  text-[10px] font-semibold capitalize ${item.updateBy.role === "admin"
                                  ? "bg-purple-50 text-purple-600"
                                  : "bg-blue-50 text-blue-600"
                                  }`}
                              >
                                {item.updateBy.role}
                              </span>
                            </div>
                          )}
                        </div>
                      </Draggable>
                    ))
                  ) : (
                    <p className="py-8 text-center text-xs text-slate-400">
                      Drop items here
                    </p>
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
