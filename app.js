require('dotenv').config();
const express = require('express');
const path = require('path');
const { fetchPics, fetchManifest } = require('./controllers/fetchController');
const { Map, List, fromJS, isImmutable, getIn } = require('immutable');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

let store = fromJS({
  rovers: [
    {
      name: 'Curiosity',
    },
    { name: 'Spirit' },
    {
      name: 'Opportunity',
    },
  ],
});

const verifyParams = (param) => {
  const rovers = store.get('rovers');
  const index = rovers.findIndex((rover) => rover.get('name') === param);
  return index;
};

// app.use('/:rover', async (req, res, next) => {
//   if (verifyParams(req.params.rover) === -1) {
//     res.render('404');
//     res.status(404).send('Not found.');
//   }
//   next();
// });

// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// app.use('/:rover/*', async (req, res, next) => {
//   res.render('404');
//   res.status(404).send('Not found.');
//   next();
// });

app.get('/', async (req, res) => {
  const manifestZero = await fetchManifest(store.getIn(['rovers', 0, 'name']));
  // console.log('file: app.js | line 52 | manifestZero', manifestZero);
  const manifestOne = await fetchManifest(store.getIn(['rovers', 1, 'name']));
  const manifestTwo = await fetchManifest(store.getIn(['rovers', 2, 'name']));
  Promise.all([
    manifestZero.photo_manifest,
    manifestOne.photo_manifest,
    manifestTwo.photo_manifest,
  ]).then((manifests) => {
    manifests = fromJS([manifests]);
    // console.log('file: app.js | line 60 | manifests', manifests);
    res.render('index', { rovers: manifests });
  });
});

// :rover = name of rover
// rover-card partial needs to be passed an array of manifest objects.
app.get('/:rover', async (req, res) => {
  const roverName = req.params.rover;
  const queryString = req._parsedOriginalUrl.search;
  const picData = await fetchPics(roverName, queryString);
  const picArray = picData.photos;
  // console.log('picArray.length:', picArray.length);
  let manifest = await fetchManifest(roverName);
  manifest = [manifest.photo_manifest];
  // console.log('manifest:', manifest);
  const singleRover = fromJS([manifest]);
  res.render('results-page', { rovers: singleRover, picArray: picArray });
});

app.all((req, res, next) => {
  res.render('404');
  res.status(404).send('Not found.');
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
