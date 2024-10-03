import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function App() {
  const [projectName, setProjectName] = useState("");
  const [framework, setFramework] = useState("");
  const [version, setVersion] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [showDeployDialog, setShowDeployDialog] = useState(false);
  const [projects, setProjects] = useState([]);
  const [latestProjectDetails, setLatestProjectDetails] = useState(null);

  const handleDeployConfirmation = () => {
    const newProject = {
      name: projectName,
      framework,
      version,
      budget: sliderValue,
    };

    setProjects((prevProjects) => {
      // Check if the project already exists
      const existingProjectIndex = prevProjects.findIndex(
        (project) => project.name === projectName
      );

      if (existingProjectIndex !== -1) {
        // Replace the existing project details
        const updatedProjects = [...prevProjects];
        updatedProjects[existingProjectIndex] = newProject;
        return updatedProjects;
      }

      // Add the new project if it doesn't exist
      return [...prevProjects, newProject];
    });

    // Update the latest project details
    setLatestProjectDetails(newProject);
    setShowDeployDialog(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                <ListItem href="#create-project" title="Create Project">
                  Go to the Create Project section to deploy a new app.
                </ListItem>
                <ListItem href="#view-project-details" title="View Project Details">
                  View details of the latest deployed project.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Card with Form */}
      <div className="my-8" id="create-project">
        <Card className="w-full max-w-lg mx-auto shadow-lg hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle>Create Project</CardTitle>
            <CardDescription>Fill in the details below to create and deploy your new project. Ensure all fields are filled accurately before deploying.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of your project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                  <Select onValueChange={(value) => setFramework(value)}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Frameworks</SelectLabel>
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    placeholder="Version (e.g., v1.0.0)"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <Label htmlFor="budget">Project Budget (in thousands): {sliderValue}k</Label>
                  <Slider
                    id="budget"
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="w-full"
                    onValueChange={(value) => setSliderValue(value[0])}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={acceptTerms} onCheckedChange={() => setAcceptTerms(!acceptTerms)} />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => { setProjectName(""); setFramework(""); setVersion(""); setAcceptTerms(false); setSliderValue(50); }}>Cancel</Button>
            <Button onClick={() => setShowDeployDialog(true)} disabled={!projectName || !framework || !version || !acceptTerms}>
              Deploy
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={showDeployDialog} onOpenChange={setShowDeployDialog}>
        <AlertDialogTrigger asChild>
          <Button className="hidden">Show Deploy Alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deploy Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deploy the project "{projectName}" using {framework} framework with version "{version}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeployDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeployConfirmation}>
              Deploy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Scroll Area for Project Versions */}
      <div className="my-8 max-w-lg mx-auto">
        <ScrollArea className="h-72 w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Project Versions</h4>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <React.Fragment key={project.name}>
                  <div className="text-sm">
                    <strong>{project.name}</strong> - {project.version} ({project.framework}) - Budget: {project.budget}k
                  </div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))
            ) : (
              <div className="text-sm">No versions deployed yet.</div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Tooltip Button to View Project Details */}
      <div className="my-8 flex justify-center" id="view-project-details">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">View Latest Project Details</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Project Name: {latestProjectDetails?.name || "N/A"}</p>
              <p>Framework: {latestProjectDetails?.framework || "N/A"}</p>
              <p>Version: {latestProjectDetails?.version || "N/A"}</p>
              <p>Budget: {latestProjectDetails?.budget ? `${latestProjectDetails.budget}k` : "N/A"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
