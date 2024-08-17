import { Controller, useForm } from "react-hook-form";
import {
  resetPassSchema,
  signinSchema,
  signupSchema,
} from "./EmailAndPassword.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "../base/loading/Loading";
import React from "react";
import ToggleEyeIcon from "../base/toggleEyeIcon/ToggleEyeIcon";
import Checkbox from "../base/checkbox/Checkbox.tsx";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/utils/cn.ts";
import { Icons } from "@/common/Icon.tsx";

type viewType = "sign-in" | "sign-up" | "update-password";

export default function EmailAndPassword({
  onSubmit,
  view,
  isLoading,
  error,
}: Readonly<{
  onSubmit?: (data: any) => void;
  view: viewType;
  isLoading: boolean;
  error: any;
}>) {
  const getSchema = (view: viewType) => {
    const schemas: Record<viewType, any> = {
      "sign-in": signinSchema,
      "sign-up": signupSchema,
      "update-password": resetPassSchema,
    };
    return schemas[view];
  };
  const formSchema = getSchema(view);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      confirmPassword: "",
      workspace_name: "",
      domain: "",
      location: "",
      terms: false,
      rememberMe: false,
    },
    resolver: zodResolver(formSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isTermsChecked, setIsTermsChecked] = React.useState(false);

  const [passwordsMatch, setPasswordsMatch] = React.useState(false);

  function shouldRenderToggleEyeIcon() {
    const isEdge = navigator.userAgent.indexOf("Edg") !== -1;
    return !isEdge;
  }

  React.useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  function renderForm({
    register,
    handleSubmit,
    onSubmit,
    isLoading,
  }: // error,
  {
    register?: any;
    handleSubmit: any;
    onSubmit: any;
    isLoading: boolean;
    error: boolean;
  }) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-4">
          {(view === "sign-up" || view === "sign-in") &&
            renderEmailInput({ register, isLoading })}
          {view === "sign-up" && renderNameInput({ register, isLoading })}
          {renderPasswordInput({ register, isLoading })}
          {(view === "sign-up" || view === "update-password") &&
            renderConfirmPasswordInput({ register, isLoading })}
          {view === "sign-up" && renderTermsAndConditions()}
          {view === "sign-in" && renderRememberMe()}
          {renderSubmitButton({ isLoading })}
          {view === "sign-in" && renderTextDivider("or")}
        </div>
      </form>
    );
  }

  function renderEmailInput({ register, isLoading }: any) {
    return (
      <div className="mt-1">
        <input
          id={`${view}-email`}
          name="email"
          type="email"
          required
          disabled={isLoading}
          placeholder="Email"
          autoComplete={"email"}
          className={cn({
            "block h-10 w-full appearance-none rounded-xl border border-meta-9 p-6 placeholder-muted-foreground placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800/20 sm:text-sm":
              true,
            "border border-danger-800 focus:border-danger-800 focus:outline-none focus:ring-danger-800":
              errors.email || error,
          })}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-danger-800 mt-1">{errors.email.message}</p>
        )}
        {error && view === "sign-up" && (
          <p className="text-xs text-danger-800 mt-1">Email is already exist</p>
        )}
      </div>
    );
  }

  function renderNameInput({ register, isLoading }: any) {
    return (
      <div className="flex justify-center mt-1">
        <div className="">
          <input
            id={`${view}-first_name`}
            name="first_name"
            type="text"
            required
            disabled={isLoading}
            placeholder="First Name"
            autoComplete={"first_name"}
            className={cn({
              "flex h-10 w-[95%] appearance-none rounded-xl border border-meta-9 p-6 placeholder-muted-foreground placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800/20 sm:text-sm":
                true,
              "border border-danger-800 focus:border-danger-800 focus:outline-none focus:ring-danger-800":
                errors.first_name,
            })}
            {...register("first_name")}
          />
          {errors.first_name && (
            <p className="text-xs text-danger-800 mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>
        <div className="ml-auto mr-0">
          <input
            id={`${view}-last_name`}
            name="last_name"
            type="text"
            required
            disabled={isLoading}
            placeholder="Last Name"
            autoComplete={"last_name"}
            className={cn({
              "flex justify-end h-10 w-[100%] appearance-none rounded-xl border border-meta-9 p-6 placeholder-muted-foreground placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800/20 sm:text-sm":
                true,
              "border border-danger-800 focus:border-danger-800 focus:outline-none focus:ring-danger-800":
                errors.last_name,
            })}
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="text-xs text-danger-800 mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  function renderPasswordInput({ register, isLoading }: any) {
    return (
      <div className="space-y-1">
        <div className="relative mt-1">
          <input
            id={`${view}-password`}
            name="password"
            type={showPassword ? "text" : "password"}
            required
            disabled={isLoading}
            placeholder="Password"
            autoComplete={
              view === "sign-in" ? "current-password" : "new-password"
            }
            className={cn({
              "block h-10 w-full appearance-none rounded-xl border border-meta-9 p-6 placeholder-muted-foreground placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800/20 sm:text-sm":
                true,
              "border border-danger-800 focus:border-danger-800 focus:outline-none focus:ring-danger-800":
                errors.password || error,
              "border border-success focus:border-success":
                passwordsMatch &&
                password.length > 0 &&
                confirmPassword.length > 0,
            })}
            {...register("password")}
          />
          {shouldRenderToggleEyeIcon() && (
            <ToggleEyeIcon
              showPassword={showPassword}
              toggleShowPassword={() => setShowPassword((s) => !s)}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-xs text-danger-800 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
    );
  }

  function renderConfirmPasswordInput({ register, isLoading }: any) {
    return (
      <div className="space-y-1">
        {!errors.password && (
          <div className="mt-1 mb-3 text-sm">
            <label>
              Password must be at least 8 characters long, includes letters,
              numbers and symbols.
            </label>
          </div>
        )}
        <div className="relative mt-1">
          <input
            id={`${view}-confirm-password`}
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            disabled={isLoading}
            placeholder="Confirm Password"
            className={cn({
              "block h-10 w-full appearance-none rounded-xl border border-meta-9 p-6 placeholder-muted-foreground placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800/20 sm:text-sm":
                true,
              "border border-danger-800 focus:border-danger-800 focus:outline-none focus:ring-danger-800":
                errors.confirmPassword || error,
              "border border-success focus:border-success":
                passwordsMatch &&
                password.length > 0 &&
                confirmPassword.length > 0,
            })}
            {...register("confirmPassword")}
          />
          {shouldRenderToggleEyeIcon() && (
            <ToggleEyeIcon
              showPassword={showConfirmPassword}
              toggleShowPassword={() => setShowConfirmPassword((s) => !s)}
            />
          )}
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-danger-800 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    );
  }

  function renderTermsAndConditions() {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Controller
            name="terms"
            control={control}
            render={() => (
              <Checkbox
                id="terms"
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-slate-50"
                onCheckedChange={(checked) => {
                  setValue("terms", checked as boolean);
                  setIsTermsChecked(checked as boolean);
                }}
              />
            )}
          />
          <label htmlFor="terms" className="ml-2 block text-m text-sm">
            By clicking on Register, you agree to our{" "}
            <span className="font-semibold">Terms of Use</span> and{" "}
            <span className="font-semibold">Conditions of Use</span>
          </label>
        </div>
      </div>
    );
  }

  function renderRememberMe() {
    return (
      <div className="flex w-full justify-start">
        <Controller
          name="rememberMe"
          control={control}
          render={() => {
            return (
              <div className="flex items-center justify-center gap-2">
                <Checkbox
                  id="rememberMe"
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-slate-50"
                />
                <label htmlFor="rememberMe" className="mt-1 text-sm">
                  {"Remember Me"}
                </label>
              </div>
            );
          }}
        />
        {view === "sign-in" && (
          <Link
            to="/auth/forgot-password"
            className="text-right text-sm mt-1 ml-auto text-info"
          >
            Forgot password?
          </Link>
        )}
      </div>
    );
  }

  function renderTextDivider(text?: string) {
    return (
      <div className="relative flex items-center py-1">
        <div className="flex-grow border-t border-lightGrey-300"></div>
        <span className="mx-4 flex-shrink text-gray-600">{text}</span>
        <div className="flex-grow border-t border-lightGrey-300"></div>
      </div>
    );
  }

  function renderSubmitButton({ isLoading }: { isLoading: boolean }) {
    return (
      <Button
        type="submit"
        disabled={(view === "sign-up" && isTermsChecked === false) || isLoading}
        className="flex w-full justify-center rounded-xl border border-transparent py-6 px-8 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:text-black "
      >
        {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
        {view === "sign-in" ? "Log In" : null}
        {view === "sign-up" ? "Sign Up" : null}
        {view === "update-password" ? "Update Password" : null}
      </Button>
    );
  }

  return (
    <Loading isLoading={isLoading}>
      {renderForm({ register, handleSubmit, onSubmit, isLoading, error })}
    </Loading>
  );
}
