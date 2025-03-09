// src/components/TaskForm.tsx
import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (taskData: {
    title: string;
    description: string;
    startDate: string;
    priority: number;
  }) => void;
  onCancel: () => void;
  initialValues?: {
    title: string;
    description: string;
    startDate: string;
    priority: number;
  };
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialValues = {
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    priority: 1
  }
}) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'priority' ? parseInt(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows={3}
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          {[1, 2, 3, 4, 5].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button 
          type="button" 
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;