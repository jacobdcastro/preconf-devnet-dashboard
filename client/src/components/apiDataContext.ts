import { DataPayload } from "@/interfaces/api";
import { createContext } from "react";

export const ApiDataContext = createContext<DataPayload>(null);
