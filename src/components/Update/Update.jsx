import React from 'react'
import './Update.css'
import { DataNoticias } from './DataNoticias'

const Update = () => {
  const UpdatesData = DataNoticias
  return (
    <div className="Updates">
      {
        UpdatesData.map((update,id) => {
              return( 
                <div className="update" key={id}>
                  <img src={update.img} alt=''/>
                  <div className="noti">
                    <div style={{marginBottom:'0.5rem'}}>
                      <span>{update.name}</span>
                      <span>{update.noti}</span>
                    </div>
                    <span> {update.time}</span>
                  </div>

                </div>
              )
        }
        )
      }
    </div>
  )
}

export default Update