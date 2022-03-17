const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose')

const _ = require('lodash')

mongoose.connect("mongodb+srv://vasanth:vasanth12@cluster0.dnppu.mongodb.net/TodoDB?retryWrites=true")

const itemSchema = ({
  name : String
})

const Item = mongoose.model("Item", itemSchema)

const item1 = new Item({
  name : "Add Everything you Think"
})

const item2 = new Item({
  name : "Don't Forget to write anything"
})

const defaultItems = [item1, item2]

const listSchema = ({
  name : String,
  items :[itemSchema]
})

const List = mongoose.model("List", listSchema)

// const date = require( __dirname + '/date.js');

// const day3 = require( __dirname + '/date.js');

var app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs");

// var reqInps = ["Buy Food","Cook Food", "Eat Food"];

var WorkItems = [];

app.use(express.static("public"));


app.get("/", function (req,res) {

  Item.find({}, function(err, foundItems){
    if(foundItems.length == 0){
      
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        }else{
          console.log("succesfully inserted");
        }
      })    
      res.redirect("/");
    }else{
      
      res.render("lists", {listTittle : "Today", listNIt : foundItems});
    }
  }) 


    // res.send("hii")

  });

app.get("/:customListName", function (req,res) {

  const paramName = _.capitalize(req.params.customListName);

  List.findOne({name : paramName}, function(err, foundItems){
    if(!err){
      if(!foundItems){
        const list =new List({
          name : paramName,
          items : defaultItems
        }) 
          list.save();
          res.redirect("/" + paramName)
      }else{
        res.render("lists", {listTittle : paramName, listNIt : foundItems.items});
      }
    }
  })



  //  console.log(req.body.customListName)
  });


    app.post("/", function(req,res){
      // console.log(req.body);

      const reqInp = req.body.inp1;
      const customListName = req.body.list;

      const newItem = new Item({
        name : reqInp
      })

      if(customListName == "Today"){
        newItem.save();    
        res.redirect("/");
      }else{

        List.findOne({name : customListName}, function(err, foundItems){
          foundItems.items.push(newItem);
          foundItems.save();
          res.redirect("/"+ customListName)
        })

      }
    });

    
    // app.post("/:customListName", function(req,res){
    //   // console.log(req.body);

    //   const reqInp = req.body.inp1;

    //   const listTit = req.body.list;
  
    //   console.log(listTit);
  
    //   const newItem = new Item({
    //     name : reqInp
    //   });
    //   newItem.save();
    //   res.redirect("/")
      
    // })

    app.post("/delete", function(req,res){

      const checkedId = req.body.checkbox;

      const listTitle = req.body.listName;

      // console.log(req.body);

      if( listTitle == "Today"){
        Item.findByIdAndRemove(checkedId, function(err){
          if(err){
            console.log(err);
          }else{
            console.log("Deleted Succesfully");
            res.redirect("/")
          }
        })
      }else{
        List.findOneAndUpdate({name : listTitle}, {$pull: {items : {_id : checkedId}}}, function(err,  foundItems){
          if(!err){
            res.redirect("/"+listTitle)
          }
        })
      }
      
    })

   




let port = process.env.PORT;

if(port == null || port = ""){
  port = 3000
}


app.listen( port , function () {
  console.log("port running on server 3000");
})

// app.listen(process.env.PORT || 3000, function () {
  // console.log("port running on server 3000");
// })
