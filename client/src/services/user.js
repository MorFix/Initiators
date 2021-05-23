const USER_STORAGE_KEY = 'username';

export const getUsername = () => localStorage.getItem(USER_STORAGE_KEY);
export const setUsername = user => localStorage.setItem(USER_STORAGE_KEY, user);
export const logout = () => localStorage.removeItem(USER_STORAGE_KEY);
