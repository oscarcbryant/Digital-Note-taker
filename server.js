const express = require('express');
const path = require('path');
const api = require('./routes/index.js')
const db = require('./db/db');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// app.get('/api/notes', (req, res) => {
//     console.info(`GET /api/reviews`);
//     res.status(200).json(db);
// }
// );

// app.post('/api/notes', (req, res) => {
//     console.info(`${req.method} request received to add a note`);

//     const { title, text } = req.body;
//      // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newEntry = {
//       title,
//       text,
//     };

//     const response = {
//       status: 'success',
//       body: newEntry,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
