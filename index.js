var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todoListDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema = {
    name:String
}
const Item = mongoose.model("Item",itemSchema);

app.get("/", function(req,res){
	Item.find({},function(err,i)
   {
      res.render("list",{newTodoItem:i});
    }) ;
})

// ADD ITEM
app.post("/", function(req,res){
	const todo = req.body.todoitem;
  if(todo==="")
    res.redirect("/");
  else{
  	const item = new Item({
  		name:todo
  	});
  	item.save();
  	res.redirect("/");
  }
})

// DELETE ITEM
app.post("/delete",function(req,res)
{
  const check=req.body.checkbox;
  Item.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  })
});

app.get("*", (req,res)=>{
	res.send("where are you roaming?");
});

app.listen(3000, function(){
	console.log("listening to port 3000");
})