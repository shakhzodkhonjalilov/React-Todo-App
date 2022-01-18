import React from 'react'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({title, changeAdd, showAdd}) => {

    const location = useLocation()
    const onClick = (e) => {
        // // {e.target.innerText === 'Add Task' ? 'Cancel Add Task' : 'Add Task'}
        // const a = e.target.innerText === 'Add Task' ? 'Cancel Add Task' : 'Add Task'
        // console.log(a)
        // e.target.innerText = a;
    
        // let color = a === 'Cancel Add Task' ? 'green' : 'red'
        // e.target.style.background = color
        // changeAdd()
        // console.log(showAdd)
        changeAdd()
    }
    return (
        <header className='header'>
            <h1 style={{color: '#fff'}}>{title}</h1>
            {location.pathname === '/' && <Button color={showAdd ? 'red' : '#4ed420'}  text={showAdd ? 'Close' : 'Add'} onClick={onClick} />}
        </header>
    )
}

export default Header
