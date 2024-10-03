import React, { useState } from 'react';
import { 
  AlertDialog, Card, CardContent, CardHeader, CardFooter, 
  Input, Label, Select, NavigationMenu, ScrollArea, Checkbox, 
  Slider, Tooltip, Button 
} from "@/components/ui";
import { cn } from "@/lib/utils";

// Navigation Menu Items
const navigationItems = [
  { label: "Create Project", href: "#create" },
  { label: "View Latest Project", href: "#view" },
];

// Framework options for Select
const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

function ProjectForm() {
  const [project, setProject] = useState({name: '', framework: 'react', version: '', budget: 50, termsAccepted: false});
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleSubmit = () => {
    setIsOpen(true);
  };

  const confirmDeploy = () => {
    setProjects(prev => {
      const existingIndex = prev.findIndex(p => p.name === project.name);
      if (existingIndex > -1) {
        const updatedProjects = [...prev];
        updatedProjects[existingIndex] = project;
        return updatedProjects;
      }
      return [...prev, project];
    });
    setIsOpen(false);
  };

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-4">
            <Label htmlFor="projectName">Project Name</Label>
            <Input id="projectName" value={project.name} onChange={(e) => setProject({...project, name: e.target.value})} />
            
            <Label htmlFor="framework">Framework</Label>
            <Select id="framework" value={project.framework} onValueChange={(value) => setProject({...project, framework: value})}>
              {frameworkOptions.map(option => <Select.Item key={option.value} value={option.value}>{option.label}</Select.Item>)}
            </Select>

            <Label htmlFor="version">Version</Label>
            <Input id="version" type="text" value={project.version} onChange={(e) => setProject({...project, version: e.target.value})} />
            
            <Label>Budget</Label>
            <Slider defaultValue={[50]} max={100} onValueChange={(value) => setProject({...project, budget: value[0]})} />

            <div className="flex items-center">
              <Checkbox id="terms" checked={project.termsAccepted} onCheckedChange={(checked) => setProject({...project, termsAccepted: checked})} />
              <Label htmlFor="terms" className="ml-2">Accept Terms and Conditions</Label>
            </div>
          </div>
          <Button onClick={handleSubmit} className="mt-4 w-full">Deploy Project</Button>
        </form>
      </CardContent>
      <AlertDialog
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={confirmDeploy}
        cancelButtonText="Cancel"
        confirmButtonText="Deploy"
        title="Confirm Deployment"
        description="Are you sure you want to deploy this project?"
      />
    </Card>
  );
}

function ProjectList({ projects }) {
  return (
    <ScrollArea className="h-64 w-full mt-5">
      {projects.map((proj, idx) => (
        <Card key={idx} className="mb-2">
          <CardContent>
            <p><strong>Name:</strong> {proj.name}</p>
            <p><strong>Framework:</strong> {proj.framework}</p>
            <p><strong>Version:</strong> {proj.version}</p>
            <p><strong>Budget:</strong> {proj.budget}</p>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}

function LatestProjectButton({ latestProject }) {
  return (
    <Tooltip content={<div>{latestProject ? JSON.stringify(latestProject, null, 2) : 'No projects deployed'}</div>}>
      <Button>View Latest Project</Button>
    </Tooltip>
  );
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const latestProject = projects[projects.length - 1];

  return (
    <div className="container mx-auto p-4">
      <NavigationMenu items={navigationItems} />
      <ProjectForm setProjects={setProjects} />
      <ProjectList projects={projects} />
      <div className="mt-4 text-center">
        <LatestProjectButton latestProject={latestProject} />
      </div>
    </div>
  );
}