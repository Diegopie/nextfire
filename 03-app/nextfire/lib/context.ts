import { createContext } from "react";
interface IDefaultContext {
    user: object | null;
    username: string | null;
}

export const UserContext = createContext<IDefaultContext>(
    // Default State
    {
        user:null,
        username: null
    }
);