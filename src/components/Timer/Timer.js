import React, { useEffect } from 'react'
import { useTimer } from 'react-timer-hook';
import './Timer.css'

export default function Timer({expiryTimestamp , onExpireHandler}){
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp , onExpire: onExpireHandler});


      useEffect(() => {
        start()
      } , [])
  return (
    <div className="timerBox">
        <span>{hours}</span> :
        <span>{minutes}</span> :
        <span>{seconds}</span>
    </div>
  )
}
