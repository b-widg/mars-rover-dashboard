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
