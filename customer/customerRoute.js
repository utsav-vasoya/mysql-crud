const express = require('express');
const route = express.Router();
const { addCustomer, customer, addCustomerPage, editCustomerPage, updateCustomer, deleteCustomer} = require('./customerController');

route.get('/customer', customer);
route.get('/customer/add', addCustomerPage);
route.post('/customer/add', addCustomer);
route.get('/customer/edit/:id', editCustomerPage);
route.post('/customer/update/:id', updateCustomer);
route.get('/customer/delete/:id', deleteCustomer);

module.exports = route;