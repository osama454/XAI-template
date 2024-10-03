import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function App() {
  const [todoTitle, setTodoTitle] = React.useState("");
  const [todoDescription, setTodoDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [paginationPage, setPaginationPage] = React.useState(1);
  const [theme, setTheme] = React.useState("comfortable");
  const [todos, setTodos] = React.useState([
    {
      title: "Todo 1",
      description: "Description for Todo 1",
      priority: "High",
    },
    {
      title: "Todo 2",
      description: "Description for Todo 2",
      priority: "Medium",
    },
    { title: "Todo 3", description: "Description for Todo 3", priority: "Low" },
  ]);
  const [carouselApi, setCarouselApi] = React.useState(null); // Step 1: Track the Embla API

  const handleSelect = (index) => {
    if (carouselApi) {
      carouselApi.scrollTo(index-1); // Scroll to the specific item
    }
  };
  const handlePaginationClick = (page) => {
    setPaginationPage(page);
    handleSelect(page)
  };

  const handleAddTodo = () => {
    if (todoTitle && todoDescription && priority) {
      const newTodos = [
        ...todos,
        { title: todoTitle, description: todoDescription, priority, theme },
      ];
      setTodos(newTodos);
      setTodoTitle("");
      setTodoDescription("");
      // setPriority("");
      setPaginationPage(newTodos.length); // Navigate to the new todo page
    }
  };

  const getThemeColor = (theme) => {
    switch (theme) {
      case "default":
        return "bg-gray-200";
      case "comfortable":
        return "bg-blue-100";
      case "compact":
        return "bg-green-100";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create Todo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={todoTitle}
                  onChange={(e) => setTodoTitle(e.target.value)}
                  placeholder="Title of your todo"
                  className="shadow-sm"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={todoDescription}
                  onChange={(e) => setTodoDescription(e.target.value)}
                  placeholder="Description of your todo"
                  className="shadow-sm"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={(value) => setPriority(value)}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator className="my-4" />
            <Label className="mb-2">Theme</Label>
            <RadioGroup
              value={theme}
              onValueChange={(value) => setTheme(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleAddTodo}>Add Todo</Button>
          </CardFooter>
        </Card>

        <Separator className="my-8" />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Todo Carousel</CardTitle>
          </CardHeader>
          <CardContent>
            <Carousel setApi={setCarouselApi} className="w-full max-w-lg mx-auto shadow-md">
              <CarouselContent>
                {todos.map((todo, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2">
                      <Card className={`shadow-md ${getThemeColor(todo.theme)}`} >
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <span className="text-2xl font-semibold">
                            {todo.title}
                          </span>
                          <p className="mt-2 text-sm">{todo.description}</p>
                          <span className="mt-4 text-sm font-medium">
                            Priority: {todo.priority}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Pagination</CardTitle>
          </CardHeader>
          <CardContent>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                   
                    onClick={() =>
                      handlePaginationClick(Math.max(paginationPage - 1, 1))
                    }
                  />
                </PaginationItem>
                {Array.from({ length: todos.length }).map((_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
            
                      isActive={paginationPage === index + 1}
                      onClick={() => handlePaginationClick(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePaginationClick(
                        Math.min(paginationPage + 1, todos.length)
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="mt-4 text-sm">Current Page: {paginationPage}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;