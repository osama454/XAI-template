import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/ui/pagination";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread', priority: 'Medium', theme: 'default' },
    { id: 2, title: 'Finish report', description: 'Complete by Friday', priority: 'High', theme: 'comfortable' },
    { id: 3, title: 'Call mom', description: 'Weekly check-in', priority: 'Low', theme: 'compact' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const carouselRef = useRef(null);

  const itemsPerPage = 1;
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: (pageNumber - 1) * carouselRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const TodoForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [theme, setTheme] = useState('default');

    const addTodo = () => {
      if (title && description) {
        setTodos([...todos, { 
          id: todos.length + 1, 
          title, 
          description, 
          priority, 
          theme 
        }]);
        setTitle('');
        setDescription('');
      }
    };

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Create Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Todo Title" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </div>
            <Select value={priority} onValueChange={setPriority}>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </Select>
            <Separator className="my-4" />
            <RadioGroup value={theme} onValueChange={setTheme} className="flex flex-col sm:flex-row">
              <RadioGroupItem value="default" id="default">Default</RadioGroupItem>
              <RadioGroupItem value="comfortable" id="comfortable">Comfortable</RadioGroupItem>
              <RadioGroupItem value="compact" id="compact">Compact</RadioGroupItem>
            </RadioGroup>
            <Button onClick={addTodo}>Add Todo</Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TodoCarousel = ({ todos }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Todo Carousel</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto" ref={carouselRef}>
        <div className="flex gap-4 min-w-full">
          {todos.map(todo => (
            <div key={todo.id} className={`p-4 rounded-lg w-full sm:w-96 ${{
              'default': 'bg-white', 
              'comfortable': 'bg-gray-100', 
              'compact': 'bg-gray-200'
            }[todo.theme]}`}>
              <h3 className="font-bold">{todo.title}</h3>
              <p>{todo.description}</p>
              <p>Priority: {todo.priority}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <TodoForm />
      <TodoCarousel todos={currentTodos} />
      <Separator className="my-4" />
      <Card>
        <CardHeader>
          <CardTitle>Pagination</CardTitle>
        </CardHeader>
        <CardContent>
          <Pagination 
            total={todos.length} 
            currentPage={currentPage} 
            onChange={handlePageChange} 
            showControls 
            showIcons
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;