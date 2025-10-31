import { Link } from 'react-router-dom';
import { CheckSquare, Database, Palette, Code } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/Card';
import heroImage from '@/assets/hero-image.jpg';

/**
 * Home page component with hero section and feature cards
 */
const Home = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Create, complete, and organize your tasks with local storage persistence.',
      link: '/tasks'
    },
    {
      icon: Database,
      title: 'API Integration',
      description: 'Fetch and display data from external APIs with pagination and search.',
      link: '/api-data'
    },
    {
      icon: Palette,
      title: 'Modern Design',
      description: 'Beautiful UI with Tailwind CSS, featuring light and dark mode support.',
      link: '#'
    },
    {
      icon: Code,
      title: 'Clean Architecture',
      description: 'Component-based structure with React hooks and context for state management.',
      link: '#'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground animate-fade-in">
              Welcome to{' '}
              <span className="text-gradient">ReactApp</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in">
              A modern React application demonstrating component architecture, 
              state management, and API integration with beautiful Tailwind design.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in">
              <Link to="/tasks">
                <Button variant="primary" size="lg" className="shadow-glow">
                  Get Started
                </Button>
              </Link>
              <Link to="/api-data">
                <Button variant="secondary" size="lg">
                  Explore API Data
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with React, Vite, Tailwind CSS, and modern best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                hover 
                className="animate-fade-in card-gradient"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  {feature.link !== '#' && (
                    <Link to={feature.link}>
                      <Button variant="ghost" size="sm">
                        Learn More →
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Built With Modern Technologies
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <span className="px-4 py-2 bg-card rounded-lg border border-border font-medium">
                React 18
              </span>
              <span className="px-4 py-2 bg-card rounded-lg border border-border font-medium">
                Vite
              </span>
              <span className="px-4 py-2 bg-card rounded-lg border border-border font-medium">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-card rounded-lg border border-border font-medium">
                React Router
              </span>
              <span className="px-4 py-2 bg-card rounded-lg border border-border font-medium">
                Context API
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
