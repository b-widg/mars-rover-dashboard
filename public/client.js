// show/hide table manifest table on right

const showHideBtn = document.querySelector('.show-hide-btn');
const closeTableX = document.querySelector('.close-manifest');
const tableArea = document.querySelector('.table-area');

const hideTable = () => {
  tableArea.classList.remove('table-area-show');
  tableArea.classList.add('table-area-hide');
};

const showTable = () => {
  tableArea.classList.remove('table-area-hide');
  tableArea.classList.add('table-area-show');
};

closeTableX.addEventListener('click', hideTable);

showHideBtn.addEventListener('click', () => {
  if (
    tableArea.classList.contains('table-area-hide') ||
    !tableArea.classList.contains('table-area-show')
  ) {
    showTable();
  } else {
    hideTable();
  }
});

//  show/hide modal on click

const roverImgs = document.querySelectorAll('.rover-img');
const captions = document.querySelectorAll('.caption');
const modalCloseXs = document.querySelectorAll('.modal-close-x');

roverImgs.forEach((roverImg) => {
  roverImg.addEventListener('click', (event) => {
    const modal = roverImg.parentElement.nextElementSibling;
    modal.classList.add('modal-show');
  });
});

captions.forEach((caption) => {
  caption.addEventListener('click', (event) => {
    const modal = caption.parentElement.nextElementSibling;
    modal.classList.add('modal-show');
  });
});

modalCloseXs.forEach((modalCloseX) => {
  modalCloseX.addEventListener('click', (event) => {
    const modal = modalCloseX.parentElement;
    modal.classList.remove('modal-show');
  });
});
