// ========================================
// INTERACTIVE WEB PAGE - JAVASCRIPT FUNCTIONALITY
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Interactive Web Page loaded successfully!');
    
    // Initialize all interactive features
    initializeThemeToggle();
    initializeTabNavigation();
    initializeCounter();
    initializeMouseEvents();
    initializeColorPicker();
    initializeFormValidation();
    initializeFAQ();
    
    console.log('✅ All interactive features initialized');
});

// ========================================
// THEME TOGGLE FUNCTIONALITY
// ========================================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        }
        
        console.log('Theme toggled to:', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

// ========================================
// TAB NAVIGATION FUNCTIONALITY
// ========================================
function initializeTabNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and contents
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding tab content
            const targetTab = this.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            console.log('Switched to tab:', targetTab);
        });
    });
}

// ========================================
// COUNTER FUNCTIONALITY
// ========================================
function initializeCounter() {
    const counterDisplay = document.getElementById('counter-display');
    const increaseBtn = document.getElementById('increase-btn');
    const decreaseBtn = document.getElementById('decrease-btn');
    const resetBtn = document.getElementById('reset-counter');
    
    let counter = 0;
    
    // Update counter display
    function updateDisplay() {
        counterDisplay.textContent = counter;
        
        // Add visual feedback based on counter value
        if (counter > 0) {
            counterDisplay.style.color = '#27ae60';
        } else if (counter < 0) {
            counterDisplay.style.color = '#e74c3c';
        } else {
            counterDisplay.style.color = '#3498db';
        }
    }
    
    // Increase counter
    increaseBtn.addEventListener('click', function() {
        counter++;
        updateDisplay();
        console.log('Counter increased to:', counter);
    });
    
    // Decrease counter
    decreaseBtn.addEventListener('click', function() {
        counter--;
        updateDisplay();
        console.log('Counter decreased to:', counter);
    });
    
    // Reset counter
    resetBtn.addEventListener('click', function() {
        counter = 0;
        updateDisplay();
        console.log('Counter reset to:', counter);
    });
    
    // Keyboard support for counter
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp') {
            counter++;
            updateDisplay();
        } else if (e.key === 'ArrowDown') {
            counter--;
            updateDisplay();
        } else if (e.key === 'r' || e.key === 'R') {
            counter = 0;
            updateDisplay();
        }
    });
}

// ========================================
// MOUSE EVENTS FUNCTIONALITY
// ========================================
function initializeMouseEvents() {
    const mouseArea = document.getElementById('mouse-area');
    const mouseCoords = document.getElementById('mouse-coords');
    
    if (!mouseArea || !mouseCoords) return;
    
    // Track mouse movement
    mouseArea.addEventListener('mousemove', function(e) {
        const rect = mouseArea.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        
        mouseCoords.textContent = `X: ${x}, Y: ${y}`;
    });
    
    // Mouse enter/leave effects
    mouseArea.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        console.log('Mouse entered tracking area');
    });
    
    mouseArea.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        mouseCoords.textContent = 'X: 0, Y: 0';
        console.log('Mouse left tracking area');
    });
}

// ========================================
// COLOR PICKER FUNCTIONALITY
// ========================================
function initializeColorPicker() {
    const colorPicker = document.getElementById('color-picker');
    const applyBtn = document.getElementById('apply-color');
    const colorPreview = document.getElementById('color-preview');
    
    if (!colorPicker || !applyBtn || !colorPreview) return;
    
    // Apply color on button click
    applyBtn.addEventListener('click', function() {
        const selectedColor = colorPicker.value;
        colorPreview.style.backgroundColor = selectedColor;
        colorPreview.textContent = `Color: ${selectedColor.toUpperCase()}`;
        console.log('Color applied:', selectedColor);
    });
    
    // Real-time preview on color change
    colorPicker.addEventListener('input', function() {
        const selectedColor = this.value;
        colorPreview.style.backgroundColor = selectedColor;
        colorPreview.textContent = `Preview: ${selectedColor.toUpperCase()}`;
    });
}

// ========================================
// FORM VALIDATION FUNCTIONALITY
// ========================================
function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Validation rules
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Name must be at least 2 characters and contain only letters and spaces'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
        },
        confirmPassword: {
            required: true,
            message: 'Please confirm your password'
        },
        phone: {
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        age: {
            min: 1,
            max: 120,
            message: 'Age must be between 1 and 120'
        },
        country: {
            message: 'Please select a country'
        },
        terms: {
            required: true,
            message: 'You must agree to the terms and conditions'
        }
    };
    
    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            // Validate on input/change
            field.addEventListener('input', () => validateField(field, validationRules[fieldName]));
            field.addEventListener('blur', () => validateField(field, validationRules[fieldName]));
        }
    });
    
    // Password strength indicator
    const passwordField = document.getElementById('password');
    const passwordStrength = document.getElementById('password-strength');
    
    if (passwordField && passwordStrength) {
        passwordField.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            updatePasswordStrength(passwordStrength, strength);
        });
    }
    
    // Confirm password validation
    const confirmPasswordField = document.getElementById('confirm-password');
    if (confirmPasswordField) {
        confirmPasswordField.addEventListener('input', function() {
            const password = passwordField.value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                showFieldError(this, 'Passwords do not match');
            } else {
                clearFieldError(this);
            }
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const formData = new FormData(form);
        
        // Validate all fields
        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                const isValidField = validateField(field, validationRules[fieldName]);
                if (!isValidField) {
                    isValid = false;
                }
            }
        });
        
        // Special validation for confirm password
        if (passwordField && confirmPasswordField) {
            if (passwordField.value !== confirmPasswordField.value) {
                showFieldError(confirmPasswordField, 'Passwords do not match');
                isValid = false;
            }
        }
        
        if (isValid) {
            // Simulate form submission
            showFormStatus('success', 'Form submitted successfully! Thank you for your message.');
            form.reset();
            clearAllFieldErrors();
            console.log('Form submitted successfully');
        } else {
            showFormStatus('error', 'Please fix the errors above before submitting.');
            console.log('Form validation failed');
        }
    });
}

// ========================================
// VALIDATION HELPER FUNCTIONS
// ========================================
function validateField(field, rules) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Required field validation
    if (rules.required && !value) {
        showFieldError(field, `${getFieldLabel(fieldName)} is required`);
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !rules.required) {
        clearFieldError(field);
        return true;
    }
    
    // Minimum length validation
    if (rules.minLength && value.length < rules.minLength) {
        showFieldError(field, rules.message || `${getFieldLabel(fieldName)} must be at least ${rules.minLength} characters`);
        return false;
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
        showFieldError(field, rules.message || `${getFieldLabel(fieldName)} format is invalid`);
        return false;
    }
    
    // Numeric range validation
    if (rules.min !== undefined || rules.max !== undefined) {
        const numValue = parseInt(value);
        if (isNaN(numValue)) {
            showFieldError(field, `${getFieldLabel(fieldName)} must be a number`);
            return false;
        }
        if (rules.min !== undefined && numValue < rules.min) {
            showFieldError(field, rules.message || `${getFieldLabel(fieldName)} must be at least ${rules.min}`);
            return false;
        }
        if (rules.max !== undefined && numValue > rules.max) {
            showFieldError(field, rules.message || `${getFieldLabel(fieldName)} must be at most ${rules.max}`);
            return false;
        }
    }
    
    // Clear error if validation passes
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearAllFieldErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
}

function getFieldLabel(fieldName) {
    const labels = {
        fullName: 'Full Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        phone: 'Phone Number',
        age: 'Age',
        country: 'Country',
        terms: 'Terms and Conditions'
    };
    return labels[fieldName] || fieldName;
}

function showFormStatus(type, message) {
    const statusElement = document.getElementById('form-status');
    if (statusElement) {
        statusElement.className = `form-status ${type}`;
        statusElement.textContent = message;
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }
}

// ========================================
// PASSWORD STRENGTH CALCULATOR
// ========================================
function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[@$!%*?&]/.test(password)) score += 1;
    
    if (score <= 2) return 'weak';
    if (score === 3) return 'fair';
    if (score === 4) return 'good';
    return 'strong';
}

function updatePasswordStrength(element, strength) {
    element.className = `password-strength ${strength}`;
}

// ========================================
// FAQ ACCORDION FUNCTIONALITY
// ========================================
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                console.log('FAQ item closed');
            } else {
                item.classList.add('active');
                console.log('FAQ item opened');
            }
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search shortcut triggered');
    }
    
    // Escape key to close modals/overlays
    if (e.key === 'Escape') {
        // Close any open FAQ items
        const activeFAQ = document.querySelector('.faq-item.active');
        if (activeFAQ) {
            activeFAQ.classList.remove('active');
        }
    }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
window.addEventListener('load', function() {
    console.log('🎉 Page fully loaded');
    
    // Log performance metrics
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
});

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ========================================
// EXPORT FOR TESTING (if needed)
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        calculatePasswordStrength,
        debounce
    };
}

