const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../config/database');


let User = require('../models/user');
let Formula = require('../models/formula');
let Nutrient = require('../models/nutrient');
let Bottle = require('../models/bottle')
let Order = require('../models/order');

router.get('/:order/:id', function(req,res){
    Order.findById(req.params.order,function(err,orders){
        Formula.findById(req.params.id, function(err,formula){
            Nutrient.findById(formula.component1,function(err,nutrient1){
                Nutrient.findById(formula.component2,function(err,nutrient2){
                    Nutrient.findById(formula.component3,function(err,nutrient3){
                        res.render('custom', {
                            orders:orders._id,
                            formula:formula,
                            component1:nutrient1,
                            component2:nutrient2,
                            component3:nutrient3,
                            //orderid = orders._id
                        }); 
                    });
                });
            });
        });
    });

    //console.log(orders);
    checkkidney = 0;
    checkliver = 0;
    checkhypertension = 0;
    checkdiabetes = 0;
    checkpregnant = 0;
    checksurgery = 0;
});

router.post('/:order/:id', function (req, res) {
    //res.json(req.body);
    const kidney = req.body.kidney;
    const liver = req.body.liver;
    const hypertension = req.body.hypertension;
    const diabetes = req.body.diabetes;
    const pregnant = req.body.pregnant;
    const surgery = req.body.surgery;
    if(kidney){
        checkkidney = 1;
        console.log('kidney');
    }
    if(liver){
        checkliver = 1;
        console.log('liver');
    }
    if(hypertension){
        checkhypertension = 1;
        console.log('hypertension');
    }
    if(diabetes){
        checkdiabetes = 1;
        console.log('diabetes');
    }
    if(pregnant){
        checkpregnant = 1;
        console.log('pregnant');
    }
    if(surgery){
        checksurgery = 1;
        console.log('surgery');
    }
    Order.findById(req.params.order,function(err,orders){
        Formula.findById(req.params.id, function(err,formula){
            res.redirect('/custom/'+  orders._id + "/" + formula._id + '/component');
        });
    });
});

router.get('/:order/:id/component',function(req,res){
    Order.findById(req.params.order,function(err,orders){
        Formula.findById(req.params.id, function(err,formula){
            Nutrient.findById(formula.component1,function(err,nutrient1){
                Nutrient.findById(formula.component2,function(err,nutrient2){
                    Nutrient.findById(formula.component3,function(err,nutrient3){
                        res.render('customnodisease', {
                            orders:orders._id,
                            formula:formula,
                            component1:nutrient1,
                            component2:nutrient2,
                            component3:nutrient3,
                            //orderid = orders._id
                        }); 
                    });
                });
            });
        });
    });
});

router.post('/:order/:id/component',function(req,res){    
     
    let bottle = new Bottle(); 
    bottle.orderid = req.params.order;
    bottle.formulaid = req.params.id;
    bottle.fruit1 = req.body.component1;
    bottle.fruit2 = req.body.component2;
    bottle.fruit3 = req.body.component3;
    bottle.amount = req.body.amont;
 
    console.log(req.params.order);
    console.log(req.params.id);    
    console.log(req.body.component1);
    console.log(req.body.component2);
    console.log(req.body.component3);
    console.log(req.body.amont);

    bottle.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            //console.log('add');
            req.flash('success','Added order to cart');
            res.redirect('/formulas/' + req.params.order);
        }
    });
});


module.exports = router;