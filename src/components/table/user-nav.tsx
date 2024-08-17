import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from "react";

export function UserNav() {
  const [open, setOpen] = React.useState(false);


  return (
    <div className="mt-auto flex w-full justify-center truncate border-t border-lightGrey-300 p-2 pt-[14px] pr-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{}</AvatarFallback>
      </Avatar>
      <span className="truncate text-sm font-light flex w-full flex-col justify-center pl-3">{}</span>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" aria-expanded={open} className="flex w-[20px] rounded-full">
            <ChevronUp 
              className={cn({
                'h-6 w-6 shrink-0 opacity-50 transition duration-300 ease-in-out hover:rounded-full':
                  true,
                'rotate-180 transform rounded-full': open,
              })}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem onClick={() => {}}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
