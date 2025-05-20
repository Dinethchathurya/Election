export const getLanguage = () => {
  return localStorage.getItem("language") || "en"; // fallback to English
};