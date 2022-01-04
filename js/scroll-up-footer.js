const footer = document.querySelector('footer');

let lastScrollTop = 0;
let scrollVector = 0;

window.addEventListener('scroll', () => {
  let delta = window.scrollY - lastScrollTop;

  if (delta > 0 && scrollVector > 0 || delta < 0 && scrollVector < 0) {
    scrollVector += delta;
  } else {
    scrollVector = delta;
  }

  if (scrollVector >= 80 && !footer.classList.contains('hide')) {
    footer.classList.add('hide');
    footer.classList.remove('active');
  } else if (scrollVector <= -80 && !footer.classList.contains('active')) {
    footer.classList.remove('hide');
    footer.classList.add('active');
  }

  lastScrollTop = document.documentElement.scrollTop;
});
