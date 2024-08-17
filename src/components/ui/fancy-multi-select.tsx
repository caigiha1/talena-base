import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import useHandleKeyDown from "@/hooks/useHandleKeyDown";
import { DetailUser } from "@/type";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils.ts";

type FancyMultiSelectProps = Readonly<{
  data: DetailUser[] | undefined;
  onValueChange: (value: string[] | null) => void;
  className: string;
  defaultSelected?: DetailUser[];
}>;

export function FancyMultiSelect({
  data,
  defaultSelected = [],
  onValueChange,
  className,
}: FancyMultiSelectProps) {
  const [selected, setSelected] = useState<DetailUser[]>(defaultSelected);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const handleUnselect = useCallback(
    (email: string) => {
      setSelected((prev) => prev.filter((s) => s.email !== email));
    },
    [setSelected]
  );

  useEffect(() => {
    if (onValueChange) {
      onValueChange(selected.length ? selected.map((s) => s.email) : null);
    }
  }, [selected, onValueChange]);

  const handleKeyDown = useHandleKeyDown(
    selected.map((s) => s.email),
    (emails: string | string[]) => {
      setSelected((prev) => prev.filter((user) => emails.includes(user.email)));
    }
  );

  const handleSelectionToggle = (user: DetailUser) => {
    if (selected.some((s) => s.email === user.email)) {
      handleUnselect(user.email);
    } else {
      setSelected((prev) => [...prev, user]);
    }
  };

  const selectables =
    data?.filter((user) => !selected.some((s) => s.email === user.email)) ?? [];

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-lightGrey-200 px-3 py-2 text-sm ">
        <div className="flex flex-wrap gap-1">
          {selected.map((s) => (
            <Badge key={s.email} variant="default">
              <div className="flex gap-2 justify-center items-center">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={s.avatar} alt="@member_recruiter" />
                  <AvatarFallback>
                    {s.first_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold text-sm">
                    {s.first_name} {s.last_name}
                  </p>
                </div>
              </div>
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(s.email);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(s.email)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select ..."
            className={cn(
              "flex-1 bg-transparent outline-none placeholder:text-muted-foreground w-full",
              className
            )}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in focus:outline-none border-none">
            <CommandGroup className="h-full overflow-auto bg-white">
              {selectables.map((user) => (
                <CommandItem
                  key={user.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => handleSelectionToggle(user)}
                  className="cursor-pointer hover:bg-lightGrey-200 rounded"
                >
                  <div className="flex gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.avatar} alt="@member_recruiter" />
                      <AvatarFallback>
                        {user.first_name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="font-normal text-[12px] text-lightGrey-600">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
