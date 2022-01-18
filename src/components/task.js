import { FaTimes } from 'react-icons/fa'

const task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={(e) => {
                const div = document.querySelector('.task')
                div.classList.add('task-delete')
                console.log(e.target.parentElement.parentElement.classList.add('task-delete'))
                setTimeout(() => {
                    onDelete(task.id)
                },1000)
                }}/>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default task
