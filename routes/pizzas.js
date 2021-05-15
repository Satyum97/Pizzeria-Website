var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/pizza_orders');

router.get('/', function(req, res) {
    var collection = db.get('pizzas');
    collection.find({isDelete : "False"}, function(err, pizzas){
        if (err) throw err;
        console.log("pizzas : "+pizzas)
      	res.json(pizzas);
    });
});

router.post('/', function(req, res){
    var collection = db.get('pizzas');
    collection.insert({
        name : req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        available: Number(req.body.available),
        isDelete: "False",
        picture : global.pic
    }, function(err, pizza){
        if (err) throw err;

        res.json(pizza);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('pizzas');
    collection.findOne({ _id: req.params.id }, function(err, pizza){
        if (err) throw err;
      	res.json(pizza);
    });
});

router.put('/:id', function(req, res){
    
    var collection = db.get('pizzas');
  
    collection.update({
        _id: req.params.id
    },
    {
        name: req.body.name,
        description: req.body.description,
        category : req.body.category,
        available: Number(req.body.available), 
        price : Number(req.body.price),
        isDelete: "False",
        picture : global.pic
    }, function(err, pizza){
        if (err) throw err;
        res.json(pizza);
    });
});


router.delete('/:id', function(req, res){
    var collection = db.get('pizzas');
    prod={}
     collection.findOneAndUpdate(
        { _id: req.params.id},
        {$set:{isDelete:true}},
        {upsert: true}
       ,function(err, pizza){
        if (err) throw err;
        res.json(pizza);
    });

});




module.exports = router;