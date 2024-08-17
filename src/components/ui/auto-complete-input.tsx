import { Command as CommandPrimitive } from "cmdk";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import * as React from "react";
import useHandleKeyDown from "@/hooks/useHandleKeyDown";
import {useEffect} from "react";

type AutoCompleteInputProps<TData> = {
    data: TData[];
    onValueChange: (value: any) => void;
};

const AutoCompleteInput = React.forwardRef<HTMLInputElement, AutoCompleteInputProps<{ id: string; email?: string; name?: string; }>>(function AutoCompleteInput<TData extends { id: string; email?: string; name?: string; }>({ data, onValueChange, ...props }: AutoCompleteInputProps<TData>, ref: React.Ref<unknown> | undefined) {
    const [selected, setSelected] = React.useState<TData[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleUnselect = React.useCallback(
        (v: TData) => {
            if (v.email) {
                setSelected((prev) => prev.filter((s) => s.email !== v.email));
            } else if (v.name) {
                setSelected((prev) => prev.filter((s) => s.name !== v.name));
            }
        },
        [setSelected]
    );

    useEffect(() => {
        if (onValueChange) {
            onValueChange(selected ? selected[0]?.email : '');
        }
    }, [selected, onValueChange]);

    const handleKeyDown = useHandleKeyDown(selected, setSelected);

    const handleSelectionToggle = (user: TData) => {
        if (selected.some((s) => s.id === user.id)) {
            handleUnselect(user);
        } else {
            setInputValue('');
            setSelected([user]);
        }
    };

    const selectables = data?.filter((v) => !selected.includes(v));

    return (
        <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent" {...props}>
            <div className="group rounded-md border border-lightGrey-200 px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1">
                    {selected?.map((s) => (
                        <p key={s.id}>
                            {s.email ?? s.name}
                        </p>
                    ))}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={(e) => {
                            setInputValue(e);
                            onValueChange(inputValue);
                        }}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={selected.length > 0 ? '' : 'Input Email here ...'}
                        className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                {open && data.length > 0 ? (
                    <div className="absolute top-0 z-10 w-full overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in focus:outline-none border-none">
                        <CommandGroup className="h-full overflow-auto bg-white">
                            <CommandEmpty>No users found</CommandEmpty>
                            {selectables?.map((d) => (
                                <CommandItem
                                    key={d.id}
                                    ref={inputRef}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onSelect={() => handleSelectionToggle(d)}
                                    className="cursor-pointer hover:bg-lightGrey-200 rounded"
                                >
                                    <div className="flex flex-col">
                                        <p className="font-bold">{d.name}</p>
                                        <span className="font-light">{d.email}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </div>
                ) : null}
            </div>
        </Command>
    );
});

export default AutoCompleteInput;
