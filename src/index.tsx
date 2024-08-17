import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { createRoot } from "react-dom/client";
import { LoadingProvider } from "./context/LoadingContext";
import ReduxProvider from "./redux/ReduxProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: `${import.meta.env.VITE_GTM_ID}`,
};

console.log(tagManagerArgs);
TagManager.initialize(tagManagerArgs);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </ReduxProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
