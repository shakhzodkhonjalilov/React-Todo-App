import Header from "./components/Header";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom"; 
import { useState , useEffect } from "react"
import Tasks from "./components/Tasks";
import Footer from "./components/Footer"
import About from './components/About'
import AddTask from "./components/AddTask"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks] = useState([])

useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
 getTasks()
}, [])

//fetch Tasks

const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  console.log(data)
  return data
}

///fetch single task

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  console.log(data)
  return data
}


fetchTasks()

const deleteTask = (id) => {
  const delTask = async () => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'}).then(async response => {
      const data = await response.json()
      console.log(data)
    })
  }
  delTask()
  setTasks(tasks.filter(task => task.id !== id))
  
}

const toggleReminder = async (id) => {
  const data = await fetchTask(id)
  const newTask = {...data, reminder: !data.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT', headers: { 'Content-type': 'application/json'}, body: 
    JSON.stringify(newTask)
  })

  const response = await res.json();


  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: response.reminder} : task))
  // const taskToToggle = await fetchTask(id)
  // const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify(updTask),
  // })

  // const data = await res.json()

  // setTasks(
  //   tasks.map((task) =>
  //     task.id === id ? { ...task, reminder: data.reminder } : task
  //   )
  // )

}

const onChangeAdd = () => {
  setShowAddTask(!showAddTask)
}

const addTask = async (task) => {
  // let id = (tasks.length + 1)
  // task.id = id
  // setTasks([...tasks, task])
  // // tasks.push(task)
  // // setTasks([...tasks])
  // console.log(tasks)

  const res = await fetch('http://localhost:5000/tasks', {method: 'POST', headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(task)
})
const data = await res.json()
setTasks([...tasks, data])
}

// const changeData = () => {
//   setTasks(tasks.map(task => task.id === 1 ? {...task, text: 'hi'} : task))
// }
  return (
    <Router>
    <div className="container">
      <Header title='Task Tracker' changeAdd={() => onChangeAdd()} showAdd={showAddTask}/>
      
      {/* <button className="btn" onClick={changeData}>Edit first</button> */}
      <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' style={{color: '#fff'}}element={<About />} />
        </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
