import React from 'react'
import { Button } from 'react-bootstrap'

export default function PlotDetails(props) {
  function handleBook()
  {
    if(props.plotDetail.status!== "available"){
      alert("Plot not available for sale")
    }
    else{
      props.handleShow()
    }
  }
  return (
    <div>
        <h4>Property Details</h4>
        <p className='white'>{props.projectName}</p>
        <p className='white'>{props.projectLocation}</p>
        <h4>Plot Area</h4>
        <p className='white'>{props.plotDetail.area} Yards</p>
        <h4>Plot Price</h4>
        <p className='white'>&#8377; {props.plotDetail.price}</p>
        <Button  variant='info' onClick={handleBook}>Proceed to book</Button>
        <Button onClick={props.handleCloseInfo} variant='danger' style={{marginLeft:'20px'}}>Cancel</Button>
    </div>
  )
}
