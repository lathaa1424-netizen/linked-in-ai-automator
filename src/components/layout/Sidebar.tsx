import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Zap,
  TrendingUp,
  Settings
} from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-linkedin-blue rounded-lg flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            LinkedIn AI
          </h1>
        </div>
        
        <nav className="space-y-1">
                  <Link to="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link to="/leads" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Users className="w-4 h-4" />
                    <span>Leads</span>
                  </Link>
                  
                  <Link to="/messages" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <MessageSquare className="w-4 h-4" />
                    <span>Messages</span>
                  </Link>
                  
                  <Link to="/workflows" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Zap className="w-4 h-4" />
                    <span>Workflows</span>
                  </Link>
                  
                  <Link to="/content" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TrendingUp className="w-4 h-4" />
                    <span>Content</span>
                  </Link>
                  
                  <Link to="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </nav>
      </div>
    </aside>
  );
};