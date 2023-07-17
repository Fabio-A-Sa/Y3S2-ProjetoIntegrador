const express = require('express');
const fs = require('fs');
const mqtt = require('mqtt');
const client = mqtt.connect('tcp://192.168.0.101:1883');

const app = express();

app.use(express.json());

const hostname = 'localhost';
const port = 5000;

//subscribe to topics from mosquitto
client.on('connect',()=>{
  client.subscribe('sadasdei/state/+', (err)=>{
    if(!err){
      console.log('successfully subscribed to mqtt topics');
    }
  })
});


/**
 * get messages from mosquito and updates each table state
 */
client.on('message', function(topic, message){
    let mac = topic.split("/")[2];
    for(let i=0;i<tables.length;i++){
      console.log(tables[i].mac);
      if(tables[i].mac == mac){
        tables[i].state = parseInt(message);
        break;
      }
    }
    console.log('mac: ' + mac +' new state: ' + message);
});

/**
 * display the webpage without the interactions' buttons
 */
app.get('/', (req, res) => {
  fs.readFile('../dashboard/index.html', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      data = data.toString().replace(/<button.*?<\/button>/g, '');
      res.status(200).send(data);
    }
  });
});

// Getting the content from index.html, css file and js files to another port
app.use(express.static('../dashboard'));
app.use(express.static('css'));
app.use(express.static('js'));

app.use(function(req, res, next) {
  const allowedOrigins = ['http://localhost:5500', 'http://localhost:5000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// table set constructor (Initial State) -> this has to be a json file
// each table will need to have a relation between table and macAddress
let tables = JSON.parse(fs.readFileSync('tables.json', 'utf8'));


// POST Methods
/**
 * Method to add a table
 */
app.post('/table', (req, res, next) => { 
  const courses = req.body.courses
  const attendant = req.body.attendant
  const mac = req.body.mac
  const location = req.body.location
  tables.push({id: tables.length, courses: courses, state: -1, mac: mac, attendant: attendant, location: location})
  fs.writeFileSync('tables.json', JSON.stringify(tables));
  console.log(tables)
  res.status(200).end()
})

/**
 * Method to remove a table, it removes the last one
 */
app.post('/delete', (req, res, next) => {
  tables.pop()
  fs.writeFileSync('tables.json', JSON.stringify(tables));
  console.log(tables)
  res.status(200).end()
})


// GET Methods
/**
 * returns all the tables, needed to draw the table set
 */
app.get('/get', (req, res, next) => {
  res.json(tables)
}) 


/**
 * deals with errors
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// server listening on port -> port
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
