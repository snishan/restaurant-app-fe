import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

// Define the toast variants using CVA
const toastVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        success: 'bg-gradient-to-r from-[#4158D0] via-[#C850C0] to-[#FFCC70] text-white border-transparent',
        destructive: 'bg-destructive/10 text-destructive border-destructive/50 [&>svg]:text-destructive',
        warning: 'bg-warning/10 text-warning border-warning/50 [&>svg]:text-warning',
        info: 'bg-info/10 text-info border-info/50 [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Toast Component Props
interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title: string;
  description: string;
}

// Toast Component
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, ...props }, ref) => {
    // Choose the icon based on the variant
    let icon = null;
    switch (variant) {
      case 'success':
        icon = <CheckCircle className="h-4 w-4" />;
        break;
      case 'destructive':
        icon = <XCircle className="h-4 w-4" />;
        break;
      case 'warning':
        icon = <AlertTriangle className="h-4 w-4" />;
        break;
      case 'info':
        icon = <Info className="h-4 w-4" />;
        break;
      default:
        icon = null;
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {icon}
        <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
        <div className="text-sm [&_p]:leading-relaxed">{description}</div>
      </div>
    );
  }
);
Toast.displayName = 'Toast';

export { Toast };