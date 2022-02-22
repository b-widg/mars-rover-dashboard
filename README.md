# Mars Rover Dashboard

Explore Mars through the eyes of Curiosity, Spirit, and Opportunity!  Simple select your rover to start the journey. The you can search by earth date or sol (the number of Martian days the rover has been on the planet).  You’ll then have the option to view images based in their cameras used that day or skip this to view all images for the day.

### [https://mars-rover-picture-search.herokuapp.com/](https://mars-rover-picture-search.herokuapp.com/)
![Screenshot](./public/assets/images/ScreenShot.png)

## About
This project was created for the Udacity Intermediate JavaScript Nano Degree program.  It is intended to showcase the use of functional JavaScript and immutable data structures, as well as the consumption of data through NASAs APIs and a mobile first UI.

## Dependencies
- [Immutable](https://immutable-js.com/) <img src="https://immutable-js.com/favicon.png" alt="immutable.js logo" width=15>
- [axios](https://www.npmjs.com/package/axios) <img src="https://axios-http.com//assets/favicon.ico" alt="axios logo" width=15>
- [dotenv](https://www.npmjs.com/package/dotenv) <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" alt="dotenv logo" width=16>
- [express](https://www.npmjs.com/package/express) <img src="https://expressjs.com/images/favicon.png" alt="express logo" width=16 border-radius=50%>
- [ejs](https://ejs.co/) <img src="https://ejs.co/favicon.svg" alt="ejs logo" width=23>
- [nodemon](https://www.npmjs.com/package/nodemon) <img src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png" alt="nodemon logo" width=15>

## To Do
- Optimize background and rover images
- Lazy load and/or paginate images when large numbers are returned
- Add swipe/touch functionality to image carousel
- Add back end data validation (Chrome mobile doesn't enforce data list options for Sol)
- Fix issue with iOS mobile browser not correctly sizing images in landscape mode
