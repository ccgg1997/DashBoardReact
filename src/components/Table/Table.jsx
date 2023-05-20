import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css'

function createData(name, calories, fat, orderStatus) {
  return { name, calories, fat, orderStatus};
}

const heads = [{"Tracking Number":"name"},{Date:"name"}]

const rows = [
  createData('Frozen yoghurt',19992,"2 junio", "aproved"),
  createData('Ice cream sandwich',19992,"2 junio", "rejected"),
  createData('Eclair',19992,"2 junio", "aproved"),
  createData('Cupcake',19992,"2 junio", "aproved"),
  createData('Gingerbread',19992,"2 junio", "aproved"),
];

const makeStyle = (status) => {
  if(status === "aproved"){
    return {background: "rgb(145 254 159 /47%)", color: "#00B87C"}
  }else if(status === "rejected"){
    return {background: "#FFF0F0", color: "#FF0000"}
  }else{
    return {background: "#FFFBE6", color: "#FFB800"}
  } 
}

export default function BasicTable() {
  return (
    <div className="Table">
    <h3>Recent Orders</h3>
    
    <TableContainer component={Paper}
    style={{boxShadow: "0px 13px 20px #80808029"}}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            {
              heads.map((head,id)=>(
                <TableCell align="left" key={id}>{Object.keys(head)[0]}</TableCell>
              ))
            }
            <TableCell align="left">Order Status</TableCell>
            <TableCell>Detail</TableCell>
  
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">  <span className='status' style={makeStyle(row.orderStatus)}>{row.orderStatus}</span></TableCell>
              <TableCell align="left" className='Details'>Detail</TableCell>
            </TableRow>
             
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
