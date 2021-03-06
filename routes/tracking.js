const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../config/database');

let Order = require('../models/order');

let User = require('../models/user');
let Formula = require('../models/formula');
let Bottle = require('../models/bottle');

//tracking form
router.get('/track/:id',function(req,res){
    Order.findById(req.params.id,function(err,order){
        res.render('tracking',{
            order:order
        });
    });
});

router.post('/track/:id',function(req,res){
    console.log('submit checkout');
});

router.get('/:id', function(req,res){
    User.findById(req.params.id,function(err,users){
        Order.find({},function(err,orders){
            if(err){
                console.log(err);
            }
            else{
                res.render('tracking_own', {
                    title:'YOUR ORDER' ,
                    orders: orders,
                    users : users
                });
            }
        });
    });
});

module.exports = router;