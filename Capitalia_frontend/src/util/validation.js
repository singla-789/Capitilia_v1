export const validateEmail = (email) => {
  if (!email) return false;

  const trimmed = email.trim();
  if (!trimmed) return false;

  // RFC 5322–compatible lightweight regex
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return regex.test(trimmed);
};
