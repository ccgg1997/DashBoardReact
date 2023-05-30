import React from 'react'
import './RightSide.css'



const RightSide = ({ updatesComponent, extraInfo,title1,title2 }) => {
  return (
    <div className="RightSide">
      <div>   
        <h3>{title1}</h3>
        {updatesComponent}
      </div>
      <div>
        <h3>{title2}</h3>
        {extraInfo}
      </div>
    </div>
  )
}

export default RightSide