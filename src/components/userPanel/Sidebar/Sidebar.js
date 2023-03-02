import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Sidebar.css'

export default function Sidebar({userInfo}) {
    const [activeRoute , setActiveRoute] = useState('')


    const navigate = useNavigate()

    useEffect(() => {
        const currentRoute = window.location.href.slice(33)
        setActiveRoute(currentRoute)
    } , [])


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
        <div className='user-Info mb-4 text-center'>
            <img src="images/userProfile.jpg" alt="" width={100} className="rounded-circle" />
            <div className='mt-2 text-white'>{userInfo?.email}</div>
            <div className='mt-1 text-white'>{userInfo?.username}</div>
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
            <li onClick={logOutHandler}>
                <Link to="">خروج</Link>
            </li>
        </ul>
    </div>
  )
}
