import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
    const [activeRoute , setActiveRoute] = useState('')


    useEffect(() => {
        const currentRoute = window.location.href.slice(33)
        setActiveRoute(currentRoute)
    } , [])
  return (
    <div className='adminSidebar'>
        <div className='user-Info mb-4 text-center'>
            <img src="images/userProfile.jpg" alt="" width={100} className="rounded-circle" />
            <div className='mt-2 text-white'>userEm@gmail.com</div>
            <div className='mt-1 text-white'>username</div>
        </div>
        <ul>
            <li className={`${activeRoute === '' ? 'active_bg' : ''}`}>
                <Link to="" onClick={() => setActiveRoute('')}>داشبورد</Link>
            </li>
            <li className={`${activeRoute === 'exams' ? 'active_bg' : ''}`}>
                <Link to="exams" onClick={() => setActiveRoute('exams')}>ازمون ها</Link>
            </li>
            <li className={`${activeRoute === 'logs' ? 'active_bg' : ''}`}>
                <Link to="logs" onClick={() => setActiveRoute('logs')}>کارنامه ها</Link>
            </li>
            <li className={`${activeRoute === 'account-info' ? 'active_bg' : ''}`}>
                <Link to="account-info" onClick={() => setActiveRoute('account-info')}>آطلاعات حساب</Link>
            </li>
            <li >
                <Link to="">خروج</Link>
            </li>
        </ul>
    </div>
  )
}
