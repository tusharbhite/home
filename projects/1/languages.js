// languages.js

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

        // Coupon Status
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

        // Coupon Status
        status_Active: "सक्रिय",
        status_Redeemed: "वापरले",
        status_Expired: "कालबाह्य",

        // Navigation
        nav_allocate: "नवीन कूपन द्या",
        nav_validate: "सत्यापित करा",
        nav_settings: "सेटिंग्ज",
        nav_coupons: "कूपन"
    }
};