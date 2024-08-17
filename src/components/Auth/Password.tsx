import { useState } from 'react';
import { classNames } from '../../utils/classNames';
import { T } from '../base/typography';

export const Password = ({
    onSubmit,
    isLoading,
    successMessage,
    label = 'Password',
    buttonLabel = 'Update',
}: {
    onSubmit: (password: string) => void;
    isLoading: boolean;
    successMessage?: string;
    label?: string;
    buttonLabel?: string;
}) => {
    const [password, setPassword] = useState<string>('');

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit(password);
            }}
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-muted-foreground">
                        {label}
                    </label>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            disabled={isLoading}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="email"
                            required
                            className="block h-10 w-full appearance-none rounded-md border bg-gray-50/10 px-3 py-3 placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800/20 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    {isLoading ? (
                        <button
                            disabled
                            type="submit"
                            className={classNames(
                                'fonts-medium flex w-full justify-center rounded-lg border border-transparent py-3 px-4 text-sm text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 dark:text-black',
                                isLoading
                                    ? 'bg-yellow-300 dark:bg-yellow-700 '
                                    : 'bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100  '
                            )}
                        >
                            Loading...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className={classNames(
                                'fonts-medium flex w-full justify-center rounded-lg border border-transparent py-2 px-4 text-sm text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 dark:text-black',
                                isLoading
                                    ? 'bg-yellow-300 dark:bg-yellow-700 '
                                    : 'bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100  '
                            )}
                        >
                            {buttonLabel}
                        </button>
                    )}
                </div>
                <div>
                    {successMessage ? (
                        <T.P className="text-center text-sm text-green-500 dark:text-green-400">
                            {successMessage}
                        </T.P>
                    ) : null}
                </div>
            </div>
        </form>
    );
};
