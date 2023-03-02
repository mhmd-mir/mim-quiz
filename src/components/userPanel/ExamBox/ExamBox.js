import React, { useEffect } from 'react'

import './ExamBox.css'


// icons => 
import {FcCancel} from 'react-icons/fc'
export default function ExamBox({id , title , startDate , endDate , time , creator}) {


  return (
    <div className='examBox mt-3'>
        <div className='text-end p-2 py-3 examBoxHead'>
            <div className='d-flex align-items-center examBoxTitle'>{title}</div>
        </div>
        <div className="examBoxProps">
            {/* // exam code */}
            <div className='d-flex align-items-center my-1'>
                <div className='examProp_name text-muted ms-2'>کد ازمون :</div>
                <div className='examProp_value'>{id * 8 - 12 + 77}</div>
            </div>
            {/* // start_date  */}
            <div className='d-flex align-items-center my-1'>
                <div className='examProp_name text-muted ms-2'> زمان برگزاری ازمون :</div>
                <div className='examProp_value'>{startDate} ساعت 08:00 </div>
            </div>
            {/* // start_date  */}
            <div className='d-flex align-items-center my-1'>
                <div className='examProp_name text-muted ms-2'> زمان پایان ازمون :</div>
                <div className='examProp_value'>{endDate} ساعت 24:00 </div>
            </div>
            {/* // log recieve time */}
            <div className='d-flex align-items-center my-1'>
                <div className='examProp_name text-muted ms-2'> زمان دریافت کارنامه :</div>
                <div className='examProp_value'>بلافاصله یعد پایان ازمون</div>
            </div>
            {/* // log recieve time */}
            <div className='d-flex align-items-center my-1'>
                <div className='examProp_name text-muted ms-2'> نمره منفی :</div>
                <div className='examProp_value'> <FcCancel style={{fontSize : '20px'}}/> </div>
            </div>
            {/* // time */}
            <div className='d-flex align-items-center my-1'>
                <div className='examProp_name text-muted ms-2'>  زمان ازمون :</div>
                <div className='examProp_value'> {time} </div>
            </div>
             {/* // mode */}
             <div className='d-flex align-items-center my-1'>
                <div className='examProp_name text-muted ms-2'> نوع ازمون :</div>
                <div className='examProp_value'> تستی </div>
            </div>
            {/* // creator */}
            <div className='d-flex align-items-center my-1'>
                <div className='examProp_name text-muted ms-2'> برگزارکننده :</div>
                <div className='examProp_value'> {creator} </div>
            </div>
        </div>
        <div className='py-3 px-2'>
            <button className='w-100 startExamBtn'>شرکت در ازمون</button>
        </div>
    </div>
  )
}
