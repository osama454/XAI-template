import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectItem,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  ScrollArea,
  Checkbox,
  Slider,
  Tooltip,
  Button
} from "@/components/ui";
import { PlusIcon, ListBulletIcon } from "@radix-ui/react-icons";

function App() {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    framework: 'react',
    version: '18.0.0',
    budget: 50,
    terms: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const deployProject = () => {
    setProjects(prev => {
      const exists = prev.find(p => p.projectName === formData.projectName);
      if (exists) {
        return prev.map(p => p.projectName === formData.projectName ? formData : p);
      }
      return [...prev, formData];
    });
    setIsDialogOpen(false);
  };

  const latestProject = projects[projects.length - 1];

  return (
    <div className="flex flex-col h-screen bg-gray-100 sm:p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuItem>
                <PlusIcon className="mr-2" />
                Create Project
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ListBulletIcon className="mr-2" />
                View Projects
              </NavigationMenuItem>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Card className="mt-4 flex-grow">
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input 
                id="projectName" 
                value={formData.projectName} 
                onChange={(e) => setFormData({...formData, projectName: e.target.value})} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="framework">Framework</Label>
              <Select id="framework" value={formData.framework} onChange={value => setFormData({...formData, framework: value})}>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </Select>
            </div>
            <div>
              <Label htmlFor="version">Version</Label>
              <Input 
                id="version" 
                type="text" 
                value={formData.version} 
                onChange={(e) => setFormData({...formData, version: e.target.value})} 
              />
            </div>
            <div>
              <Label>Budget</Label>
              <Slider 
                defaultValue={[50]} 
                max={100} 
                step={10} 
                onValueChange={(value) => setFormData({...formData, budget: value[0]})}
              />
            </div>
            <div>
              <Checkbox 
                checked={formData.terms} 
                onCheckedChange={(checked) => setFormData({...formData, terms: checked})}
              >
                <Label className="ml-2">Agree to terms</Label>
              </Checkbox>
            </div>
            <Button type="submit">Deploy</Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will deploy your project. Confirm?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={deployProject} variant="destructive">Deploy</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ScrollArea className="mt-4 h-40">
        {projects.map((project, index) => (
          <Card key={index} className="mb-2">
            <CardContent>
              <CardTitle>{project.projectName}</CardTitle>
              <CardDescription>
                Framework: {project.framework}, Version: {project.version}, Budget: {project.budget}%
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>

      <Tooltip content={
        <div>
          <p><strong>Name:</strong> {latestProject?.projectName}</p>
          <p><strong>Framework:</strong> {latestProject?.framework}</p>
          <p><strong>Version:</strong> {latestProject?.version}</p>
          <p><strong>Budget:</strong> {latestProject?.budget}%</p>
        </div>
      }>
        <Button className="mt-4">View Latest Project</Button>
      </Tooltip>
    </div>
  );
}

export default App;