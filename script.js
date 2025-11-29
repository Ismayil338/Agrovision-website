const defaultConfig = {
  site_title: "Agrovision",
  tagline: "Future of Farming",
  hero_description: "Revolutionize your agricultural practices with cutting-edge AI technology. Monitor, analyze, and optimize your crops like never before.",
  cta_button: "Start Free Trial",
  contact_email: "hello@agrovision.io",
  contact_phone: "+1 (888) 555-FARM",
  background_color: "#f9fafb",
  surface_color: "#ffffff",
  text_color: "#111827",
  primary_action_color: "#22c55e",
  secondary_action_color: "#f97316",
  font_family: "Poppins",
  font_size: 16
};

async function onConfigChange(config) {
  const customFont = config.font_family || defaultConfig.font_family;
  const baseSize = config.font_size || defaultConfig.font_size;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  
  document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
  document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
  
  const navTitle = document.getElementById('nav-title');
  if (navTitle) navTitle.textContent = config.site_title || defaultConfig.site_title;
  
  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) {
    const taglineText = config.tagline || defaultConfig.tagline;
    heroTagline.innerHTML = `${taglineText.split(' ')[0]} <span class="gradient-text">${taglineText.split(' ').slice(1).join(' ')}</span>`;
    heroTagline.style.fontSize = `${baseSize * 3}px`;
    heroTagline.style.fontFamily = `${customFont}, ${baseFontStack}`;
  }
  
  const heroDescription = document.getElementById('hero-description');
  if (heroDescription) {
    heroDescription.textContent = config.hero_description || defaultConfig.hero_description;
    heroDescription.style.fontSize = `${baseSize * 1.25}px`;
  }
  
  const ctaButton = document.getElementById('cta-button');
  if (ctaButton) {
    ctaButton.textContent = config.cta_button || defaultConfig.cta_button;
    ctaButton.style.fontSize = `${baseSize * 1.125}px`;
  }
  
  const contactEmailDisplay = document.getElementById('contact-email-display');
  if (contactEmailDisplay) contactEmailDisplay.textContent = config.contact_email || defaultConfig.contact_email;
  
  const contactPhoneDisplay = document.getElementById('contact-phone-display');
  if (contactPhoneDisplay) contactPhoneDisplay.textContent = config.contact_phone || defaultConfig.contact_phone;
  
  const textColor = config.text_color || defaultConfig.text_color;
  const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;
  const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;
  const surfaceColor = config.surface_color || defaultConfig.surface_color;
  const bgColor = config.background_color || defaultConfig.background_color;
  
  document.querySelectorAll('.bg-gray-50').forEach(el => {
    el.style.backgroundColor = bgColor;
  });
  
  document.querySelectorAll('.bg-white').forEach(el => {
    el.style.backgroundColor = surfaceColor;
  });
  
  document.querySelectorAll('.text-gray-900, .text-gray-800, .text-gray-700').forEach(el => {
    el.style.color = textColor;
  });
  
  document.querySelectorAll('h1, h2, h3').forEach(el => {
    el.style.fontFamily = `${customFont}, ${baseFontStack}`;
    if (el.tagName === 'H1') el.style.fontSize = `${baseSize * 2.5}px`;
    if (el.tagName === 'H2') el.style.fontSize = `${baseSize * 2}px`;
    if (el.tagName === 'H3') el.style.fontSize = `${baseSize * 1.5}px`;
  });
  
  document.querySelectorAll('p, label, button, a, input, textarea').forEach(el => {
    el.style.fontSize = `${baseSize}px`;
  });
}

function navigateTo(page, event) {
  event.preventDefault();
  
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`${page}-page`).classList.add('active');
  
  document.querySelectorAll('.sidebar-dot').forEach(dot => dot.classList.remove('active'));
  const dots = document.querySelectorAll('.sidebar-dot');
  const pages = ['home', 'features', 'analyze', 'dashboard', 'gallery', 'contact', 'login'];
  const index = pages.indexOf(page);
  if (index >= 0 && dots[index]) {
    dots[index].classList.add('active');
  }
  
  window.location.hash = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  if (tab === 'login') {
    loginTab.classList.add('bg-white', 'shadow-sm', 'text-green-600');
    loginTab.classList.remove('text-gray-600');
    signupTab.classList.remove('bg-white', 'shadow-sm', 'text-green-600');
    signupTab.classList.add('text-gray-600');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  } else {
    signupTab.classList.add('bg-white', 'shadow-sm', 'text-green-600');
    signupTab.classList.remove('text-gray-600');
    loginTab.classList.remove('bg-white', 'shadow-sm', 'text-green-600');
    loginTab.classList.add('text-gray-600');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
}

function handleLogin(event) {
  event.preventDefault();
  const successDiv = document.getElementById('auth-success');
  successDiv.classList.remove('hidden');
  setTimeout(() => {
    navigateTo('home', event);
    successDiv.classList.add('hidden');
    document.getElementById('login-form').reset();
  }, 2000);
}

function handleSignup(event) {
  event.preventDefault();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  
  const successDiv = document.getElementById('auth-success');
  
  if (password !== confirm) {
    successDiv.textContent = '✗ Passwords do not match!';
    successDiv.classList.remove('bg-green-100', 'text-green-700');
    successDiv.classList.add('bg-red-100', 'text-red-700');
    successDiv.classList.remove('hidden');
    setTimeout(() => {
      successDiv.classList.add('hidden');
      successDiv.classList.remove('bg-red-100', 'text-red-700');
      successDiv.classList.add('bg-green-100', 'text-green-700');
      successDiv.textContent = '✓ Success! Redirecting to dashboard...';
    }, 2500);
    return;
  }
  
  successDiv.classList.remove('hidden');
  setTimeout(() => {
    navigateTo('home', event);
    successDiv.classList.add('hidden');
    document.getElementById('signup-form').reset();
  }, 2000);
}

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const uploadPrompt = document.getElementById('upload-prompt');
const previewSection = document.getElementById('preview-section');
const imagePreview = document.getElementById('image-preview');
const resultsSection = document.getElementById('results-section');

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('drag-active');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('drag-active');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('drag-active');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    displayImage(file);
  }
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    displayImage(file);
  }
});

function displayImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.src = e.target.result;
    uploadPrompt.classList.add('hidden');
    previewSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
  };
  reader.readAsDataURL(file);
}

function resetUpload() {
  fileInput.value = '';
  uploadPrompt.classList.remove('hidden');
  previewSection.classList.add('hidden');
  resultsSection.classList.add('hidden');
}

function analyzeImage() {
  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function handleContactSubmit(event) {
  event.preventDefault();
  const successDiv = document.getElementById('contact-success');
  successDiv.classList.remove('hidden');
  setTimeout(() => {
    successDiv.classList.add('hidden');
    document.getElementById('contact-form').reset();
  }, 4000);
}

// Dark Mode Functions
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('dark-mode-icon');
  const isDark = document.body.classList.contains('dark-mode');
  icon.textContent = isDark ? '☀️' : '🌙';
  
  // Save preference
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

// Load dark mode preference
function loadDarkModePreference() {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = document.getElementById('dark-mode-icon');
    if (icon) icon.textContent = '☀️';
  }
}

// Load preference on page load
loadDarkModePreference();

if (window.location.hash) {
  const page = window.location.hash.substring(1);
  const pageElement = document.getElementById(`${page}-page`);
  if (pageElement) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    pageElement.classList.add('active');
    
    const pages = ['home', 'features', 'analyze', 'dashboard', 'gallery', 'contact', 'login'];
    const index = pages.indexOf(page);
    if (index >= 0) {
      document.querySelectorAll('.sidebar-dot').forEach(dot => dot.classList.remove('active'));
      const dots = document.querySelectorAll('.sidebar-dot');
      if (dots[index]) dots[index].classList.add('active');
    }
  }
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: (config) => ({
      recolorables: [
        {
          get: () => config.background_color || defaultConfig.background_color,
          set: (value) => {
            config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        },
        {
          get: () => config.surface_color || defaultConfig.surface_color,
          set: (value) => {
            config.surface_color = value;
            window.elementSdk.setConfig({ surface_color: value });
          }
        },
        {
          get: () => config.text_color || defaultConfig.text_color,
          set: (value) => {
            config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        },
        {
          get: () => config.primary_action_color || defaultConfig.primary_action_color,
          set: (value) => {
            config.primary_action_color = value;
            window.elementSdk.setConfig({ primary_action_color: value });
          }
        },
        {
          get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
          set: (value) => {
            config.secondary_action_color = value;
            window.elementSdk.setConfig({ secondary_action_color: value });
          }
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (value) => {
          config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (value) => {
          config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ["site_title", config.site_title || defaultConfig.site_title],
      ["tagline", config.tagline || defaultConfig.tagline],
      ["hero_description", config.hero_description || defaultConfig.hero_description],
      ["cta_button", config.cta_button || defaultConfig.cta_button],
      ["contact_email", config.contact_email || defaultConfig.contact_email],
      ["contact_phone", config.contact_phone || defaultConfig.contact_phone]
    ])
  });
}

