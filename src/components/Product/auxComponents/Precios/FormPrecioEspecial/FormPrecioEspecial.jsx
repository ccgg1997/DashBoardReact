import React from 'react'
import './FormPrecioEspecial.css'
import CardAction from '../../../../Basicos/CardAction/CardAction'
import { CardsData } from './CardsData'

export const FormPrecioEspecial = () => {
  return (
    <div className="FormPrecioEspecial">
        {
            CardsData.map((card, id)=>{
                return( 
                    <div className='parentContainerCliente' key={id}>
                        <CardAction
                        title={card.title}
                        color={card.color}
                        png={card.png}
                        component={card.component}
                        />
                    </div>
                )
            })
        }
    </div>
  )
}

export default FormPrecioEspecial