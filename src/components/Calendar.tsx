import React from 'react';

interface CalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, onDateChange }) => {
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const day = currentDate.getDate();
  
  // Calculate first day of month
  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
  // Adjust for Monday as first day (0 = Sunday, 1 = Monday, etc.)
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Generate calendar grid
  const generateCalendarDays = () => {
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const days = [];
    
    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < startOffset; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const days = generateCalendarDays();
  
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="italic text-red-400">
        Sunday
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          {day.toString().padStart(2, '0')}, {monthName} {year}
        </h2>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(d => (
          <div key={d} className="text-xs text-center text-gray-500">{d}</div>
        ))}
        
        {days.map((d, index) => {
          const isCurrentDay = d === day;
          const isWeekend = (index + startOffset) % 7 >= 5; // Saturday or Sunday
          
          return (
            <div 
              key={index} 
              className={`
                h-8 w-8 flex items-center justify-center text-sm
                ${d === null ? 'invisible' : 'cursor-pointer'}
                ${isCurrentDay ? 'bg-red-400 text-white rounded-full' : ''}
                ${isWeekend && !isCurrentDay ? 'text-red-400' : ''}
              `}
              onClick={() => {
                if (d !== null) {
                  const newDate = new Date(year, currentDate.getMonth(), d);
                  onDateChange(newDate);
                }
              }}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;