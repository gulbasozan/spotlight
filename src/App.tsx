import { Circle, CornerDownRight, Minus } from "lucide-react"
import "./index.css"

function App() {

  return (
        <div className="flex w-full p-5 flex-col justify-center items-center">
            <div className="flex w-full max-w-3xl p-5 flex-col justify-center items-center">
                <TaskBox />
                <TaskBox />
                <TaskBox />
                <TaskBox />
            </div>
        </div>
  )
}

const TaskBox = () => {
    return (
        <div className="m-2 p-2 w-full">
            <div className="flex flex-row gap-2 items-center justify-start">
                <Circle size={20}/>
                <h1 className="font-bold text-2xl">Task</h1>
            </div>
            <div className="flex flex-col gap-2">
                <SubtaskBox />
                <SubtaskBox />
                <SubtaskBox />
            </div>
        </div>
    )
}

const SubtaskBox = () => {
    return (
        <div className="ml-2 p-2">
            <div className="flex flex-row gap-2 items-center justify-start">
                <Minus size={20}/>
                <h1 className="font-medium text-lg">Subtask</h1>
            </div>
            <div className="flex flex-col gap-2">
                <TaskContextBox />
                <TaskContextBox />
            </div>
        </div>
    )
}

const TaskContextBox = () => {
    return (
        <div className="ml-2 px-2">
            <div className="flex flex-row gap-2 items-center justify-start">
                <CornerDownRight size={20}/>
                <h1 className="font-light text-md">TaskContext</h1>
            </div>
        </div>
    )
}

export default App
