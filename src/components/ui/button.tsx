import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './tooltip';
import { Eye, Loader, Pencil, Plus, Trash2 } from 'lucide-react';

const buttonVariants = cva(
    'inline-flex items-center text-gray justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45',
    {
        variants: {
            variant: {
                default:
                    'bg-primary shadow hover:bg-primary/90 text-pure-white',
                secondary: 'bg-lavender-mist text-md shadow text-primary-text',
                delete: 'border-red text-red border text-md shadow hover:bg-red hover:text-pure-white',
                delete_solid: 'text-md shadow bg-red text-pure-white',
                edit: 'text-pure-white text-md shadow bg-vivid-orange',
                default_outline:
                    'border border-primary shadow hover:bg-primary/90 text-primary hover:text-pure-white hover:bg-primary bg-lavender-mist',
                icon: 'border-none p-0 m-0 text-xl',
                bordered: 'border border-border-color p-0 m-0 text-base',
                plain: 'border-none p-0 m-0 text-base',
                create_button:
                    'border border-border-color h-10 w-10 text-lg p-0 hover:bg-primary/90 text-primary hover:text-pure-white hover:bg-primary bg-background',
                edit_button:
                    'border border-border-color h-10 w-10 text-lg p-0 hover:bg-primary/90 text-vivid-orange hover:text-pure-white hover:bg-vivid-orange bg-background',
                delete_button:
                    'border border-border-color h-10 w-10 text-lg p-0 hover:bg-primary/90 text-red hover:text-pure-white hover:bg-red bg-background',
                view_button:
                    'border border-border-color h-10 w-10 text-lg p-0 hover:bg-bright-turquoise text-bright-turquoise hover:text-pure-white hover:bright-turquoise bg-background',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
                base: 'p-0',
            },
        },
        defaultVariants: {
            size: 'default',
            variant: 'default',
        },
    },
);

export type TButtonVariants = VariantProps<typeof buttonVariants>;

type TExtraProps = {
    loading?: boolean;
    tooltip?: string;
};
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        TExtraProps,
        TButtonVariants {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            loading,
            asChild = false,
            children,
            tooltip,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button';
        return tooltip ? (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Comp
                            className={cn(
                                buttonVariants({ variant, size, className }),
                            )}
                            ref={ref}
                            {...props}
                            disabled={loading || props.disabled}
                        >
                            {loading ? (
                                <Loader className='animate-spin' size={18} />
                            ) : variant === 'delete_button' ? (
                                <Trash2 size={18} />
                            ) : variant === 'edit_button' ? (
                                <Pencil size={18} />
                            ) : variant === 'view_button' ? (
                                <Eye size={18} />
                            ) : variant === 'create_button' ? (
                                <Plus size={18} />
                            ) : (
                                children
                            )}
                        </Comp>
                    </TooltipTrigger>
                    <TooltipContent>{tooltip}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ) : (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
                disabled={loading || props.disabled}
            >
                {loading ? (
                    <Loader className='animate-spin' size={18} />
                ) : variant === 'delete_button' ? (
                    <Trash2 size={18} />
                ) : variant === 'edit_button' ? (
                    <Pencil size={18} />
                ) : variant === 'view_button' ? (
                    <Eye size={18} />
                ) : variant === 'create_button' ? (
                    <Plus size={18} />
                ) : (
                    children
                )}
            </Comp>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
