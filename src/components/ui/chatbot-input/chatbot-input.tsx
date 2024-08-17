"use client";
import { cn } from "@/utils/cn";
import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";

export type InputProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  multiple?: boolean;
  onEnterPress?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      onKeyUp,
      className,
      leftIcon,
      rightIcon,
      multiple,
      value,
      onChange,
      disabled,
      autoFocus,
      onEnterPress,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };

    const handleBlur = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setIsFocused(false);
      if (props.onBlur) {
        props.onBlur(e);
      }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (onChange) {
        onChange(e);
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onEnterPress?.();
      }
      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    return (
      <div
        className={cn(
          "flex w-full items-center min-h-[50px] rounded-[10px] border py-1 px-3 text-sm",
          isFocused
            ? "bg-transparent focus-within:border-[#568CF9]"
            : "border-none bg-gray-100",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {leftIcon && <div className="mr-3">{leftIcon}</div>}
        {multiple ? (
          <TextareaAutosize
            onFocus={(e) =>
              handleFocus(e as React.FocusEvent<HTMLTextAreaElement>)
            }
            placeholder={placeholder}
            value={value}
            autoFocus={autoFocus}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLTextAreaElement>)
            }
            disabled={disabled}
            onKeyDown={handleKeyDown}
            className="flex max-h-[33vh] flex-1 resize-none flex-col items-center overflow-auto bg-transparent placeholder:text-slate-400 focus:outline-none dark:text-slate-50"
          />
        ) : (
          <input
            className="flex-1 bg-transparent placeholder:text-slate-400 focus:outline-none dark:text-slate-50"
            ref={ref}
            placeholder={props["aria-placeholder"]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            onKeyDown={handleKeyDown}
            {...props}
          />
        )}
        {rightIcon && <div>{rightIcon}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
