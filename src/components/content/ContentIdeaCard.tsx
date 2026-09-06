import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, Copy } from "lucide-react";

interface ContentIdea {
  id: string;
  topic: string;
  angle: string;
  hooks: string[];
  targetAudience: string;
  estimatedEngagement: "low" | "medium" | "high";
  status: "generated" | "approved" | "drafted";
}

interface ContentIdeaCardProps {
  idea: ContentIdea;
}

export const ContentIdeaCard = ({ idea }: ContentIdeaCardProps) => {
  return (
    <Card className="card-hover">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline">{idea.angle}</Badge>
          <Badge variant={idea.estimatedEngagement === "high" ? "default" : "secondary"}>
            {idea.estimatedEngagement} engagement
          </Badge>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{idea.topic}</h3>
        <p className="text-sm text-muted-foreground mb-3">{idea.angle}</p>

        <div className="space-y-1 mb-4">
          {idea.hooks.map((hook, i) => (
            <p key={i} className="text-xs text-muted-foreground">
              • {hook}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline">{idea.status}</Badge>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};