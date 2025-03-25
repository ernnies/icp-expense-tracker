import styles from "./AddExpenseForm.module.css";
import Button from "../../Button/Button";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

const AddExpenseForm = ({
  setIsOpen,
  expenseList,
  setExpenseList,
  balance,
  setBalance,
  editId,
}) => {
  //an object require which will store form data
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    category: "",
    price: "",
    date: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  // update state variable value on changing form value
  const handleChange = (e) => {
    const name = e.target.name;
    setExpenseFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  //on form submission need some action
  const handleAddExpense = (e) => {
    //prevent the default form submission
    e.preventDefault();
    if (balance < Number(expenseFormData.price)) {
      enqueueSnackbar("Price should be less than the wallet balance", {
        variant: "warning",
      });
      //close the form
      setIsOpen(false);
      return;
    }
    //first deduct from wallet balance
    setBalance((prev) => prev - Number(expenseFormData.price));

    //for every expense there is a need an id for unique expense
    //so that we can do edit in that expense
    console.log("check 1",expenseList)
    const lastId = expenseList.length > 0 ? expenseList[0].id : 0;
    console.log("check 2",lastId);
    setExpenseList((prev) => [
      { ...expenseFormData, id: lastId + 1 },
      ...prev,
    ]);
    console.log("check 3",expenseList)
    //after adding the expense make sure form data should be clear
    setExpenseFormData({
      title: "",
      category: "",
      price: "",
      date: "",
    });
    //make sure to clsoe the form when expense added
    setIsOpen(false);
  };
  const handleEditForm = (e) => {
    e.preventDefault();
    const updatedList = expenseList.map((item) => {
      if (item.id == editId) {
        const changInPrice = item.price - Number(expenseFormData.price);
        //a check should be there to check whether price is excedding wallet balance
        if (changInPrice < 0 && Math.abs(changInPrice) > balance) {
          enqueueSnackbar("Price should not be exceed the wallet balance", {
            variant: "warning",
          });
          setIsOpen(false);
          return { ...item };
        }
        setBalance((prev) => prev + changInPrice);
        return { ...expenseFormData, id: editId };
      } else {
        return item;
      }
    });
    setExpenseList(updatedList);
    setIsOpen(false);
  };

  useEffect(() => {
    if (editId) {
      const expenseData = expenseList.find((item) => item.id == editId);
      setExpenseFormData({
        title: expenseData.title,
        category: expenseData.category,
        price: expenseData.price,
        date: expenseData.date,
      });
    }
  }, [editId]);
  return (
    <div className={styles.expenseFormWrapper}>
      <h3>{editId ? "Edit Expense" : "Add Expenses"}</h3>
      <form onSubmit={editId ? handleEditForm : handleAddExpense}>
        {/* input for title of expense */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={expenseFormData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={expenseFormData.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={expenseFormData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>
        <input
          name="date"
          type="date"
          value={expenseFormData.date}
          onChange={handleChange}
          required
        />
        <Button type="submit" style="primary" btnshadow={true}>
          {editId ? "Edit Expense" : "Add Expense"}
        </Button>
        <Button
          style="secondary"
          btnshadow={true}
          handleClick={() => setIsOpen((prev) => !prev)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
