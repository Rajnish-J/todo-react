// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import TaskCard from '../components/TaskCard';
import TaskCounter from '../components/TaskCounter';
import FilterBar from '../components/FilterBar';
import TaskForm from '../components/TaskForm';
import Footer from '../components/Footer';
import { useTaskContext } from '../context/TaskContext';

const Dashboard: React.FC = () => {
  const { 
    tasks, 
    loading, 
    completedTasks, 
    pendingTasks,
    addNewTask,
    updateTaskStatus,
    editTask,
    removeTask
  } = useTaskContext();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  
  // Handle calendar date change
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Handle task status toggle
  const handleStatusChange = (id: string, completed: boolean) => {
    updateTaskStatus(id, completed);
  };
  
  // Handle task edit
  const handleEdit = (id: string) => {
    setEditingTask(id);
    setShowAddForm(true);
  };
  
  // Handle task delete
  const handleDelete = (id: string) => {
    removeTask(id);
  };
  
  // Handle form submit
  const handleTaskSubmit = async (taskData: any) => {
    if (editingTask) {
      await editTask(editingTask, taskData);
      setEditingTask(null);
    } else {
      await addNewTask(taskData);
    }
    setShowAddForm(false);
  };
  
  // Handle category filtering
  const handleCategoryFilter = (category: string) => {
    if (category) {
      setFilteredTasks(tasks.filter(task => task.category === category));
    } else {
      setFilteredTasks(tasks);
    }
  };
  
  // Handle priority filtering
  const handlePriorityFilter = (priority: number) => {
    if (priority) {
      setFilteredTasks(tasks.filter(task => task.priority === priority));
    } else {
      setFilteredTasks(tasks);
    }
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    if (query) {
      setFilteredTasks(tasks.filter(task => 
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredTasks(tasks);
    }
  };
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <div className="max-w-6xl mx-auto bg-gray-100 min-h-screen flex flex-col">
      <Header username="Aqeel" />
      
      <div className="flex-1 p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Hello, Aqeel, <span className="text-gray-500">Start planning today</span></h1>
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-6">
          {/* Left column: Calendar and stats */}
          <div className="col-span-1">
            <Calendar currentDate={selectedDate} onDateChange={handleDateChange} />
            
            <TaskCounter 
              completedCount={completedTasks.length} 
              pendingCount={pendingTasks.length} 
            />
            
            <div className="bg-white p-3 rounded-lg mt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Tasks created</h3>
                <span className="text-lg font-bold">1,500</span>