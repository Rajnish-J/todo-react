import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTaskContext } from '../context/TaskContext';

const TaskPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { tasks, addNewTask, editTask } = useTaskContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Find the task if editing
  const taskToEdit = id ? tasks.find(task => task.id === id) : null;
  
  // Set initial values for the form
  const initialValues = taskToEdit ? {
    title: taskToEdit.title,
    description: taskToEdit.description,
    startDate: taskToEdit.startDate,
    priority: taskToEdit.priority
  } : {
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    priority: 1
  };
  
  const handleSubmit = async (formData: {
    title: string;
    description: string;
    startDate: string;
    priority: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      if (id && taskToEdit) {
        // Update existing task
        await editTask(id, formData);
      } else {
        // Add new task
        await addNewTask(formData);
      }
      
      // Navigate back to dashboard
      navigate('/');
    } catch (err) {
      setError('Failed to save task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/');
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Task' : 'Add New Task'}
      </h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">Saving task...</div>
      ) : (
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialValues={initialValues}
        />
      )}
    </div>
  );
};

export default TaskPage;