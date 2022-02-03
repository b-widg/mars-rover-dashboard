require('dotenv').config();
const fetch = require('node-fetch');

/**
 * See https://api.nasa.gov/ for api query examples *
 */

exports.fetchManifest = async (roverName) => {
  try {
    let manifest = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    return manifest;
  } catch (err) {
    console.log('fetchController manifest err:', err);
  }
};

exports.fetchPics = async (roverName, queryString) => {
  // console.log('fetchControler_fetchPics_queryString:', queryString);

  if (queryString == null) {
    roverName === 'Curiosity'
      ? (queryString = '?sol=3089')
      : roverName === 'Spirit'
      ? (queryString = '?sol=2190')
      : (queryString = '?sol=5104');
  }
  queryString += '&page=1';
  try {
    let imageData = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos${queryString}&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    return imageData;
  } catch (err) {
    console.log('fetchController imageData err:', err);
  }
};

/************************* Example of data in photos array returned by image search **************/
//
//{
//  photos: [
//    {
//      id: 62294,
//      sol: 0,
//      camera: {
//        id: 25,
//        name: 'MARDI',
//        rover_id: 5,
//        full_name: 'Mars Descent Imager'
//      },
//      img_src: 'http://mars.jpl.nasa.gov/msl-raw-images/msss/00000/mrdi/0000MD9999001410E1_DXXX.jpg',
//      earth_date: '2012-08-06',
//      rover: {
//        name: 'Curiosity',
//        landing_date: '2012-08-06',
//        launch_date: '2011-11-26',
//        status: 'active'
//      },
//    },
//   ]
//  }
/***********************************************************************/
