import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Sidebar.css'
import Swal from 'sweetalert2'
export default function Sidebar() {
    const [activeRoute , setActiveRoute] = useState('')


    useEffect(() => {
        const currentRoute = window.location.href.slice(30)
        setActiveRoute(currentRoute)
    } , [])

    const navigate = useNavigate()

    // handlers => 
    // handlers => 
    const logOutHandler = () => {
        Swal.fire({
            title : 'خروج از حساب کاربری' ,
            title : 'از حساب کاربری خارج می شوید؟' ,
            icon : 'warning' ,
            showCancelButton : true ,
            confirmButtonText : 'بله' ,
            cancelButtonText : 'خیر' 
        }).then(res => {
            if(res.isConfirmed){
                localStorage.removeItem("userId")
                navigate('/')
            }
        })
    }
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
            <li className={`${activeRoute === 'newUser' ? 'active_bg' : ''}`}>
                <Link to="newUser" onClick={() => setActiveRoute('newUser')}>کاربر جدید</Link>
            </li>
            <li className={`${activeRoute === 'users' ? 'active_bg' : ''}`}>
                <Link to="users" onClick={() => setActiveRoute('users')}>کاربران</Link>
            </li>
            <li className={`${activeRoute === 'logs' ? 'active_bg' : ''}`}>
                <Link to="logs" onClick={() => setActiveRoute('logs')}>کارنامه ها</Link>
            </li>
            <li onClick={logOutHandler}>
                <Link to="">خروج</Link>
            </li>
        </ul>
    </div>
  )
}
