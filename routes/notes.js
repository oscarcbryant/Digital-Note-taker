const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

readAndAppend(newNote, './db/db.json');
res.json(`Tip added successfully 🚀`);
} else {
res.error('Error in adding tip');
}

    // Obtain existing reviews
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, null),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!!')
        );
      }
    });
});

module.exports = notes;