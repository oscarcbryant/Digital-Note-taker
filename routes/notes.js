const router = require('express').Router();
const { request } = require('.');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


router.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
      id: uuid(),
    };

readAndAppend(newNote, './db/db.json');
res.json(`Note added successfully 🚀`);
} else {
res.error('Error in adding note');
}

});

router.delete('/:id', async (req, res) => {
  console.info(`${req.method} request received for notes`);
  console.log(req.params.id);
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data).filter((note) => note.id !== req.params.id))
    .then(arr => writeToFile('./db/db.json', arr))
});

module.exports = router;