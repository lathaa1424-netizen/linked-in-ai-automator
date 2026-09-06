import { Link } from "react-router-dom";
import { Brain, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl ai-gradient flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30">
          <Brain className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved. Our AI agents are looking into it.
        </p>
        <div className="flex items-center gap-2 justify-center">
          <Link to="/dashboard">
            <Button className="btn-gradient text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/agents">
            <Button variant="outline" className="border-border">
              <Sparkles className="w-4 h-4 mr-2" />
              Open Agents
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
