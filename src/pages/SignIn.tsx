import { redirect, useNavigate } from "react-router";
import { supabase } from "../api/supabase";
import { useSession } from "../contexts/SessionProvider";
import { useEffect } from "react";

const SignIn = () => {
    const { session, setSession } = useSession();
    const navigate = useNavigate();

    const onSubmit = async (e: any) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: e.target.username.value,
            password: e.target.password.value,
        });

        if (error) return console.log(error);

        setSession(data.session);

        return navigate("/");
    };

    useEffect(() => {
        if (session) navigate("/");
    }, [session, navigate]);

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-center">
                <h1 className="font-bold text-3xl">Spotlight</h1>
                <p className="font-light">Marginal task tracker.</p>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h2>Username:</h2>
                    <input
                        placeholder="deathraider360"
                        className="border rounded-md p-1"
                        name="username"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <h2>Password:</h2>
                    <input
                        placeholder="deathraider360"
                        className="border rounded-md p-1"
                        name="password"
                        type="password"
                    />
                </div>
                <button className="w-full text-center border rounded-md p-1 mt-1">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
