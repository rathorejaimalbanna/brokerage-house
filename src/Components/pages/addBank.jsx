import React, { useState } from 'react';
import styles from "./pages.module.css"
import Button from 'react-bootstrap/Button';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { userSelector } from '../../Redux/userReducer/userReducer';

export default function AddBank() {
    const {user} = useSelector(userSelector);
    const [acc,setAcc] = useState();
    const [bank,setBank] = useState();
    const [ifsc,setIfsc] = useState()
    async function handleSubmit(e)
    {   e.preventDefault()
        alert("Bank account added successfully")
        await setDoc(doc(db, "Bank Details",user.email ), {
            email:user.email,
            name: user.name,
            bank,
            account:acc,
            ifsc
          });
    }
  return (
    <>
     <h2 style={{marginTop:"25px"}}>Add your bank details</h2> 
     <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
        <h5>Enter Bank Name</h5>
        <input onChange={(e)=> setBank(e.target.value)} type="text" placeholder='Bank Name' className={styles.inputField} />
        <h5>Provide IFSC Code</h5>
        <input onChange={(e)=> setIfsc(e.target.value)} type="text" placeholder='IFSC' className={styles.inputField}/>
        <h5>Provide Account Number</h5>
        <input onChange={(e)=> setAcc(e.target.value)} type="text" placeholder='ACC. NO.' className={styles.inputField}/>
        <Button type="submit" className={styles.submitButton} >Submit</Button>
     </form>
    </>
  )
}
