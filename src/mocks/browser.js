import { setupWorker } from 'msw/browser';
import {handlers} from "@/mocks/handler.js";

export const worker = setupWorker(...handlers);