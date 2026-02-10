import "./index.css";

import TasksProvider from "./contexts/TasksProvider.tsx";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import { Outlet } from "react-router";
import SessionProvider from "./contexts/SessionProvider.tsx";
// import TasksProvider from "./contexts/Tasks.tsx";

function App() {
    return (
        <SessionProvider>
            <TasksProvider>
                <Outlet />
            </TasksProvider>
        </SessionProvider>
    );
}

export default App;
