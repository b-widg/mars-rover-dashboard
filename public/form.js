// Create array from manifest data in body of manifest table
// to use in data validation and form options for user
// starting by making an array of the table rows
const tableRows = Array.from(
  document.querySelectorAll('.manifest-table > tbody > tr')
);
// creating new array where every table row is converted to
// an array of table data elements.  then mapping to convert
// each element to it's innerHTML value.  index 3 is converted
// from a comma delemited string to an array of cameras
const manifestData = tableRows.map((row) => {
  row = Array.from(row.children);
  return row.map((cell, i) => {
    return i === 3
      ? (cell = row[3].innerHTML.split(','))
      : (cell = cell.innerHTML);
  });
});

// manifestData[i]) = table row = [Sol, Earth-Date, Total-Photos, [Array-Of-Cameras]]
// manifestData[i][0]) = Sol
// manifestData[i][1]) = Earth Date
// manifestData[i][2]) = Total Photos
// manifestData[i][3]) = [Array of Camera Options]

// creates a datalist option with the supplied value and appends it to the element supplied
const createDatalist = (elementId, cellValue) => {
  let optionNode = document.createElement('option');
  optionNode.setAttribute('value', cellValue);
  document.querySelector(elementId).appendChild(optionNode);
};

// create datalist of option elements for Sols and Earth Dates.
const createDateOptions = () => {
  manifestData.forEach((row) => {
    createDatalist('#sol-options', row[0]);
    createDatalist('#earth-date-options', row[1]);
  });
};

// row = [Sol, Earth-Date, Total-Photos, [Array-Of-Cameras]]
// Allow user to search by sol or earth date, but look up
// and auto complete the other as they should not be in conflict
const filterEvent = (event) => {
  earthDate = earthDateField.value;
  sol = solField.value;

  if (event.target.id === 'sol') {
    const row = manifestData.filter((row) => {
      return sol === row[0];
    });
    earthDateField.value = row[0][1];
    cameraOptions = row[0][3];
    createCameraOptions(cameraOptions);
  }

  if (event.target.id === 'earth-date') {
    const row = manifestData.filter((row) => {
      return earthDate === row[1];
    });
    solField.value = row[0][0];
    cameraOptions = row[0][3];
    createCameraOptions(cameraOptions);
  }
};

const createCameraOptions = (cameraOptions) => {
  const cameraOptionsDiv = document.querySelector('#camera-options');
  let radioLabel = document.createElement('p');
  radioLabel.innerHTML = 'Choose a Camera (Optional):';

  // need to remove any esisting radio buttons before creating
  // new ones tp prevent duplicates
  while (cameraOptionsDiv.firstChild) {
    cameraOptionsDiv.removeChild(cameraOptionsDiv.lastChild);
  }

  cameraOptionsDiv.appendChild(radioLabel);

  cameraOptions.forEach((camera) => {
    let radioBtn = document.createElement('input');
    radioBtn.setAttribute('type', 'radio');
    radioBtn.setAttribute('id', camera);
    radioBtn.setAttribute('name', 'camera');
    radioBtn.setAttribute('value', camera);

    let btnLabel = document.createElement('label');
    btnLabel.setAttribute('for', camera);
    btnLabel.innerHTML = camera;

    let br = document.createElement('br');

    cameraOptionsDiv.style.display = 'block';
    cameraOptionsDiv.appendChild(radioBtn);
    cameraOptionsDiv.appendChild(btnLabel);
    cameraOptionsDiv.appendChild(br);
  });
};

// set original camera options to first date available which is set as default value
// for sol and earth-date when form loads
//createCameraOptions(manifestData[0][3]);

const solField = document.querySelector('#sol');
const earthDateField = document.querySelector('#earth-date');

earthDateField.addEventListener('change', filterEvent);

solField.addEventListener('change', filterEvent);

// Call create cameraOptions passing the last SOL to get display camera
// options for the most renent date which is the default date on the form.
createCameraOptions(manifestData[manifestData.length - 1][3]);
