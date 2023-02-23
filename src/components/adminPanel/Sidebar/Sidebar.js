import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className='adminSidebar'>
        <ul>
            <li className='active_bg'>
                <Link to="" >داشبورد</Link>
            </li>
            <li>
                <Link to="newQuiz" >ازمون جدید</Link>
            </li>
            <li>
                <Link to="" >ازمون ها</Link>
            </li>
            <li>
                <Link to="" >کاربران</Link>
            </li>
            <li>
                <Link to="" >کارنامه ها</Link>
            </li>
            <li>
                <Link to="">تنظمیات</Link>
            </li>
            <li>
                <Link to="">خروج</Link>
            </li>
        </ul>
    </div>
  )
}
