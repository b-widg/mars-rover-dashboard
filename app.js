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

app.get('/', async (req, res) => {
  const manifestZero = await fetchManifest(store.getIn(['rovers', 0, 'name']));
  const manifestOne = await fetchManifest(store.getIn(['rovers', 1, 'name']));
  const manifestTwo = await fetchManifest(store.getIn(['rovers', 2, 'name']));
  Promise.all([
    manifestZero.photo_manifest,
    manifestOne.photo_manifest,
    manifestTwo.photo_manifest,
  ]).then((manifests) => {
    manifests = fromJS([manifests]);
    res.render('index', { rovers: manifests });
  });
});

// :rover = name of rover
// rover-card partial needs to be passed an array of manifest objects.
app.get('/:rover', async (req, res, next) => {
  const roverName = req.params.rover;
  const queryString = req._parsedOriginalUrl.search;
  const picData = await fetchPics(roverName, queryString);
  // if invalid rover name id provided the api retutns { errors: 'Invalid Rover Name' }
  if (picData.errors === 'Invalid Rover Name') {
    res.render('404');
  } else {
    const picArray = picData.photos;
    let manifest = await fetchManifest(roverName);
    manifest = [manifest.photo_manifest];
    const singleRover = fromJS([manifest]);
    res.render('results-page', { rovers: singleRover, picArray: picArray });
  }
});

app.get('*', (req, res) => {
  res.render('404');
});

app.all((req, res, next) => {
  res.render('404');
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
