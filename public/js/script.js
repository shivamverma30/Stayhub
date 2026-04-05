
(() => {
  'use strict'

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/
  const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
  const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/

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

  const authForms = document.querySelectorAll('[data-auth-form]')

  const setFieldError = (form, fieldName, message) => {
    const input = form.querySelector(`[name="${fieldName}"]`)
    const feedback = form.querySelector(`[data-error-for="${fieldName}"]`)
    if (!input) return

    if (message) {
      input.classList.add('is-invalid')
      input.classList.remove('is-valid')
      input.setCustomValidity(message)
      if (feedback) feedback.textContent = message
      return
    }

    input.classList.remove('is-invalid')
    input.classList.add('is-valid')
    input.setCustomValidity('')
    if (feedback) feedback.textContent = ''
  }

  const validateSignupForm = form => {
    const username = form.querySelector('[name="username"]')
    const email = form.querySelector('[name="email"]')
    const password = form.querySelector('[name="password"]')
    const confirmPassword = form.querySelector('[name="confirmPassword"]')
    const mobile = form.querySelector('[name="mobile"]')

    const usernameValue = username ? username.value.trim() : ''
    const emailValue = email ? email.value.trim() : ''
    const passwordValue = password ? password.value : ''
    const confirmPasswordValue = confirmPassword ? confirmPassword.value : ''
    const mobileValue = mobile ? mobile.value.trim() : ''

    setFieldError(form, 'username', usernameValue.length >= 3 ? '' : 'Username must be at least 3 characters long.')

    let emailError = ''
    if (!emailValue) {
      emailError = 'Email is required.'
    } else if (!EMAIL_REGEX.test(emailValue) || /\s/.test(emailValue)) {
      emailError = 'Please enter a valid email address.'
    }
    setFieldError(form, 'email', emailError)

    let passwordError = ''
    if (!passwordValue) {
      passwordError = 'Password is required.'
    } else if (!STRONG_PASSWORD_REGEX.test(passwordValue)) {
      passwordError = 'Password must contain uppercase, lowercase, number and special character.'
    }
    setFieldError(form, 'password', passwordError)

    let confirmPasswordError = ''
    if (!confirmPasswordValue) {
      confirmPasswordError = 'Please confirm your password.'
    } else if (confirmPasswordValue !== passwordValue) {
      confirmPasswordError = 'Confirm password must match password.'
    }
    setFieldError(form, 'confirmPassword', confirmPasswordError)

    if (mobile) {
      let mobileError = ''
      if (mobileValue && !INDIAN_MOBILE_REGEX.test(mobileValue)) {
        mobileError = 'Mobile number must be a valid 10-digit Indian number starting with 6, 7, 8, or 9.'
      }
      setFieldError(form, 'mobile', mobileError)
    }

    return !usernameValue || !!emailError || !!passwordError || !!confirmPasswordError
  }

  const validateLoginForm = form => {
    const username = form.querySelector('[name="username"]')
    const password = form.querySelector('[name="password"]')

    const usernameValue = username ? username.value.trim() : ''
    const passwordValue = password ? password.value : ''

    const usernameError = usernameValue ? '' : 'Username is required.'
    const passwordError = passwordValue ? '' : 'Password is required.'

    setFieldError(form, 'username', usernameError)
    setFieldError(form, 'password', passwordError)

    return !!usernameError || !!passwordError
  }

  authForms.forEach(form => {
    const mode = form.getAttribute('data-auth-form')
    const submitButton = form.querySelector('button[type="submit"]')

    const runValidation = () => {
      const hasErrors = mode === 'signup' ? validateSignupForm(form) : validateLoginForm(form)
      if (submitButton) {
        submitButton.disabled = hasErrors
      }
      return hasErrors
    }

    form.addEventListener('input', runValidation)

    form.addEventListener('submit', event => {
      if (runValidation()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    })

    runValidation()
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