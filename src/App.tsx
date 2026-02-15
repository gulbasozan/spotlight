import "./index.css";

import TasksProvider from "./contexts/TasksProvider.tsx";
import { Outlet } from "react-router";
import SessionProvider from "./contexts/SessionProvider.tsx";

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
