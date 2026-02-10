import { type Session } from "@supabase/supabase-js";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { supabase } from "../api/supabase";

const SessionContext = createContext<SessionContext_T | undefined>(undefined);

const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true); // ALWAYS FETCH SESSION FIRST

    useEffect(() => {
        setLoading(true);
        supabase.auth
            .getSession()
            .then(({ data: { session } }) => setSession(session))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {loading ? <h1>Loading...</h1> : children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

export default SessionProvider;
