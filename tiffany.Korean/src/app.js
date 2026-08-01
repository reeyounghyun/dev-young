document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.getElementById("navbar");
  const logo = document.getElementById("logo");
  const mainBanner = document.querySelector(".main-banner");

  if (!navbar || !logo) {
    // Navbar 또는 logo 요소가 없을 때의 처리.
    return;
  }

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
      logo.classList.add('hidden');
    } else {
      navbar.classList.remove('scrolled');
      logo.classList.remove('hidden');
    }
    syncBannerOffset();
  }

  // 고정 헤더의 실제 높이만큼 배너 상단 여백을 맞춰서 겹침을 방지
  function syncBannerOffset() {
    if (!mainBanner) return;
    mainBanner.style.marginTop = navbar.offsetHeight + 'px';
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", syncBannerOffset);
  handleScroll(); // 페이지 로드 시 초기화
});

// handleScroll end

const productSwiper = new Swiper(".productSlider", {
  loop: true,
  // 768px 미만: 한 화면에 두 상품을 균등하게 표시
  slidesPerView: 2,
  spaceBetween: 12,
  centeredSlides: false,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".productSlider .swiper-pagination", // HTML 구조와 일치해야 함
    type: "progressbar",
  },
  
  navigation: {
    nextEl: ".productSlider-next",
    prevEl: ".productSlider-prev",
  },

  breakpoints: {
    // 768px 이상일 때
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: false, // PC에서는 왼쪽 정렬이 깔끔함
    },
    // 1200px 이상일 때
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
      centeredSlides: false,
    },
  },
});

const topBannerMediaQuery = window.matchMedia('(min-width: 1024px)');
let topSwiper;

function syncTopSwiper() {
  if (topBannerMediaQuery.matches && !topSwiper) {
    topSwiper = new Swiper('.topBanner', {
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      speed: 2000,
      allowTouchMove: true,
      grabCursor: true,
    });
  }

  if (!topBannerMediaQuery.matches && topSwiper) {
    topSwiper.destroy(true, true);
    topSwiper = undefined;
  }
}

topBannerMediaQuery.addEventListener('change', syncTopSwiper);
syncTopSwiper();
