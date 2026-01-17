import "./index.css";

import Home from "./Home.tsx";
import TasksProvider from "./contexts/TasksProvider.tsx";
// import TasksProvider from "./contexts/Tasks.tsx";

function App() {
    return (
        <TasksProvider>
            <div className="flex w-full p-5 flex-col justify-center items-center">
                <Home />
            </div>
        </TasksProvider>
    );
}

export default App;
