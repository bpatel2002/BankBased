import './App.css';
import React, { useState } from 'react';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState(0);
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState(0);
  const [customerList, setCustomerList] = useState([]);
  const [newBalance, setNewBalance] = useState(0);

  const addCustomer = () => {
    Axios.post('https://bankbased.herokuapp.com/create', { name: name, accountNumber: accountNumber, accountType: accountType, balance: balance }).then(() => {
      setCustomerList([...customerList, { name: name, accountNumber: accountNumber, accountType: accountType, balance: balance },])
    })
  }

  const getCustomers = () => {
    Axios.get('https://bankbased.herokuapp.com/customers').then((response) => {
      setCustomerList(response.data);
    })
  }

  const updateCustomerBalance = (customerID) => {
    Axios.put('https://bankbased.herokuapp.com/update', { balance: newBalance, customerID: customerID }).then((response) => {
    }
    )
  }

  const deleteCustomer = (customerID) => {
    Axios.delete(`https://bankbased.herokuapp.com/delete/${customerID}`).then((response) => {
      setCustomerList(customerList.filter((val) => {
        return val.customerID !== customerID;
      }))
    });
  }

  return (
    <div className="App">
      <div className="information">
        <label>Name: </label>
        <input type="text" onChange={(event) => { setName(event.target.value) }} />
        <label>Account Number: </label>
        <input type="number" onChange={(event) => { setAccountNumber(event.target.value) }} />
        <label>Account Type: </label>
        <input type="text" onChange={(event) => { setAccountType(event.target.value) }} />
        <label>Balance: </label>
        <input type="number" onChange={(event) => { setBalance(event.target.value) }} />
        <button onClick={addCustomer}>Add Customer</button>
      </div>
      <div className="customers">
        <button onClick={getCustomers}>Show Customers</button>
        <div className="header">
          Customer Records
        </div>
        {customerList.map((val, key) => {
          return <div className="customer">
            <div>
              <h3>Name: {val.name}</h3>
              <h3>Account Number: {val.accountNumber}</h3>
              <h3>Account Type: {val.accountType}</h3>
              <h3>Balance: ${val.balance}</h3>
            </div>
            <div className="options">
              Update Balance:
              <input
                type="text"
                placeholder="New Balance Amount..."
                onChange={(event) => {
                  setNewBalance(event.target.value)
                }}
              />
              <button onClick={() => { updateCustomerBalance(val.customerID) }}>Update</button>
              <div className="delete">
                Delete Record:
              </div>
              <button onClick={() => { deleteCustomer(val.customerID) }}>Delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
