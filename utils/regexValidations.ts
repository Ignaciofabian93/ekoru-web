export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.toLowerCase());
export const validatePassword = (password: string) => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,16}$/.test(password);
