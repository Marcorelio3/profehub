'use client';

import { cn } from '@/lib/utils';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';

const DropdownMenu = DropdownMenuPrimitive.DropdownMenu;
const DropdownMenuTrigger = DropdownMenuPrimitive.DropdownMenuTrigger;
const DropdownMenuGroup = DropdownMenuPrimitive.DropdownMenuGroup;
const DropdownMenuPortal = DropdownMenuPrimitive.DropdownMenuPortal;
const DropdownMenuSub = DropdownMenuPrimitive.DropdownMenuSub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.DropdownMenuRadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuSubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuSubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuSubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.DropdownMenuSubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.DropdownMenuSubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuSubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuSubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuSubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-elevation-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.DropdownMenuSubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuContent>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuPortal>
    <DropdownMenuPrimitive.DropdownMenuContent
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-elevation-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.DropdownMenuPortal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.DropdownMenuContent.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuItem> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.DropdownMenuItem.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuCheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuCheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuCheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.DropdownMenuItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.DropdownMenuItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.DropdownMenuCheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.DropdownMenuCheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuRadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuRadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuRadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.DropdownMenuItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.DropdownMenuItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.DropdownMenuRadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.DropdownMenuRadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuLabel>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuLabel> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuLabel
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.DropdownMenuLabel.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.DropdownMenuSeparator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.DropdownMenuSeparator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.DropdownMenuSeparator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.DropdownMenuSeparator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
