// src/components/TaskCard.tsx
import React from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, completed: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onEdit, onDelete }) => {
  return (
    <div className="p-4 mb-3 bg-amber-100 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold">{task.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{task.description}</p>
        </div>
        <div className="flex">
          <button onClick={() => onStatusChange(task.id, !task.completed)} className="w-6 h-6 mr-2">
            <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${task.completed ? 'border-green-500 bg-green-100' : 'border-gray-300'}`}>
              {task.completed && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          </button>
          <button onClick={() => onEdit(task.id)} className="w-6 h-6 mr-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>
          <button onClick={() => onDelete(task.id)} className="w-6 h-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="text-sm">Start date :</span>
        <span className="ml-2 text-sm font-medium">{task.startDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;