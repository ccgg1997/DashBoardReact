import React from 'react'
import './Update.css'
import { useSelector } from "react-redux";
import logo from './logo.png'
//import { DataNoticias } from './DataNoticias'

const Update = () => {
  const { eventos } = useSelector((state) => state.eventos);
  const DataNoticiascrudo = eventos;
  const today = new Date().toISOString().split('T')[0];
  const DataNoticias = DataNoticiascrudo.filter(event => event.start === today);
  const UpdatesData = DataNoticias
  return (
    <div className="Updates">
      {
        UpdatesData.map((update,id) => {
              return( 
                <div className="update" key={id}>
                  <img src={logo} alt=''/>
                  <div className="noti">
                    <div style={{marginBottom:'0.5rem'}}>
                      <span>{update.title}</span>
                    </div>
                    <span> {update.start}</span>
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