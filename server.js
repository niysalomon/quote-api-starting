const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT,()=>{
    console.log("backend connected!!");
}); 



// GET a random Quote.
app.get('/api/quotes/random', (req, res) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

// app.get("/api/quotes/:person",(req,res)=>{
//   const personalQuotes=quotes.find(p=>p.person=== req.params.person);
//   if(!personalQuotes){
//     res.status(4001).send(" please look for someone else's quotes");
//   }
//   else{
//     res.send(personalQuotes);
//   } 
// });


//GET all quotes or all quotes from an author.
app.get('/api/quotes', (req, res) => {
  const filterQuotes = quotes.filter(author => {
    return author.person === req.query.person;
  });
  if (req.query.person) {
    res.send({ quotes: filterQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});


//POST for adding new quotes.
app.post('/api/quotes', (req, res) => {
  const newQuote = req.query.quote;
  const newPerson = req.query.person;
  if (newQuote != '' && newPerson != '') {
    quotes.push({ quote: newQuote, person: newPerson });
    res.send({ quote: { quote: newQuote, person: newPerson } });
  } else {
    res.sendStatus(400);
  }
});

 

// app.post("/api/quotes/",(req,res)=>{
//     const newQuote = {
//     quote: req.body.quote,
//     person: req.body.person
//     };
//     if (newQuote.quote && newQuote.person) {
//     quotes.push(newQuote);
//     res.send({ quote: newQuote });
//     } else {
//     res.status(400).send("some thing goeas wrong!");
//     }
//     });

    // app.post('/api/quotes', async (req, res) => {
    //     const quote = req.body.quote;
    //     const person = req.body.person;
    //     if(quote && person) {
    //         const user = await quotes.push({quote, person})
    //         res.status(200).send(user)
    //     } else {
    //         res.Status(400).send("it fails!")
    //     }
    // })


    // app.post("/api/quotes", (req, res) => {
    //   const newQuote = {
    //   quote: req.query.quote,
    //   person: req.query.person
    //   };
    //   if (newQuote.quote && newQuote.person) {
    //   quotes.push(newQuote);
    //   res.send({ quote: newQuote });
    //   } else {
    //   res.status(400).send("failed");
    //   }
    //   });




    // app.get("/api/quotes/random",(req,res)=>{
// res.send(quotes);
// });