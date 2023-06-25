var dbConn = require('../connection');

exports.customer = (req, res) => {
    dbConn.query('SELECT * FROM customers', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('customer', { data: '' });
        } else {
            res.render('customer', { data: rows });
        }
    });
}
exports.addCustomerPage = (req, res) => {
    res.render('customer/add', {
        name: '',
        email: '',
        age: ''
    })
}

exports.addCustomer = (req, res) => {
    let { name, email, age } = req.body;
    let errors = false;

    if (name.length === 0 || email.length === 0 || age === 0) {
        errors = true;
        req.flash('error', "Please enter name and email and age");
        res.render('customer/add', {
            name: name,
            email: email,
            age: age
        })
    }

    if (!errors) {
        var form_data = {
            name: name,
            email: email,
            age: age
        }
        dbConn.query('INSERT INTO customers SET ?', form_data, function (err, result) {
            if (err) {
                req.flash('error', err)
                res.render('customer/add', {
                    name: form_data.name,
                    email: form_data.email,
                    age: form_data.age
                })
            } else {
                req.flash('success', 'User successfully added');
                res.redirect('/api/customer');
            }
        })
    }
}

exports.editCustomerPage = (req, res) => {
    let id = req.params.id;
    dbConn.query('SELECT * FROM customers WHERE id = ' + id, function (err, rows, fields) {
        if (err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'User not found with id = ' + id)
            res.redirect('/api/customer')
        }
        else {
            res.render('customer/edit', {
                title: 'Edit Customer',
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email,
                age: rows[0].age
            })
        }
    })
}

exports.updateCustomer = (req, res) => {
    let id = req.params.id;
    let { name, email, age } = req.body;
    let errors = false;

    if (name.length === 0 || email.length === 0 || age.length === 0) {
        errors = true;
        req.flash('error', "Please enter name and email and age");
        res.render('customer/edit', {
            id: req.params.id,
            name: name,
            email: email,
            age: age
        })
    }
    if (!errors) {
        var form_data = {
            name: name,
            email: email,
            age: age
        }
        dbConn.query('UPDATE customers SET ? WHERE id = ' + id, form_data, function (err, result) {
            if (err) {
                req.flash('error', err)
                res.render('customer/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    email: form_data.email,
                    age: form_data.age
                })
            } else {
                req.flash('success', 'Customer successfully updated');
                res.redirect('/api/customer');
            }
        })
    }
}

exports.deleteCustomer = (req, res) => {
    let id = req.params.id;
    dbConn.query('DELETE FROM customers WHERE id = ' + id, function (err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/api/customer')
        } else {
            req.flash('success', 'Customer successfully deleted! ID = ' + id)
            res.redirect('/api/customer')
        }
    })
}