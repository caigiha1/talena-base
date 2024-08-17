import { setupServer } from "msw/node";
import {handlers} from "@/mocks/handler.js";

// This configures a request mocking node with the given request handlers.
export const server = setupServer(...handlers);
