import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, UserPlus, TrendingUp } from "lucide-react";

interface Lead {
  name: string;
  title: string;
  company: string;
  score: number;
  status: string;
  initials: string;
}

const leads: Lead[] = [
  { name: "Alex Johnson", title: "VP Engineering", company: "Stripe", score: 95, status: "Hot", initials: "AJ" },
  { name: "Priya Patel", title: "Head of Product", company: "Notion", score: 88, status: "Hot", initials: "PP" },
  { name: "James Liu", title: "CTO", company: "Vercel", score: 82, status: "Warm", initials: "JL" },
  { name: "Maria Garcia", title: "Director of Ops", company: "Shopify", score: 74, status: "Warm", initials: "MG" },
  { name: "Tom Wilson", title: "CEO", company: "Linear", score: 65, status: "Cold", initials: "TW" },
];

export const LeadCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {leads.map((lead) => (
        <Card key={lead.name} className="card-hover">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-linkedin-blue text-white text-sm">
                    {lead.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.title} @ {lead.company}</p>
                </div>
              </div>
              <Badge variant={lead.score >= 80 ? "default" : lead.score >= 60 ? "secondary" : "outline"}>
                {lead.status}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">AI Score</span>
                <span className="text-sm font-bold text-linkedin-blue">{lead.score}/100</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-linkedin-blue transition-all"
                style={{ width: `${lead.score}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};