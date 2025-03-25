import { useState, useEffect } from "react";
import ModalApp from "../../components/Modal/ModalApp";
import AppCard from "../../components/AppCard/AppCard";
import styles from "./Home.module.css";
import AddIncomeForm from "../../components/AppForms/AddIncomeForm/AddIncomeForm";
import AddExpenseForm from "../../components/AppForms/AddExpenseForm/AddExpenseForm";
import PieCharts from "../../components/PieCharts/PieCharts";
import TransactionList from "../../components/TransactionList/TransactionList";
import BarChart from "../../components/BarChartComponent/BarChartComponent";
const Home = () => {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  //a state variable is require to update whther component is mounted or not
  const [isMounted, setIsMounted] = useState(false);
  // an array of objects is require where objects are called expense
  const [expenseList, setExpenseList] = useState([]);
  //we need state variables to track whether modal are open or close
  //There is a modal for add balance so need a state variable for that
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  //There is a modal for add the expenses so need a state variable to track
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  //an object require to store categorywise spends
  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  // an object is require to store the category count
  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  //an useEffect require for initial setup for balance
  useEffect(() => {
    //first check the localStorage
    const localStorageBalance = localStorage.getItem("balance");
    //if there is balance
    if (localStorageBalance) {
      setBalance(Number(localStorageBalance));
    } else {
      //if there is no balance
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }
    const items=JSON.parse(localStorage.getItem("expenses"));
    setExpenseList(items || []);
    setIsMounted((prev)=>!prev);
  }, []);
  //an useEffect is require to saving expense list in localstorage
  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }
    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0
        )
      );
    } else {
      setExpense(0);
    }
    //initiate th variables to store for charts
    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    //get the value from expenseList
    expenseList.forEach((item) => {
      if (item.category == "food") {
        foodSpends += Number(item.price);
        foodCount++;
      } else if (item.category == "entertainment") {
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      } else if (item.category == "travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });
    setCategorySpends({
      food: foodSpends,
      entertainment: entertainmentSpends,
      travel: travelSpends,
    });
    setCategoryCount({
      food: foodCount,
      entertainment: entertainmentCount,
      travel: travelCount,
    });
  }, [expenseList]);
  // console.log(categoryCount,setCategorySpends)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);
  return (
    <div className={styles.ETcontainer}>
      <h1>Expense Tracker</h1>
      <div className={styles.CardAndChartWrapper}>
        <AppCard
          cardTitle="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="success"
          handleClick={() => {
            setIsOpenBalance(true);
          }}
        />
        <AppCard
          cardTitle="Expenses"
          money={expense}
          success={false}
          buttonText="+ Add Expense"
          buttonType="danger"
          handleClick={() => {
            setIsOpenExpense(true);
          }}
        />
        <PieCharts
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Entertainment", value: categorySpends.entertainment },
            { name: "Travel", value: categorySpends.travel },
          ]}
        />
      </div>
      {/* Transactions and bar chart wrapper */}
      <div className={styles.transactionsWrapper}>
        <TransactionList
          transactions={expenseList}
          editTransactions={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />

        <BarChart
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Entertainment", value: categorySpends.entertainment },
            { name: "Travel", value: categorySpends.travel },
          ]}
        />
      </div>
      {/* Modal for adding balance */}
      <ModalApp isModalOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
        <AddIncomeForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
      </ModalApp>
      {/* Modal for adding expense */}
      <ModalApp isModalOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
        <AddExpenseForm
          setIsOpen={setIsOpenExpense}
          setExpense={setExpense}
          balance={balance}
          setBalance={setBalance}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
        />
      </ModalApp>
    </div>
  );
};

export default Home;
