import React from 'react'

import './TitleHead.css'


import {HiArrowNarrowLeft} from 'react-icons/hi'

export default function TitleHead(props) {
  return (
    <div className='d-flex align-items-center'>
        <HiArrowNarrowLeft className='titleHeadIcon' />
        <div className="rtl titleHeadTxt">{props.title}</div>
    </div>
  )
}
