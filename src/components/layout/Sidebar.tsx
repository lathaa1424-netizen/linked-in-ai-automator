import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  Zap,
  FileText,
  Users,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
  Webhook
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", color: "text-violet-400" },
  { icon: Brain, label: "Agent Studio", path: "/agents", color: "text-cyan-400", badge: "NEW" },
  { icon: Zap, label: "Workflows", path: "/workflows", color: "text-yellow-400" },
  { icon: FileText, label: "Content Studio", path: "/content", color: "text-green-400" },
  { icon: Users, label: "Leads", path: "/leads", color: "text-blue-400" },
  { icon: MessageSquare, label: "Messages", path: "/messages", color: "text-purple-400" },
  { icon: Activity, label: "Analytics", path: "/analytics", color: "text-pink-400" },
  { icon: Webhook, label: "API Hub", path: "/api-hub", color: "text-orange-400" },
];

export const Sidebar = ({ collapsed = false, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Background */}
      <div className="absolute inset-0 glass-card border-r border-border backdrop-blur-xl" />
      
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 ai-gradient" />
      
      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center shadow-lg shadow-primary/30 relative">
              <Sparkles className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            {!collapsed && (
              <div className="animate-fade-in">
                <h1 className="text-lg font-bold gradient-text">LinkedIn AI</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Automation Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary" />
                )}
                
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? item.color : ''}`} />
                
                {!collapsed && (
                  <span className="text-sm font-medium flex-1 animate-fade-in">{item.label}</span>
                )}
                
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary/20 text-primary animate-fade-in">
                    {item.badge}
                  </span>
                )}
                
                {/* Tooltip for collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg border border-border">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-border/50 space-y-1">
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              location.pathname === '/settings' 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>
          
          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
        
        {/* Agent Status Footer */}
        {!collapsed && (
          <div className="p-3 border-t border-border/50">
            <div className="glass-card p-3 rounded-xl animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-1">
                  {['🤖', '✍️', '🔍', '📤'].map((emoji, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-[10px]">
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">4 Agents Active</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '73%' }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Pipeline throughput: 73%</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
