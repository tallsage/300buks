import React, {useState, useContext} from "react";
import './App.css';
import { Card, Input, Button } from 'antd';
import 'antd/dist/antd.css'
import {Context} from "./index";

function App() {

  const { firestore, firebase } = useContext(Context)

  const [state, setState] = useState({
    card: '',
    date: '',
    dateM: '',
    dateY: '',
    CVV: '',
    amount: ''
  })
  
  const addData = async () =>{
    firestore.collection('cards').add({
        CardNumber: state.card,
        ExpDate: state.date,
        Cvv: state.CVV,
        Amount: state.amount,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  const getData = async (id) =>{
    const snapshot = await firebase.firestore().collection('cards').orderBy('createdAt').get()
    var amount = 0
    var uId = 0
    snapshot.docs.map(doc => {
      amount = doc.data().Amount
      uId = doc.id
    });
    return console.log("RequestId: " + uId + ' Amount:' + amount)
  }

  const buttonOnClick = () =>{
    addData()
    getData()
    console.log('sending...');
  }

  const cardChange = (e) =>{
    let value = (e.nativeEvent.data === null) ? (e.nativeEvent.data) : (e.nativeEvent.data.replace(/[^0-9]/g, ''))
    let lastValue = (state.card !== '') ? (
        (value === null) ? (state.card.slice(0, -1)) : (
          (state.card.length === 16) ? (state.card) : (state.card + value)
        )
      ) : (value)
    setState({...state, card: lastValue})
  }

  const dateChange = (e) =>{
    let value = (e.nativeEvent.data === null) ? (e.nativeEvent.data) : (
      (state.dateM.length !== 2) ? (
        (state.dateM.length === 0) ? (e.nativeEvent.data.replace(/[^0-1]/g, '')) : (
          (state.dateM === '0') ? (e.nativeEvent.data.replace(/[^1-9]/g, '')) : (e.nativeEvent.data.replace(/[^0-2]/g, ''))
        )
      ) : (
        (state.dateY.length === 0) ? (e.nativeEvent.data.replace(/[^2]/g, '')) : (
          (state.dateY.length === 1) ? (e.nativeEvent.data.replace(/[^0]/g, '')) : (
            (state.dateY.length === 2) ? (e.nativeEvent.data.replace(/[^2-9]/g, '')) : (
              (state.dateY[2] === '2') ? (e.nativeEvent.data.replace(/[^2-9]/g, '')) : (e.nativeEvent.data.replace(/[^0-9]/g, ''))
            )
          )
        )
      )
    )
    
    let lastValue = (state.dateM.length !== 2) ? (
        (value === null) ? (state.dateM.slice(0, -1)) : (state.dateM + value)
      ) : (
        (value === null) ? (state.dateY.slice(0, -1)) : (
          (state.dateY.length === 4) ? (state.dateY) : (state.dateY + value)
        )
      ) 
      
    let perfectDate = (state.dateM.length === 2) ? (state.dateM + '/' + lastValue) : (lastValue)
    
    if (state.dateM.length === 2) {
      setState({...state, date: perfectDate, dateY: lastValue})
    }else{
      setState({...state, date: perfectDate, dateM: lastValue})
    }
  }

  const cvvChange = (e) =>{
    let value = (e.nativeEvent.data === null) ? (e.nativeEvent.data) : (e.nativeEvent.data.replace(/[^0-9]/g, ''))
    let lastValue = (state.CVV !== '') ? (
        (value === null) ? (state.CVV.slice(0, -1)) : (
          (state.CVV.length === 3) ? (state.CVV) : (state.CVV + value)
        )
      ) : (value)
    setState({...state, CVV: lastValue})
  }

  const amountChange = (e) =>{
    let value = (e.nativeEvent.data === null) ? (e.nativeEvent.data) : (e.nativeEvent.data.replace(/[^0-9]/g, ''))
    let lastValue = (state.amount !== '') ? (
        (value === null) ? (state.amount.slice(0, -1)) : (state.amount + value)
      ) : (value)
    setState({...state, amount: lastValue})
  }

  return (
    <div className="App">
      <div className="site-card-border-less-wrapper">
        <Card title="Enter your payment" bordered={false} style={{ width: 300 }}>
          <Input placeholder="Card Number" type='text' onChange={cardChange} value={state.card}/>
          <Input placeholder="Expiration Date" type='text' onChange={dateChange} value={state.date}/>
          <Input placeholder="CVV" type='text' onChange={cvvChange} value={state.CVV}/>
          <Input placeholder="Amount" type='text' onChange={amountChange} value={state.amount}/>
          <Button type="primary" disabled={
            (state.card.length === 16 && state.date.length === 7 && state.CVV.length === 3 && state.amount.length > 0) ? (false) : (true)
          } onClick={buttonOnClick}>READY</Button>
        </Card>
      </div>
    </div>
  );
}

export default App;
