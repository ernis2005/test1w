import React from 'react'
import s from './page.module.scss'

const Loading = () => {
   
  return (
    <div className={s.loading}>
       <div className={s.title}>
       <p>Loading...</p>
       </div>
    </div>
  )
}

export default Loading
