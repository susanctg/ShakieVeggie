const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../config/database');

let Order = require('../models/order');

router.get('/addorder',function(req,res){
    res.render('add_order', {
        title:'Add Order'
    });
});

router.post('/addorder',function(req,res){
    let order = new Order();
    order.username = 1;
    order.address = 1;
    order.totalprice = 1;
    order.paymentstatus = 1;

    order.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            console.log(order._id);
            orderid = order._id;
            res.redirect('/formulas/' + order._id);
        }
    });
});

router.get('/test',function(req,res){
    Order.find({},function(err,orders){
        res.render('testdisease',{
            orders:orders
        });
    });
});

module.exports = router;