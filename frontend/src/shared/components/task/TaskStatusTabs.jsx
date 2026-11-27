import React from 'react';


const TaskStatusTabs = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {

  return (
    <div className='w-full bg-white rounded-xl border border-gray-200/80 shadow-sm p-2 sm:p-4'>
      <div className='flex items-stretch w-full gap-1 bg-gray-100/80 rounded-lg p-1 overflow-x-auto'>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`group relative flex items-center justify-center gap-2 flex-1 min-w-fit px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-white/60'
                }`}
            >
              <span className='whitespace-nowrap'>{tab.label}</span>
              <span
                className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full transition-colors duration-200
                  ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-200/70 text-gray-600 group-hover:bg-gray-200'
                  }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
