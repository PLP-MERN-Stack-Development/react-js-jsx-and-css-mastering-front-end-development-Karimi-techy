import { cn } from "@/lib/utils";

/**
 * Reusable Card component for displaying boxed content
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Enable hover effect
 * @param {Function} props.onClick - Click handler
 */
const Card = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  ...props 
}) => {
  const baseStyles = "bg-card text-card-foreground rounded-xl border border-border transition-smooth";
  const hoverStyles = hover ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" : "";

  return (
    <div
      className={cn(
        baseStyles,
        hoverStyles,
        "shadow-md",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Header component
 */
export const CardHeader = ({ children, className = '' }) => (
  <div className={cn("p-6 pb-4", className)}>
    {children}
  </div>
);

/**
 * Card Title component
 */
export const CardTitle = ({ children, className = '' }) => (
  <h3 className={cn("text-xl font-semibold text-foreground", className)}>
    {children}
  </h3>
);

/**
 * Card Content component
 */
export const CardContent = ({ children, className = '' }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
);

/**
 * Card Footer component
 */
export const CardFooter = ({ children, className = '' }) => (
  <div className={cn("p-6 pt-0 flex items-center gap-2", className)}>
    {children}
  </div>
);

export default Card;
