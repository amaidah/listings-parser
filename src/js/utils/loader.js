const $loaderWrap = document.querySelector('.loader-wrap');

const showLoader = () => {
  $loaderWrap.style.zIndex = 5;
  $loaderWrap.style.opacity = 1;
}

const hideLoader = () => {
  $loaderWrap.style.zIndex = 0;
  $loaderWrap.style.opacity = 0;
}

export { showLoader, hideLoader };
