const USER_STORAGE_KEY = 'user';

export const getUser = () => {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    if (!user) {
        return;
    }

    return JSON.parse(user);
};

export const setUser = user => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
};
