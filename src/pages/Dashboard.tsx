import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../components/Calendar';
import FilterBar from '../components/FilterBar';
import TaskCounter from '../components/TaskCounter';
import TaskCard from '../components/TaskCard';
import { useTaskContext } from '../context/TaskContext';

const Dashboard: React.FC = () => {
  const { 
    tasks, 
    loading, 
    error, 
    completedTasks, 
    pendingTasks,
    updateTaskStatus,
    removeTask
  } = useTaskContext();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<number | null>(null);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Priority filter
    if (priorityFilter !== null && task.priority !== priorityFilter) {
      return false;
    }
    
    // Date filter - show tasks that match the selected date
    const taskDate = new Date(task.startDate);
    if (
      taskDate.getDate() !== currentDate.getDate() ||
      taskDate.getMonth() !== currentDate.getMonth() ||
      taskDate.getFullYear() !== currentDate.getFullYear()
    ) {
      return false;
    }
    
    return true;
  });

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Calendar 
            currentDate={currentDate} 
            onDateChange={setCurrentDate} 
          />
          
          <div className="mt-6">
            <Link 
              to="/task" 
              className="block w-full py-3 text-center bg-red-400 text-white font-bold rounded-lg hover:bg-red-500 transition-colors"
            >
              + Add New Task
            </Link>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <FilterBar 
            onCategoryFilter={setCategoryFilter}
            onPriorityFilter={setPriorityFilter}
            onSearch={setSearchQuery}
          />
          
          <TaskCounter 
            completedCount={completedTasks.length} 
            pendingCount={pendingTasks.length} 
          />
          
          <h2 className="font-bold text-lg mt-6 mb-3">Today's Tasks</h2>
          
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 bg-amber-50 rounded-lg">
              <p>No tasks for this day.</p>
              <Link to="/task" className="text-red-400 font-medium mt-2 inline-block">
                + Add New Task
              </Link>
            </div>
          ) : (
            <div>
              {filteredTasks.map(task => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onStatusChange={updateTaskStatus}
                  onEdit={(id) => window.location.href = `/task/${id}`}
                  onDelete={removeTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;