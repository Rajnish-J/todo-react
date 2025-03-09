// src/context/TaskContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../services/api';

// Task type definition
export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  priority: number;
  completed: boolean;
}

// Context type definition
interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addNewTask: (task: Omit<Task, 'id' | 'completed'>) => Promise<void>;
  updateTaskStatus: (id: string, completed: boolean) => Promise<void>;
  editTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  completedTasks: Task[];
  pendingTasks: Task[];
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Custom hook to use the task context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

// Provider component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Derived states
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  // Add a new task
  const addNewTask = async (taskData: Omit<Task, 'id' | 'completed'>) => {
    try {
      setLoading(true);
      const newTask = await addTask({ ...taskData, completed: false });
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update task completion status
  const updateTaskStatus = async (id: string, completed: boolean) => {
    try {
      setLoading(true);
      await updateTask(id, { completed });
      setTasks(prev => 
        prev.map(task => task.id === id ? { ...task, completed } : task)
      );
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing task
  const editTask = async (id: string, updates: Partial<Omit<Task, 'id'>>) => {
    try {
      setLoading(true);
      const updatedTask = await updateTask(id, updates);
      setTasks(prev => 
        prev.map(task => task.id === id ? { ...task, ...updates } : task)
      );
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const removeTask = async (id: string) => {
    try {
      setLoading(true);
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    addNewTask,
    updateTaskStatus,
    editTask,
    removeTask,
    completedTasks,
    pendingTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};