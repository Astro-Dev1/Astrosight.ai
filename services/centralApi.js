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