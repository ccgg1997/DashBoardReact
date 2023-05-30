import React from 'react'

import CardAction from '../../../Basicos/CardAction/CardAction'
import './ClienteCards.css'

const ClienteCards = (props) => {
    const CardsData = props.CardsData 
  return (
    <div className="ClienteCards">
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

export default ClienteCards