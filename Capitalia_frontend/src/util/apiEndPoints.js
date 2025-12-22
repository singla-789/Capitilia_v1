export const BASE_URL = "http://localhost:8080/api/v1.0";

export const CLOUDINARY_CLOUD_NAME = "dy1vcpqoj";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO : "/profile",
  GET_ALL_CATEGORIES:"/categories",
  ADD_CATEGORY:"/categories",
  UPDATE_CATEGORY:(categroyId) => `/categories/${categroyId}`,
  GET_ALL_INCOMES : "/incomes",
  CATEGORY_BY_TYPE : (type) => `/categories/${type}`,
  ADD_INCOMES : "/incomes",
  DELETE_INCOME : (id) => `/incomes/${id}`,
  INCOME_EXCEL_DOWNLOAD : "/excel/download/income",
  EMAIL_INCOME : "/email/income-excel",
  GET_ALL_EXPENSE : "/expenses",
  DELETE_EXPENSE : (id) => `/expenses/${id}`,
  ADD_EXPENSE : "/expenses",
  EXPENSE_EXCEL_DOWNLOAD : "/excel/download/expense",
  EMAIL_EXPENSE : "/email/expense-excel",
  APPLY_FILTER : "/filter",
  DASHBOARD_DATA : "/dashboard",
  UPLOAD_IMAGE:
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
