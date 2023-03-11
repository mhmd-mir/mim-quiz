import React from 'react'
import { Link } from 'react-router-dom'
import './LogBox.css'

export default function LogBox(props) {
  return (
    <div className='logBox'>
        <div>
            <p>{props.title}</p>
        </div>
        <div>
            <Link to={`/my-account/logPage/${props.id}`}>مشاهده کارنامه</Link>
        </div>
    </div>
  )
}
