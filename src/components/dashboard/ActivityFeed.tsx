import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activities = [
  { name: "Sarah Chen", action: "Accepted connection request", time: "2 min ago", initials: "SC" },
  { name: "Michael Rodriguez", action: "Replied to outreach message", time: "15 min ago", initials: "MR" },
  { name: "Emma Thompson", action: "Connection request sent", time: "1 hour ago", initials: "ET" },
  { name: "David Park", action: "Profile enriched with AI", time: "2 hours ago", initials: "DP" },
  { name: "Lisa Wang", action: "Meeting scheduled via DM", time: "3 hours ago", initials: "LW" }
];

export const ActivityFeed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-linkedin-blue text-white text-xs">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.action}
                </p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};