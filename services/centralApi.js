// ✅ Service file to centralize all fetch operations
// Create this as `/services/centralApi.js`

import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ycxn3ykohf.execute-api.ap-south-1.amazonaws.com/";

const getToken = () => Cookies.get("token");
console.log(getToken())
// ------------------ AUTH ------------------
export const signupUser = async (payload) => {
  return fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const loginUser = async (payload) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const requestOtp = async (payload) => {
  return fetch(`${BASE_URL}/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};
export const verifyOtp = async (payload) => {
  return fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};
// ------------------ PROFILE ------------------
export const createProfile = async (payload) => {
  return fetch(`${BASE_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const fetchMyProfile = async () => {
  return fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};

export const fetchAllProfiles = async () => {
  return fetch(`${BASE_URL}/profile/all`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};

// ------------------ BLOG ------------------
export const addBlog = async (payload) => {
  return fetch(`${BASE_URL}/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const updateBlogBySlug = async (slug, payload) => {
  return fetch(`${BASE_URL}/blog/slug/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const fetchAllBlogs = async () => {
  return fetch(`${BASE_URL}/blog`).then(res => res.json());
};

export const fetchBlogBySlug = async (slug) => {
  return fetch(`${BASE_URL}/blog/slug/${slug}`).then(res => res.json());
};

export const deleteBlog = async (slug) => {
  return fetch(`${BASE_URL}/blog/slug/${slug}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};

export const toggleBlogPublish = async (slug) => {
  return fetch(`${BASE_URL}/blog/slug/${slug}/publish`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};

// ------------------ HOROSCOPE ------------------
export const fetchHoroscope = async () => {
  return fetch(`${BASE_URL}/horoscope/process`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};
// export const fetchHoroscope = async () => {
//   try {
//     const token = getToken();
//     if (!token) throw new Error('No token found');
//     const response = await fetch(`${BASE_URL}/horoscope/process`, {
//       headers: { Authorization: `Bearer  ${getToken()}` },
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Fetch horoscope error:', error);
//     throw error;
//   }
// };

export const getDailyHoroscope = async ({ type, lang, sign, date }) => {
  try {
    console.log('centralApi.js: getDailyHoroscope called with:', { type, lang, sign, date });
    const token = getToken();
    
    // Ensure proper sign formatting
    const formattedSign = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
    
    const url = `${BASE_URL}/horoscope/dailyHoroscope?type=${type}&lang=${lang}&sign=${formattedSign}&date=${date}`;
    console.log('centralApi.js: Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Optional: Add Authorization if your API is protected
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    console.log('centralApi.js: Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('centralApi.js: API error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('centralApi.js: Success response:', result);
    return result;
  } catch (error) {
    console.error('Fetch horoscope error:', error);
    throw error;
  }
};

// Weekly Horoscope
export const getWeeklyHoroscope = async ({ lang, sign, date }) => {
  try {
    console.log('centralApi.js: getWeeklyHoroscope called with:', { lang, sign, date });
    const token = getToken();
    
    const formattedSign = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
    const url = `${BASE_URL}/horoscope/weeklyHoroscope?lang=${lang}&sign=${formattedSign}&date=${date}`;
    console.log('centralApi.js: Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('centralApi.js: Weekly horoscope API error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('centralApi.js: Weekly horoscope response:', result);
    return result;
  } catch (error) {
    console.error('Fetch weekly horoscope error:', error);
    throw error;
  }
};

// Monthly Horoscope
export const getMonthlyHoroscope = async ({ lang, sign, date }) => {
  try {
    console.log('centralApi.js: getMonthlyHoroscope called with:', { lang, sign, date });
    const token = getToken();
    
    const formattedSign = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
    const url = `${BASE_URL}/horoscope/monthlyHoroscope?lang=${lang}&sign=${formattedSign}&date=${date}`;
    console.log('centralApi.js: Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('centralApi.js: Monthly horoscope API error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('centralApi.js: Monthly horoscope response:', result);
    return result;
  } catch (error) {
    console.error('Fetch monthly horoscope error:', error);
    throw error;
  }
};

// Yearly Horoscope
export const getYearlyHoroscope = async ({ lang, sign, date }) => {
  try {
    console.log('centralApi.js: getYearlyHoroscope called with:', { lang, sign, date });
    const token = getToken();
    
    const formattedSign = sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase();
    const url = `${BASE_URL}/horoscope/yearlyHoroscope?lang=${lang}&sign=${formattedSign}&date=${date}`;
    console.log('centralApi.js: Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('centralApi.js: Yearly horoscope API error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('centralApi.js: Yearly horoscope response:', result);
    return result;
  } catch (error) {
    console.error('Fetch yearly horoscope error:', error);
    throw error;
  }
};

// Generic horoscope fetcher that routes to the correct period-specific API
export const getHoroscopeByPeriod = async ({ period, lang, sign, date }) => {
  switch (period.toLowerCase()) {
    case 'daily':
      return getDailyHoroscope({ type: 'daily', lang, sign, date });
    case 'weekly':
      return getWeeklyHoroscope({ lang, sign, date });
    case 'monthly':
      return getMonthlyHoroscope({ lang, sign, date });
    case 'yearly':
      return getYearlyHoroscope({ lang, sign, date });
    default:
      throw new Error(`Unsupported period: ${period}`);
  }
};

// ------------------ PANCHANGA ------------------
export const fetchPanchanga = async (date) => {
  return fetch(`${BASE_URL}/panchanga/?date=${date}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};

// ------------------ SETTING ------------------
export const addSetting = async (payload) => {
  return fetch(`${BASE_URL}/setting`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const fetchSettings = async () => {
  return fetch(`${BASE_URL}/setting`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};

export const fetchSettingByKey = async (key) => {
  return fetch(`${BASE_URL}/setting/${key}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};

// ------------------ QUESTION ------------------
export const processQuestion = async (payload) => {
  return fetch(`${BASE_URL}/question/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  }).then(res => res.json());
};

export const updateQuestion = async (payload) => {
  console.log("Updating question with payload:", payload);
  return fetch(`${BASE_URL}/question/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
    id:payload,
    status: "completed"
  }),
  }).then(res => res.json());
};

export const fetchMyQuestion = async () => {
  return fetch(`${BASE_URL}/question/fetch`, {
    method: "GET",
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(res => res.json());
};

export const likeDislike = async (questionId, action) => {
  return fetch(`${BASE_URL}/likeDislike/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ questionId, action }),
  }).then(res => res.json());
};

// ------------------ FILE UPLOAD ------------------
export const uploadFile = async (formData) => {
  console.log(formData)
  return fetch(`${BASE_URL}/upload/file`, {
    method: "POST",
    body: formData,
  }).then(res => res.json());
};

// ------------------ WALLET ------------------
export const fetchWallet = async () => {
  return fetch(`${BASE_URL}/wallet/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(res => res.json());
};

// ------------------ LEDGER ------------------
export const fetchLedger = async () => {
  return fetch(`${BASE_URL}/ledger/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(res => res.json());
};

// services/centralApi.js
export const createRechargeOrder = async (amount) => {
  return fetch(`${BASE_URL}/wallet/recharge/order`, {
      headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    method: "POST",
    body: JSON.stringify({ amount }),
  });
};

export const confirmRechargeSuccess = async (paymentData) => {
  return fetch(`${BASE_URL}/wallet/recharge/success`, {
      headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    method: "POST",
    body: JSON.stringify(paymentData),
  });
};