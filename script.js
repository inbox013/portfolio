// Плавное появление секций при скролле
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  });

  sections.forEach(section => {
      section.classList.add('reveal');
      observer.observe(section);
  });
});

// --- ЛОГИКА ДЛЯ ГАЛЕРЕИ СЕРТИФИКАТОВ (ЛАЙТБОКС) ---
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');

  // Открытие изображения
  galleryItems.forEach(img => {
      img.addEventListener('click', () => {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Отключаем скролл страницы
      });
  });

  // Функция закрытия
  const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Возвращаем скролл
      
      // Очищаем src после завершения анимации (300мс)
      setTimeout(() => {
          lightboxImg.src = '';
      }, 300);
  };

  // Закрытие по клику на крестик
  closeBtn.addEventListener('click', closeLightbox);

  // Закрытие по клику на темный фон (вне картинки)
  lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
          closeLightbox();
      }
  });

  // Закрытие по нажатию на клавишу Esc
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          closeLightbox();
      }
  });
});