import { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Circle } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/Card';
import useLocalStorage from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

/**
 * Tasks page with task management functionality
 */
const Tasks = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
    toast.success('Task added successfully');
  };

  // Toggle task completion
  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success('Task deleted');
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Task statistics
  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Task Manager
            </h1>
            <p className="text-lg text-muted-foreground">
              Organize your tasks with local storage persistence
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="card-gradient">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="card-gradient">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Active</p>
                  <p className="text-3xl font-bold text-primary">{stats.active}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="card-gradient">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold text-success">{stats.completed}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Task Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Enter a new task..."
                  className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                />
                <Button type="submit" variant="primary" className="gap-2">
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Task</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Filter Buttons */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Button
              variant={filter === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All ({stats.total})
            </Button>
            <Button
              variant={filter === 'active' ? 'primary' : 'secondary'}
              onClick={() => setFilter('active')}
              size="sm"
            >
              Active ({stats.active})
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'secondary'}
              onClick={() => setFilter('completed')}
              size="sm"
            >
              Completed ({stats.completed})
            </Button>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Circle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-lg text-muted-foreground">
                    {filter === 'all' 
                      ? 'No tasks yet. Add one above to get started!' 
                      : `No ${filter} tasks`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <Card 
                  key={task.id} 
                  hover
                  className="animate-fade-in"
                >
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3">
                      {/* Complete Button */}
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth ${
                          task.completed
                            ? 'bg-success border-success'
                            : 'border-border hover:border-primary'
                        }`}
                        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {task.completed && (
                          <Check className="w-4 h-4 text-success-foreground" />
                        )}
                      </button>

                      {/* Task Text */}
                      <p className={`flex-1 text-foreground ${
                        task.completed ? 'line-through opacity-60' : ''
                      }`}>
                        {task.text}
                      </p>

                      {/* Delete Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
