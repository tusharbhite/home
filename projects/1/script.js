// script.js

// --- Global Data Storage (Simulated Database) ---
// These will be populated from static JSON (conceptually) or localStorage
let appSettings = {};
let users = [];
let coupons = [];

// --- Internationalization (i18n) ---
// Define translations object here or ensure languages.js is loaded BEFORE script.js
// For simplicity, including it directly in script.js for this example.
const translations = {
    en: {
        // Login Screen
        login_title: "Shopkeeper Login",
        username_label: "Username",
        password_label: "Password",
        login_btn: "Login",
        forgot_password_btn: "Forgot Password?",
        login_invalid_credentials: "Invalid username or password.",
        forgot_password_alert: "This is a demo. Forgot Password functionality is not implemented.",

        // Allocate Coupon Screen
        allocate_coupon_title: "Allocate New Coupon",
        customer_name_label: "Customer Name",
        customer_phone_label: "Customer Phone Number",
        purchase_amount_label: "Purchase Amount (Rs.)",
        coupon_value_label: "Coupon Value (Rs.)",
        issue_coupon_btn: "Issue Coupon",
        allocate_fill_all_fields: "Please fill in all fields correctly.",
        allocate_invalid_phone: "Please enter a valid 10-digit phone number.",
        allocate_min_purchase_error: (amount) => `Purchase amount must be at least Rs. ${amount} to issue a coupon.`,
        coupon_issued_success: (customerName, couponValue, couponCode, minRedeem, expiryDate) =>
            `Coupon issued! SMS content: "Dear ${customerName}, Congratulations! You've received a Rs. ${couponValue} coupon from Your Shop Name. Your coupon code is: ${couponCode}. Redeem it on your next purchase of Rs. ${minRedeem} or more before ${expiryDate}. Thank you for shopping with us!"`,

        // Validate Coupon Screen
        validate_coupon_title: "Validate Coupon",
        coupon_code_label: "Coupon Code",
        search_coupon_btn: "Search Coupon",
        validate_enter_code: "Please enter a coupon code.",
        validate_invalid_code: "Invalid Coupon Code.",
        coupon_details_heading: "Coupon Details:",
        customer_name_display: "Customer Name:",
        customer_phone_display: "Customer Phone:",
        coupon_value_display: "Coupon Value:",
        issue_date_display: "Issue Date:",
        expiry_date_display: "Expiry Date:",
        status_display: "Status:",
        redeemed_on: (date) => `Coupon already redeemed on ${date}.`,
        expired_on: (date) => `Coupon expired on ${date}.`,
        new_purchase_amount_label: "New Purchase Amount (Rs.)",
        redeem_coupon_btn: "Redeem Coupon",
        redeem_error_generic: "Coupon cannot be redeemed. Please search again.",
        redeem_min_purchase_error: (amount) => `New purchase amount must be at least Rs. ${amount} to redeem this coupon.`,
        redeem_success: "Coupon successfully redeemed!",

        // Shopkeeper Settings Screen
        settings_title: "Shopkeeper Settings",
        default_coupon_value_label: "Default Coupon Value (Rs.)",
        min_purchase_issuance_label: "Min. Purchase for Coupon Issuance (Rs.)",
        min_purchase_redemption_label: "Min. Purchase for Coupon Redemption (Rs.)",
        coupon_validity_days_label: "Coupon Validity Period (Days)",
        language_label: "Language",
        lang_en: "English",
        lang_mr: "मराठी",
        save_settings_btn: "Save Settings",
        settings_invalid_numbers: "Please enter valid positive numbers for all fields.",
        settings_save_success: "Settings saved successfully!",

        // Customer & Coupon List Screen
        coupon_list_title: "Customer & Coupon List",
        search_placeholder: "Search by customer name or phone...",
        all_statuses: "All Statuses",
        status_active: "Active",
        status_redeemed: "Redeemed",
        status_expired: "Expired",
        no_coupons_found: "No coupons found.",
        list_customer: "Customer:",
        list_value: "Value:",
        list_issued_on: "Issued On:",
        list_purchase: "Purchase:",
        list_expires_on: "Expires On:",
        list_status: "Status:",
        list_redeemed_on: "Redeemed On:",

        // Coupon Status Translations
        status_Active: "Active",
        status_Redeemed: "Redeemed",
        status_Expired: "Expired",

        // Navigation
        nav_allocate: "Allocate",
        nav_validate: "Validate",
        nav_settings: "Settings",
        nav_coupons: "Coupons"
    },
    mr: {
        // Login Screen
        login_title: "दुकानदार लॉगिन",
        username_label: "वापरकर्तानाव",
        password_label: "पासवर्ड",
        login_btn: "लॉगिन करा",
        forgot_password_btn: "पासवर्ड विसरलात?",
        login_invalid_credentials: "चुकीचे वापरकर्तानाव किंवा पासवर्ड.",
        forgot_password_alert: "हे फक्त प्रात्यक्षिक आहे. 'पासवर्ड विसरलात' कार्यक्षमता लागू केलेली नाही.",

        // Allocate Coupon Screen
        allocate_coupon_title: "नवीन कूपन द्या",
        customer_name_label: "ग्राहकाचे नाव",
        customer_phone_label: "ग्राहकाचा फोन नंबर",
        purchase_amount_label: "खरेदी रक्कम (रु.)",
        coupon_value_label: "कूपन मूल्य (रु.)",
        issue_coupon_btn: "कूपन जारी करा",
        allocate_fill_all_fields: "कृपया सर्व फील्ड योग्यरित्या भरा.",
        allocate_invalid_phone: "कृपया वैध 10-अंकी फोन नंबर प्रविष्ट करा.",
        allocate_min_purchase_error: (amount) => `कूपन देण्यासाठी खरेदी रक्कम किमान रु. ${amount} असणे आवश्यक आहे.`,
        coupon_issued_success: (customerName, couponValue, couponCode, minRedeem, expiryDate) =>
            `कूपन जारी केले! SMS मजकूर: "प्रिय ${customerName}, अभिनंदन! तुम्हाला तुमच्या दुकानातून रु. ${couponValue} चे कूपन मिळाले आहे. तुमचा कूपन कोड आहे: ${couponCode}. तुमच्या पुढील रु. ${minRedeem} किंवा त्याहून अधिक खरेदीवर ${expiryDate} पूर्वी हे कूपन वापरा. आमच्यासोबत खरेदी केल्याबद्दल धन्यवाद!"`,

        // Validate Coupon Screen
        validate_coupon_title: "कूपन सत्यापित करा",
        coupon_code_label: "कूपन कोड",
        search_coupon_btn: "कूपन शोधा",
        validate_enter_code: "कृपया कूपन कोड प्रविष्ट करा.",
        validate_invalid_code: "अवैध कूपन कोड.",
        coupon_details_heading: "कूपन तपशील:",
        customer_name_display: "ग्राहकाचे नाव:",
        customer_phone_display: "ग्राहकाचा फोन:",
        coupon_value_display: "कूपन मूल्य:",
        issue_date_display: "जारी केल्याची तारीख:",
        expiry_date_display: "समाप्तीची तारीख:",
        status_display: "स्थिती:",
        redeemed_on: (date) => `कूपन आधीच ${date} रोजी वापरले आहे.`,
        expired_on: (date) => `कूपन ${date} रोजी कालबाह्य झाले आहे.`,
        new_purchase_amount_label: "नवीन खरेदी रक्कम (रु.)",
        redeem_coupon_btn: "कूपन रिडीम करा",
        redeem_error_generic: "कूपन रिडीम केले जाऊ शकत नाही. कृपया पुन्हा शोधा.",
        redeem_min_purchase_error: (amount) => `हे कूपन रिडीम करण्यासाठी नवीन खरेदी रक्कम किमान रु. ${amount} असणे आवश्यक आहे.`,
        redeem_success: "कूपन यशस्वीरित्या रिडीम केले!",

        // Shopkeeper Settings Screen
        settings_title: "दुकानदार सेटिंग्ज",
        default_coupon_value_label: "मूळ कूपन मूल्य (रु.)",
        min_purchase_issuance_label: "कूपन जारी करण्यासाठी किमान खरेदी (रु.)",
        min_purchase_redemption_label: "कूपन रिडीम करण्यासाठी किमान खरेदी (रु.)",
        coupon_validity_days_label: "कूपन वैधतेचा कालावधी (दिवस)",
        language_label: "भाषा",
        lang_en: "इंग्रजी",
        lang_mr: "मराठी",
        save_settings_btn: "सेटिंग्ज जतन करा",
        settings_invalid_numbers: "कृपया सर्व फील्डसाठी वैध सकारात्मक संख्या प्रविष्ट करा.",
        settings_save_success: "सेटिंग्ज यशस्वीरित्या जतन केली!",

        // Customer & Coupon List Screen
        coupon_list_title: "ग्राहक आणि कूपन सूची",
        search_placeholder: "ग्राहकाचे नाव किंवा फोनद्वारे शोधा...",
        all_statuses: "सर्व स्थिती",
        status_active: "सक्रिय",
        status_redeemed: "वापरले",
        status_expired: "कालबाह्य",
        no_coupons_found: "कोणतेही कूपन सापडले नाहीत.",
        list_customer: "ग्राहक:",
        list_value: "मूल्य:",
        list_issued_on: "जारी केले:",
        list_purchase: "खरेदी:",
        list_expires_on: "या तारखेला संपेल:",
        list_status: "स्थिती:",
        list_redeemed_on: "या तारखेला वापरले:",

        // Coupon Status Translations
        status_Active: "सक्रिय",
        status_Redeemed: "वापरले",
        status_Expired: "कालबाह्य",

        // Navigation
        nav_allocate: "द्या",
        nav_validate: "सत्यापित करा",
        nav_settings: "सेटिंग्ज",
        nav_coupons: "कूपन"
    }
};


// --- DOM Elements (Existing) ---
const appContainer = document.getElementById('app-container');
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');
const currentScreenTitle = document.getElementById('current-screen-title');

// Login Screen Elements
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginErrorMessage = document.getElementById('login-error');
const forgotPasswordBtn = document.getElementById('forgot-password-btn');

// Main Navigation Elements
const navItems = document.querySelectorAll('.nav-item');
const subScreens = document.querySelectorAll('.sub-screen');

// Allocate Coupon Screen Elements
const allocateCouponScreen = document.getElementById('allocate-coupon-screen');
const allocateCouponForm = document.getElementById('allocate-coupon-form');
const customerNameInput = document.getElementById('customer-name');
const customerPhoneInput = document.getElementById('customer-phone');
const purchaseAmountInput = document.getElementById('purchase-amount');
const couponValueInput = document.getElementById('coupon-value');
const allocateCouponMessage = document.getElementById('allocate-coupon-message');

// Validate Coupon Screen Elements
const validateCouponScreen = document.getElementById('validate-coupon-screen');
const validateCouponForm = document.getElementById('validate-coupon-form');
const couponCodeInput = document.getElementById('coupon-code-input');
const searchCouponBtn = document.getElementById('search-coupon-btn');
const validateCouponMessage = document.getElementById('validate-coupon-message');
const couponDetailsDisplay = document.getElementById('coupon-details-display');
const displayCustomerName = document.getElementById('display-customer-name');
const displayCustomerPhone = document.getElementById('display-customer-phone');
const displayCouponValue = document.getElementById('display-coupon-value');
const displayIssueDate = document.getElementById('display-issue-date');
const displayExpiryDate = document.getElementById('display-expiry-date');
const displayCouponStatus = document.getElementById('display-coupon-status');
const redemptionSection = document.getElementById('redemption-section');
const newPurchaseAmountInput = document.getElementById('new-purchase-amount');
const redeemCouponBtn = document.getElementById('redeem-coupon-btn');

// Shopkeeper Configuration Screen Elements
const configScreen = document.getElementById('config-screen');
const configForm = document.getElementById('config-form');
const defaultCouponValueInput = document.getElementById('default-coupon-value');
const minPurchaseIssuanceInput = document.getElementById('min-purchase-issuance');
const minPurchaseRedemptionInput = document.getElementById('min-purchase-redemption');
const couponValidityDaysInput = document.getElementById('coupon-validity-days');
const configMessage = document.getElementById('config-message');
const languageSelect = document.getElementById('language-select'); // NEW: Language select element

// Customer & Coupon List Screen Elements
const couponListScreen = document.getElementById('coupon-list-screen');
const couponListSearchInput = document.getElementById('coupon-list-search');
const couponStatusFilter = document.getElementById('coupon-status-filter');
const couponListContainer = document.getElementById('coupon-list-container');
const noCouponsMessage = document.getElementById('no-coupons-message');


// --- Utility Functions ---

/**
 * Simulates fetching data from a JSON file.
 * In a real app, this would be an API call.
 * For this demo, it loads from conceptual static data or localStorage.
 */
async function loadData() {
    // Simulate fetching from static JSON files
    const initialUsers = [{ username: "shopkeeper", password: "password123" }]; // Dummy user
    const initialSettings = {
        defaultCouponValue: 100,
        minPurchaseForIssuance: 1000,
        minPurchaseForRedemption: 1000,
        couponValidityDays: 30,
        language: 'en' // NEW: Default language setting
    };
    const initialCoupons = []; // Start with an empty array for coupons

    // Try to load from localStorage first for persistence
    const storedUsers = localStorage.getItem('users');
    const storedSettings = localStorage.getItem('appSettings');
    const storedCoupons = localStorage.getItem('coupons');

    users = storedUsers ? JSON.parse(storedUsers) : initialUsers;
    appSettings = storedSettings ? JSON.parse(storedSettings) : initialSettings;
    coupons = storedCoupons ? JSON.parse(storedCoupons) : initialCoupons;

    // Ensure initial population for demo if localStorage was empty
    if (!storedUsers) localStorage.setItem('users', JSON.stringify(users));
    if (!storedSettings) localStorage.setItem('appSettings', JSON.stringify(appSettings));
    if (!storedCoupons) localStorage.setItem('coupons', JSON.stringify(coupons));
}

/**
 * Simulates saving data to a JSON file (by updating localStorage).
 */
function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('appSettings', JSON.stringify(appSettings));
    localStorage.setItem('coupons', JSON.stringify(coupons));
}

/**
 * Translates a key based on the current language.
 * @param {string} key - The key for the translation string.
 * @param {...any} args - Arguments to pass to translation functions.
 * @returns {string} The translated string.
 */
function getTranslation(key, ...args) {
    const lang = appSettings.language || 'en'; // Default to English
    const translation = translations[lang] && translations[lang][key];

    if (typeof translation === 'function') {
        return translation(...args);
    }
    return translation || key; // Return key if translation not found
}

/**
 * Updates all text content and placeholders in the UI based on the current language.
 */
function updateUIStrings() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = getTranslation(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = getTranslation(key);
    });

    // Special handling for dynamic titles (like current-screen-title)
    const activeSubScreen = document.querySelector('.sub-screen.active-sub-screen');
    if (activeSubScreen) {
        currentScreenTitle.textContent = activeSubScreen.querySelector('h3').textContent;
    }

    // Update nav item spans specifically
    navItems.forEach(item => {
        const span = item.querySelector('span[data-i18n]');
        if (span) {
            const key = span.getAttribute('data-i18n');
            span.textContent = getTranslation(key);
        }
    });

    // Update placeholder for search input after translation
    couponListSearchInput.placeholder = getTranslation('search_placeholder');
}


/**
 * Generates a unique alphanumeric coupon code.
 * @param {number} length - The desired length of the coupon code.
 * @returns {string} A unique coupon code.
 */
function generateUniqueCouponCode(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let isUnique = false;

    while (!isUnique) {
        result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // Check for uniqueness
        isUnique = !coupons.some(coupon => coupon.code === result);
    }
    return result;
}

/**
 * Displays a message (success or error) on a given element.
 * @param {HTMLElement} element - The DOM element to display the message in.
 * @param {string} messageKey - The key for the message translation.
 * @param {string} type - 'success' or 'error'.
 * @param {...any} args - Arguments to pass to the translation function.
 */
function displayMessage(element, messageKey, type, ...args) {
    element.textContent = getTranslation(messageKey, ...args);
    element.className = `message ${type}-message`; // Set classes
    setTimeout(() => {
        element.textContent = '';
        element.className = 'message'; // Clear classes
    }, 3000); // Clear message after 3 seconds
}

/**
 * Formats a date string for display.
 * @param {string} dateString - The date string to format (e.g., "YYYY-MM-DDTHH:mm:ss.sssZ").
 * @returns {string} Formatted date (e.g., "DD MonYYYY").
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options); // Date format remains English for consistency
}

// --- Screen Navigation Functions ---

/**
 * Hides all main screens and shows the specified screen.
 * @param {HTMLElement} screenToShow - The screen element to make active.
 */
function showScreen(screenToShow) {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    screenToShow.classList.add('active');
}

/**
 * Hides all sub-screens within the main app and shows the specified sub-screen.
 * Updates the header title and active navigation item.
 * @param {HTMLElement} subScreenToShow - The sub-screen element to make active.
 */
function showSubScreen(subScreenToShow) {
    subScreens.forEach(screen => {
        screen.classList.remove('active-sub-screen');
    });
    subScreenToShow.classList.add('active-sub-screen');

    // Update header title based on the new active sub-screen's translated title
    currentScreenTitle.textContent = getTranslation(subScreenToShow.querySelector('h3').getAttribute('data-i18n'));


    // Update active nav item
    navItems.forEach(item => item.classList.remove('active-nav'));
    const correspondingNavItem = document.querySelector(`.nav-item[data-screen="${subScreenToShow.id}"]`);
    if (correspondingNavItem) {
        correspondingNavItem.classList.add('active-nav');
    }

    // Special handling for coupon list screen
    if (subScreenToShow.id === 'coupon-list-screen') {
        renderCouponList();
    }
    // Special handling for config screen
    if (subScreenToShow.id === 'config-screen') {
        populateConfigForm();
    }
    // Special handling for allocate coupon screen
    if (subScreenToShow.id === 'allocate-coupon-screen') {
        couponValueInput.value = appSettings.defaultCouponValue;
        allocateCouponMessage.textContent = ''; // Clear message on navigate
        allocateCouponForm.reset();
    }
     // Special handling for validate coupon screen
     if (subScreenToShow.id === 'validate-coupon-screen') {
        validateCouponForm.reset();
        validateCouponMessage.textContent = '';
        couponDetailsDisplay.classList.add('hidden');
        redemptionSection.classList.add('hidden');
    }
}


// --- Event Handlers ---

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    //const user = users.find(u => u.username === username && u.password === password); // Simple check for demo
const user =true;
    if (user) {
        showScreen(mainApp);
        showSubScreen(allocateCouponScreen); // Default screen after login
        loginErrorMessage.textContent = '';
        updateUIStrings(); // Update strings after login
    } else {
        displayMessage(loginErrorMessage, 'login_invalid_credentials', 'error');
    }
});

// Forgot Password (Dummy)
forgotPasswordBtn.addEventListener('click', () => {
    alert(getTranslation('forgot_password_alert'));
});

// Navigation Bar Clicks
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetScreenId = item.dataset.screen;
        const targetScreen = document.getElementById(targetScreenId);
        if (targetScreen) {
            showSubScreen(targetScreen);
        }
    });
});

// Shopkeeper Configuration Form Submission
configForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const defaultVal = parseInt(defaultCouponValueInput.value);
    const minIssue = parseInt(minPurchaseIssuanceInput.value);
    const minRedeem = parseInt(minPurchaseRedemptionInput.value);
    const validityDays = parseInt(couponValidityDaysInput.value);
    const selectedLanguage = languageSelect.value; // NEW: Get selected language

    if (isNaN(defaultVal) || isNaN(minIssue) || isNaN(minRedeem) || isNaN(validityDays) ||
        defaultVal < 0 || minIssue < 0 || minRedeem < 0 || validityDays < 1) {
        displayMessage(configMessage, 'settings_invalid_numbers', 'error');
        return;
    }

    appSettings.defaultCouponValue = defaultVal;
    appSettings.minPurchaseForIssuance = minIssue;
    appSettings.minPurchaseForRedemption = minRedeem;
    appSettings.couponValidityDays = validityDays;
    appSettings.language = selectedLanguage; // NEW: Save language

    saveData();
    updateUIStrings(); // NEW: Update UI strings after saving new language
    displayMessage(configMessage, 'settings_save_success', 'success');
});

// Populate Config Form on Load/Screen Change
function populateConfigForm() {
    defaultCouponValueInput.value = appSettings.defaultCouponValue;
    minPurchaseIssuanceInput.value = appSettings.minPurchaseForIssuance;
    minPurchaseRedemptionInput.value = appSettings.minPurchaseForRedemption;
    couponValidityDaysInput.value = appSettings.couponValidityDays;
    languageSelect.value = appSettings.language; // NEW: Set selected language in dropdown
    configMessage.textContent = ''; // Clear messages
}

// Allocate Coupon Form Submission
allocateCouponForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const customerName = customerNameInput.value.trim();
    const customerPhone = customerPhoneInput.value.trim();
    const purchaseAmount = parseFloat(purchaseAmountInput.value);
    const couponValue = parseFloat(couponValueInput.value);

    if (!customerName || !customerPhone || isNaN(purchaseAmount) || isNaN(couponValue)) {
        displayMessage(allocateCouponMessage, 'allocate_fill_all_fields', 'error');
        return;
    }

    if (!/^[0-9]{10}$/.test(customerPhone)) {
        displayMessage(allocateCouponMessage, 'allocate_invalid_phone', 'error');
        return;
    }

    if (purchaseAmount < appSettings.minPurchaseForIssuance) {
        displayMessage(allocateCouponMessage, 'allocate_min_purchase_error', 'error', appSettings.minPurchaseForIssuance);
        return;
    }

    const couponCode = generateUniqueCouponCode();
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(issueDate.getDate() + appSettings.couponValidityDays);

    const newCoupon = {
        code: couponCode,
        customerName: customerName,
        customerPhone: customerPhone,
        value: couponValue,
        issueDate: issueDate.toISOString(), // Store as ISO string
        expiryDate: expiryDate.toISOString(),
        status: 'Active',
        redemptionDate: null,
        issuancePurchaseAmount: purchaseAmount,
        redemptionPurchaseAmount: null
    };

    coupons.push(newCoupon);
    saveData();

    // Pass translated strings to the displayMessage function
    const formattedExpiryDate = formatDate(expiryDate.toISOString()); // Date format remains English for consistency
    displayMessage(
        allocateCouponMessage,
        'coupon_issued_success',
        'success',
        customerName,
        couponValue,
        couponCode, // Coupon code is NOT translated
        appSettings.minPurchaseForRedemption,
        formattedExpiryDate
    );
    allocateCouponForm.reset();
    couponValueInput.value = appSettings.defaultCouponValue; // Reset to default after issuing
});

// Validate Coupon Search Button
searchCouponBtn.addEventListener('click', () => {
    const code = couponCodeInput.value.trim().toUpperCase();
    if (!code) {
        displayMessage(validateCouponMessage, 'validate_enter_code', 'error');
        couponDetailsDisplay.classList.add('hidden');
        redemptionSection.classList.add('hidden');
        return;
    }

    const coupon = coupons.find(c => c.code === code);

    if (!coupon) {
        displayMessage(validateCouponMessage, 'validate_invalid_code', 'error');
        couponDetailsDisplay.classList.add('hidden');
        redemptionSection.classList.add('hidden');
        return;
    }

    // Display coupon details (these spans have data-i18n on their labels, not themselves)
    // The *values* are dynamic and should not be translated.
    displayCustomerName.textContent = coupon.customerName;
    displayCustomerPhone.textContent = coupon.customerPhone;
    displayCouponValue.textContent = coupon.value;
    displayIssueDate.textContent = formatDate(coupon.issueDate);
    displayExpiryDate.textContent = formatDate(coupon.expiryDate);
    displayCouponStatus.textContent = getTranslation(`status_${coupon.status}`); // Translate status string
    displayCouponStatus.className = ''; // Reset classes
    displayCouponStatus.classList.add(coupon.status === 'Active' ? 'success-color' : (coupon.status === 'Redeemed' ? 'text-color-dark' : 'error-color'));


    couponDetailsDisplay.classList.remove('hidden');
    validateCouponMessage.textContent = ''; // Clear any previous error

    // Determine if redemption is possible
    const now = new Date();
    const expiry = new Date(coupon.expiryDate);

    if (coupon.status === 'Redeemed') {
        displayMessage(validateCouponMessage, 'redeemed_on', 'error', formatDate(coupon.redemptionDate));
        redemptionSection.classList.add('hidden');
    } else if (now > expiry) {
        displayMessage(validateCouponMessage, 'expired_on', 'error', formatDate(coupon.expiryDate));
        // Update status to expired in data if it's active but expired
        if (coupon.status === 'Active') {
            coupon.status = 'Expired';
            saveData();
            displayCouponStatus.textContent = getTranslation(`status_${coupon.status}`); // Update displayed status
            displayCouponStatus.classList.remove('success-color');
            displayCouponStatus.classList.add('error-color');
        }
        redemptionSection.classList.add('hidden');
    } else {
        redemptionSection.classList.remove('hidden');
        newPurchaseAmountInput.value = ''; // Clear previous value
    }
});

// Redeem Coupon Button
redeemCouponBtn.addEventListener('click', () => {
    const code = couponCodeInput.value.trim().toUpperCase();
    const coupon = coupons.find(c => c.code === code);
    const newPurchaseAmount = parseFloat(newPurchaseAmountInput.value);

    if (!coupon || coupon.status !== 'Active' || new Date() > new Date(coupon.expiryDate)) {
        displayMessage(validateCouponMessage, 'redeem_error_generic', 'error');
        return;
    }

    if (isNaN(newPurchaseAmount) || newPurchaseAmount < appSettings.minPurchaseForRedemption) {
        displayMessage(validateCouponMessage, 'redeem_min_purchase_error', 'error', appSettings.minPurchaseForRedemption);
        return;
    }

    coupon.status = 'Redeemed';
    coupon.redemptionDate = new Date().toISOString();
    coupon.redemptionPurchaseAmount = newPurchaseAmount;
    saveData();

    displayMessage(validateCouponMessage, 'redeem_success', 'success');
    couponDetailsDisplay.classList.add('hidden'); // Hide details after redemption
    redemptionSection.classList.add('hidden');
    validateCouponForm.reset(); // Clear the form
});

// Render Coupon List
function renderCouponList() {
    couponListContainer.innerHTML = ''; // Clear previous list
    const searchTerm = couponListSearchInput.value.toLowerCase();
    const filterStatus = couponStatusFilter.value;

    const filteredCoupons = coupons.filter(coupon => {
        const matchesSearch = coupon.customerName.toLowerCase().includes(searchTerm) ||
                              coupon.customerPhone.includes(searchTerm) ||
                              coupon.code.toLowerCase().includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || coupon.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (filteredCoupons.length === 0) {
        noCouponsMessage.classList.remove('hidden');
        return;
    } else {
        noCouponsMessage.classList.add('hidden');
    }

    // Sort by issue date, newest first
    filteredCoupons.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));

    filteredCoupons.forEach(coupon => {
        const couponItem = document.createElement('div');
        couponItem.classList.add('coupon-item', `status-${coupon.status}`);

        couponItem.innerHTML = `
            <h4>${coupon.code}</h4>
            <p><strong>${getTranslation('list_customer')}</strong> ${coupon.customerName} (${coupon.customerPhone})</p>
            <p><strong>${getTranslation('list_value')}</strong> Rs. ${coupon.value}</p>
            <p><strong>${getTranslation('list_issued_on')}</strong> ${formatDate(coupon.issueDate)} (${getTranslation('list_purchase')}: Rs. ${coupon.issuancePurchaseAmount})</p>
            <p><strong>${getTranslation('list_expires_on')}</strong> ${formatDate(coupon.expiryDate)}</p>
            <p><strong>${getTranslation('list_status')}</strong> ${getTranslation(`status_${coupon.status}`)}</p>
            ${coupon.status === 'Redeemed' ? `<p><strong>${getTranslation('list_redeemed_on')}</strong> ${formatDate(coupon.redemptionDate)} (${getTranslation('list_purchase')}: Rs. ${coupon.redemptionPurchaseAmount})</p>` : ''}
        `;
        couponListContainer.appendChild(couponItem);
    });
}

// Event listeners for search and filter on coupon list
couponListSearchInput.addEventListener('input', renderCouponList);
couponStatusFilter.addEventListener('change', renderCouponList);


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    // Set the language select dropdown to the saved language
    languageSelect.value = appSettings.language;
    updateUIStrings(); // Initial UI update based on loaded language
    showScreen(loginScreen); // Always start at login screen
});