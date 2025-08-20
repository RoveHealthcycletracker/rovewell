import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import LazyPrivacy from "@/components/lazy-privacy";
import NotFound from "@/pages/not-found";
// Assessment pages
import AssessmentWelcome from "@/pages/assessment/welcome";
import AssessmentQuestionnaire from "@/pages/assessment/questionnaire";
import AssessmentResults from "@/pages/assessment/results";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={LazyPrivacy} />
      <Route path="/assessment" component={AssessmentWelcome} />
      <Route path="/assessment/questionnaire" component={AssessmentQuestionnaire} />
      <Route path="/assessment/results" component={AssessmentResults} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
