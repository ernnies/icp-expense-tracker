import TransactionCard from "../TransactionCard/TransactionCard";
import styles from "./TransactionList.module.css";
import ModalApp from "../Modal/ModalApp";
import AddExpenseForm from "../AppForms/AddExpenseForm/AddExpenseForm";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";

const TransactionList = ({
  transactions,
  title,
  editTransactions,
  balance,
  setBalance,
}) => {
  const [editId, setEditId] = useState(0);
  //a state variable for editing a transaction card
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  //a state variable which set a flag whether the editor modal should be display or not
  const [currentTransactions, setCurrentTransactions] = useState([]);
  //a state variable data type array contain the current transactions so that it acn render
  const [currentPage, setCurrentPage] = useState(1);
  //a state variable which will store the current page no(default is always 1)
  const maxRecords = 3;
  //a variable which says maximum rows in to display in a single page
  const [totalPages, setTotalPages] = useState(0);
  //a state variable ewquire to store total no of pages require to show data

  const handleDelete = (id) => {
    const item = transactions.find((i) => i.id === id);
    const price = Number(item.price);
    setBalance((prev) => prev + price);

    editTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setEditId(id);
    setIsDisplayEditor(true);
    console.log("check 4");
  };
//why this useEffect is used
  useEffect(() => {
    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, transactions.length);
    setCurrentTransactions([...transactions].slice(startIndex, endIndex));
    setTotalPages(Math.ceil(transactions.length / maxRecords));
  }, [currentPage, transactions]);

  // update page if all items on current page have been deleted
  useEffect(() => {
    if (totalPages < currentPage && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [totalPages]);

  return (
    <div className={styles.transactionsWrapper}>
      {title && <h2>{title}</h2>}

      {transactions.length > 0 ? (
        <div className={styles.list}>
          <div>
            {currentTransactions.map((transaction) => (
              <TransactionCard
                details={transaction}
                key={transaction.id}
                handleDelete={() => handleDelete(transaction.id)}
                handleEdit={() => handleEdit(transaction.id)}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              updatePage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className={styles.emptyTransactionsWrapper}>
          <p>No transactions!</p>
        </div>
      )}

      <ModalApp isModalOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
        <AddExpenseForm
          editId={editId}
          expenseList={transactions}
          setExpenseList={editTransactions}
          setIsOpen={setIsDisplayEditor}
          balance={balance}
          setBalance={setBalance}
        />
      </ModalApp>
    </div>
  );
};
export default TransactionList;
