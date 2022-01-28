const cameras = [
  ['FHAZ', 'Front Hazard Avoidance Camera'],
  ['RHAZ', 'Rear Hazard Avoidance Camera'],
  ['MAST', 'Mast Camera'],
  ['CHEMCAM', 'Chemistry and Camera Complex'],
  ['MAHLI', 'Mars Hand Lens Imager'],
  ['MARDI', 'Mars Descent Imager'],
  ['NAVCAM', 'Navigation Camera'],
  ['PANCAM', 'Panoramic Camera'],
  ['MINITES', 'Miniature Thermal Emission Spectrometer (Mini-TES)'],
];

const getCameraName = (cameraAbbreviation) => {
  const camera = cameras.find((camera) => camera[0] === cameraAbbreviation);
  return camera ? camera[1] : 'Unknown Camera Name';
};

export default getCameraName;
