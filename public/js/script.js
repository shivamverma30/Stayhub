
(() => {
  'use strict'

  const root = document.documentElement
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark')
  }

  const themeToggle = document.getElementById('themeToggle')
  const setThemeIcon = () => {
    if (!themeToggle) return
    const icon = themeToggle.querySelector('i')
    if (!icon) return
    icon.className = root.getAttribute('data-theme') === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
  }

  setThemeIcon()

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark'
      if (isDark) {
        root.removeAttribute('data-theme')
        localStorage.setItem('theme', 'light')
      } else {
        root.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
      }
      setThemeIcon()
    })
  }

  // Trigger page-entry animation class once DOM is ready.
  document.body.classList.add('page-is-ready')

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

  const revealItems = document.querySelectorAll('.reveal')
  if (revealItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    revealItems.forEach(item => observer.observe(item))
  }

  const skeletonWrap = document.getElementById('listingSkeletons')
  const listingsContent = document.getElementById('listingsContent')
  if (skeletonWrap && listingsContent) {
    listingsContent.classList.add('is-hidden')
    setTimeout(() => {
      skeletonWrap.classList.add('is-hidden')
      listingsContent.classList.remove('is-hidden')
      listingsContent.classList.add('is-visible')
    }, 350)
  }

  const lightbox = document.getElementById('imageLightbox')
  const preview = document.getElementById('lightboxPreview')
  if (lightbox && preview) {
    document.querySelectorAll('[data-lightbox-src]').forEach(item => {
      item.addEventListener('click', () => {
        const nextSrc = item.getAttribute('data-lightbox-src')
        if (nextSrc) preview.src = nextSrc
      })
    })
  }
})()