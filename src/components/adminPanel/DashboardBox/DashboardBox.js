import React from 'react'

import './DashboardBox.css' ;

export default function DashboardBox({count , title , bg , icon}) {
  return (
    <>
        <div className={`DashboardBox bg-${bg} d-flex align-items-center rounded py-3 mt-2 px-2 justify-content-between`}>
            <span className='larger text-white'>{count} {title}</span>
            {icon}
        </div>
    </>
  )
}
