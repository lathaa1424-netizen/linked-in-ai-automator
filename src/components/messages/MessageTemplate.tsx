import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

export const MessageTemplate = () => {
  const [template, setTemplate] = useState("");

  const handleGenerate = async () => {
    // This would call an AI API to generate personalized message
    setTemplate("Hi {{first_name}},\n\nI noticed your work at {{company}} and was particularly impressed by {{specific_achievement}}. I'd love to connect and discuss how we might collaborate on {{relevant_topic}}.\n\nBest regards,\n{{your_name}}");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>AI Message Generator</CardTitle>
          <Button variant="outline" onClick={handleGenerate}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate with AI
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template">Message Template</Label>
          <Textarea
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            placeholder="Your AI-generated message will appear here..."
            className="min-h-[120px]"
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="personalize" checked={true} />
            <Label htmlFor="personalize" className="text-sm">
              Personalize with AI
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="followup" checked={false} />
            <Label htmlFor="followup" className="text-sm">
              Schedule follow-up sequence
            </Label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button variant="outline">Save Template</Button>
          <Button className="linkedin-gradient">Send Test Message</Button>
        </div>
      </CardContent>
    </Card>
  );
};