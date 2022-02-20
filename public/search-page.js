const { List, Map, fromJS } = Immutable;

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

if (closeTableX) {
  closeTableX.addEventListener('click', hideTable);
}

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

// Show/hide modal when image clicked. Listening on image and caption
const modal = document.querySelector('.modal');
const arrowBack = document.querySelector('.arrow-back');
const arrowForward = document.querySelector('.arrow-forward');
const roverImgs = List(document.querySelectorAll('.rover-img'));
const captions = List(document.querySelectorAll('.caption'));
const modalCloseXs = List(document.querySelectorAll('.modal-close-x'));
const carouselContents = List(document.querySelectorAll('.carousel-content'));

const showElement = (element) => {
  element.classList.remove('display-none');
};

const hideElement = (element) => {
  element.classList.add('display-none');
};

const showCarouselContent = (index) => {
  const targetCarouselContent = carouselContents.get(index - 1);
  targetCarouselContent.classList.remove('display-none');
};

// Finds current .carousel-content element by finding the one without the display-none class
const getCurrentCarouselContent = () => {
  const currentCarouselContent = carouselContents.find((carouselContent) => {
    return !carouselContent.classList.contains('display-none');
  });
  return currentCarouselContent;
};

// Add event listener to each image to open it in modal if clicked
roverImgs.forEach((roverImg) => {
  roverImg.addEventListener('click', (event) => {
    modal.classList.remove('display-none');
    modal.classList.add('modal-show');
    const imgIndex = event.target.getAttribute('data-image-index');
    showCarouselContent(imgIndex);
  });
});

captions.forEach((caption) => {
  caption.addEventListener('click', (event) => {
    modal.classList.remove('display-none');
    modal.classList.add('modal-show');
    const imgIndex =
      event.target.parentElement.previousElementSibling.getAttribute(
        'data-image-index'
      );
    showCarouselContent(imgIndex);
  });
});

modalCloseXs.forEach((modalCloseX) => {
  modalCloseX.addEventListener('click', (event) => {
    modal.classList.remove('modal-show');
    modal.classList.add('display-none');
    const currentCarouselContent = getCurrentCarouselContent();
    currentCarouselContent.classList.add('display-none');
  });
});

arrowBack.addEventListener('click', (event) => {
  let previousCarouselContent = {};
  const currentCarouselContent = getCurrentCarouselContent();
  currentCarouselContent.previousElementSibling.classList.contains(
    'carousel-content'
  )
    ? (previousCarouselContent = currentCarouselContent.previousElementSibling)
    : (previousCarouselContent = carouselContents.last());
  hideElement(currentCarouselContent);
  showElement(previousCarouselContent);
});

arrowForward.addEventListener('click', (event) => {
  let nextCarouselContent = {};
  const currentCarouselContent = getCurrentCarouselContent();
  currentCarouselContent.nextElementSibling
    ? (nextCarouselContent = currentCarouselContent.nextElementSibling)
    : (nextCarouselContent = carouselContents.first());
  hideElement(currentCarouselContent);
  showElement(nextCarouselContent);
});
