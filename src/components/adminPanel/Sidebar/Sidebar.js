import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
    const [activeRoute , setActiveRoute] = useState('')


    useEffect(() => {
        const currentRoute = window.location.href.slice(30)
        setActiveRoute(currentRoute)
    } , [])
  return (
    <div className='adminSidebar'>
        <ul>
            <li className={`${activeRoute === '' ? 'active_bg' : ''}`}>
                <Link to="" onClick={() => setActiveRoute('')}>داشبورد</Link>
            </li>
            <li className={`${activeRoute === 'newQuiz' ? 'active_bg' : ''}`}>
                <Link to="newQuiz" onClick={() => setActiveRoute('newQuiz')}>ازمون جدید</Link>
            </li >
            <li className={`${activeRoute === 'exams' ? 'active_bg' : ''}`}>
                <Link to="exams" onClick={() => setActiveRoute('exams')}>ازمون ها</Link>
            </li>
            <li className={`${activeRoute === 'newQuestion' ? 'active_bg' : ''}`}>
                <Link to="newQuestion" onClick={() => setActiveRoute('newQuestion')}>سوال جدید</Link>
            </li>
            <li className={`${activeRoute === 'questions' ? 'active_bg' : ''}`}>
                <Link to="questions" onClick={() => setActiveRoute('questions')}>سوال ها</Link>
            </li>
            <li className={`${activeRoute === 'users' ? 'active_bg' : ''}`}>
                <Link to="users" onClick={() => setActiveRoute('users')}>کاربران</Link>
            </li>
            <li className={`${activeRoute === 'logs' ? 'active_bg' : ''}`}>
                <Link to="logs" onClick={() => setActiveRoute('logs')}>کارنامه ها</Link>
            </li>
            <li className={`${activeRoute === 'settings' ? 'active_bg' : ''}`}>
                <Link to="settings" onClick={() => setActiveRoute('settings')}>تنظمیات</Link>
            </li>
            <li >
                <Link to="">خروج</Link>
            </li>
        </ul>
    </div>
  )
}
