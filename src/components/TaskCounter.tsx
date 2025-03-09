// src/components/TaskCounter.tsx
import React from 'react';

interface TaskCounterProps {
  completedCount: number;
  pendingCount: number;
}

const TaskCounter: React.FC<TaskCounterProps> = ({ completedCount, pendingCount }) => {
  return (
    <div className="flex space-x-4 my-4">
      <div className="flex-1 bg-amber-100 p-4 rounded-lg flex flex-col items-center justify-center">
        <span className="text-sm font-medium">COMPLETED TASKS</span>
        <span className="text-3xl font-bold">{completedCount.toString().padStart(2, '0')}</span>
      </div>
      
      <div className="flex-1 bg-rose-200 p-4 rounded-lg flex flex-col items-center justify-center">
        <span className="text-sm font-medium">PENDING TASKS</span>
        <span className="text-3xl font-bold">{pendingCount.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default TaskCounter;