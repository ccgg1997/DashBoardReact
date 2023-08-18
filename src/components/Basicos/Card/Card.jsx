import React, {useState} from 'react'
import './Card.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {motion,AnimateSharedLayout} from 'framer-motion'
import{UilTimes} from '@iconscout/react-unicons'
import Chart from 'react-apexcharts'

const Card = (props) => {

    const[expanded, setExpanded] = useState(false)

  return (
    <AnimateSharedLayout>
        {
            expanded ? 
                <ExpandedCard param = {props} setExpanded={()=>setExpanded(false)}/>:
                <CompactCard param = {props} setExpanded={()=>setExpanded(true)}/>
        }

    </AnimateSharedLayout>
  )
}

//compactCard
function CompactCard({param,setExpanded}){
    const Png= param.png
    return(
        <motion.div className="CompactCard"
        style={{
            background: param.color.backGround,
            boxShadow: param.color.boxShadow
        }}
        onClick={setExpanded}
        layoutId='expandableCard'
        >
            <div className="radialBar">
                <CircularProgressbar
                    value={param.barValue}
                    text={`${param.barValue}%`}
                    />
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png/>
                <span>{param.value}</span>
                <span>last 24 hour</span>
            </div>
        </motion.div>
    )
}

//expandedCard
function ExpandedCard({param,setExpanded}){
    const data = {
        options: {
            chart: {
                type: 'bar',
                height: 'auto',
            },

            dropShadow: {
                enabled: false,
                enabledSeries: undefined,
                top: 0,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.35,
            },
            fill: {
                colors: ['#fff'],
                type: 'gradient',

            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                colors: ['#fff'],
            },
            tooltip: {
                x:{
                    format: 'dd/MM/yy HH:mm'
                },
            },
            grid: {
                show: true,
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '2021-09-01T00:00:00.000Z',
                    '2021-09-01T01:30:00.000Z',
                    '2021-09-01T02:30:00.000Z',
                    '2021-09-01T03:30:00.000Z',
                    '2021-09-01T04:30:00.000Z',
                    '2021-09-01T05:30:00.000Z',
                    '2021-09-01T06:30:00.000Z',
                ],
            }

        }
    }
    return (
        <motion.div 
            className="ExpandedCard"
            style={{
            background: param.color.backGround,
            boxShadow: param.color.boxShadow}}
            layoutId='expandableCard'
        >
            <div style={{alignSelf: 'flex-end',cursor:'pointer',color:'white'}}>
                <UilTimes onClick={setExpanded}/>
            </div>
            <span>{param.title}</span>
            <div className="ChartContainer">
                <Chart series={param.series} type='bar' options={data.options}/>
            </div>
            <span>Last 24 hours</span>
        </motion.div>
    )

}
    
export default Card