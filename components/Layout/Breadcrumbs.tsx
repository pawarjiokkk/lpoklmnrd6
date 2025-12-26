
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Tool } from '../../types';

interface Props {
  currentTool?: Tool;
  categoryName?: string;
}

const Breadcrumbs: React.FC<Props> = ({ currentTool, categoryName }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      <Link to="/" className="hover:text-primary flex items-center">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      <ChevronRight className="w-3 h-3" />
      {currentTool ? (
        <>
          <span className="hover:text-primary cursor-default">{currentTool.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">{currentTool.name}</span>
        </>
      ) : (
        <span className="text-gray-900 font-medium capitalize">{categoryName}</span>
      )}
    </nav>
  );
};

export default Breadcrumbs;
