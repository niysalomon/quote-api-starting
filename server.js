const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT,()=>{
    console.log("backend wll connected!!");
}); 

app.get("/api/quotes/random",(req,res)=>{
res.send(quotes);
});
app.get("/api/quotes/:person",(req,res)=>{
  const personalQuotes=quotes.find(p=>p.person=== req.params.person);
  if(!personalQuotes){
    res.status(4004).send(" please look for someone else's quotes");
  }
  else{
    res.send(personalQuotes);
  } 
});
app.post("/api/quotes/",(req,res)=>{
    const NewQuote = {
        quote:req.body.Quote,
        person: req.body.person
    }
    quotes.push(NewQuote); 
    res.send(NewQuote);

});

