import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Loading from "../base/loading/Loading";
import { T } from '../base/typography';
import { classNames } from '../../utils/classNames';
import { Button } from '../base/button/Button';
import { cn } from '@/utils/cn';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const Email = ({
  onSubmit,
  view,
  isLoading,
  successMessage,
  // label = 'Email address',
}: {
  onSubmit: (data: { email: string }) => void;
  view: 'sign-in' | 'sign-up' | 'update-email' | 'forgot-password';
  isLoading: boolean;
  successMessage?: string | null | undefined;
  label?: string;
  defaultValue?: string;
}) => {
  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const buttonLabelText = useMemo(() => {
    switch (view) {
      case 'sign-in':
        return 'Login';
      case 'sign-up':
        return 'Sign up';
      case 'update-email':
        return 'Update Email';
      case 'forgot-password':
        return 'Send request';
    }
  }, [view]);

  return (
    <Loading isLoading={isLoading}>
      <form>
        <div className="space-y-2">
          <div className="space-y-4">
            <div>
              <div>
                <input
                  id={`${view}-email`}
                  type="email"
                  disabled={isLoading}
                  autoComplete={'email'}
                  placeholder="Email"
                  required
                  className={cn({'block h-10 w-full appearance-none rounded-xl p-6 border border-meta-9 bg-gray-50/10 px-3 py-3 placeholder-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800/20 sm:text-sm': true,
                    'border border-danger-800 focus:border-danger-800 focus:outline-none focus:ring-danger-800': errors.email
                  })}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: emailRegex,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                        {errors.email.message}
                    </p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="button"
                className={classNames(
                  'fonts-medium flex w-full justify-center rounded border border-transparent py-2 px-4 text-sm text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 dark:text-black',
                  isLoading
                    ? 'bg-yellow-300 dark:bg-yellow-700 '
                    : 'bg-primary-500 hover:bg-blue-600/60 dark:bg-white dark:hover:bg-gray-100'
                )}
                onClick={handleSubmit(onSubmit)}
              >
                {buttonLabelText}
              </Button>
            </div>
          </div>
          <div>
            {successMessage ? (
              <T.P className="text-center text-green-500 dark:text-green-400">{successMessage}</T.P>
            ) : null}
          </div>
        </div>
      </form>
    </Loading>
  );
};
