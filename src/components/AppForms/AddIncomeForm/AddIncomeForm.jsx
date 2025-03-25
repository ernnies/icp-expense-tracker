import styles from "./AddIncomeForm.module.css";
import Button from "../../Button/Button.jsx";
import { useState } from "react";
import { useSnackbar } from 'notistack';

const AddIncomeForm = ({ setIsOpen, setBalance }) => {
  // In AddIncomeForm we need to first know whether
  //component is open or not
  // console.log(styles);
  const [income,setIncome]=useState('');
  const {enqueueSnackbar} =useSnackbar();
  const handleAddIncomeformSubmit = (e) => {
    //prevent the default submission method
    e.preventDefault();
    //check is the number is poritive or not we cannot add -ve value tothe income
    if(Number(income)<0){
        enqueueSnackbar("Income should be greater than 0", { variant: "warning" });
        //close the modal 
        setIsOpen((prev)=>!prev);
        return
    }else{
        setBalance((prev)=>prev+Number(income));
        setIsOpen((prev)=>!prev);
    }
    
  };
  return (
    <div className={styles.formWrapper}>
      <h3>Add Balance</h3>
      <form onSubmit={handleAddIncomeformSubmit}>
        <input type="number" value={income} placeholder="Income Amount"  onChange={(e)=>{setIncome(e.target.value)}} required/>
        <Button type="submit" style="primary" btnshadow={true}>
          Add Balance
        </Button>
        <Button style="secondary" btnshadow={true} handleClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default AddIncomeForm;
