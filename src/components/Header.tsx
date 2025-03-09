// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 mr-2 text-white bg-red-400 rounded-full">
          <span className="text-xs">v</span>
        </div>
        <h1 className="text-lg italic font-medium">Vista Lab</h1>
      </div>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-300 rounded-full">
          {/* User avatar would go here */}
        </div>
      </div>
    </div>
  );
};

export default Header;