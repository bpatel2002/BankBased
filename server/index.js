const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'b53788f6fe6f8b',
    host: 'us-cdbr-east-06.cleardb.net',
    password: '60e0dd4b',
    database: 'heroku_2c39d28669a30fc',
});


app.post('/create', (req, res) => {
    const name = req.body.name;
    const accountNumber = req.body.accountNumber;
    const accountType = req.body.accountType;
    const balance = req.body.balance;

    db.query('INSERT INTO customers (name, accountNumber, accountType, balance) VALUES (?,?,?,?)', [name, accountNumber, accountType, balance], (err, results) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Values Inserted")
        }
    })
})

app.get('/customers', (req, res) => {
    db.query("Select * FROM customers", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.put('/update', (req, res) => {
    const customerID = req.body.customerID;
    const balance = req.body.balance;
    db.query("UPDATE customers SET balance = ? WHERE customerID = ?", [balance, customerID], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.delete('/delete/:customerID', (req, res) => {
    const customerID = req.params.customerID;
    db.query("DELETE FROM customers WHERE customerID = ?", customerID, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
