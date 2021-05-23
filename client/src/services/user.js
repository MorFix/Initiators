const USER_NAME_STORAGE_KEY = 'userName';
const USER_ID_STORAGE_KEY = 'userId';

export const getUser = () => {
    const id = localStorage.getItem(USER_ID_STORAGE_KEY);
    if (!id) {
        return;
    }

    const name = localStorage.getItem(USER_NAME_STORAGE_KEY);

    return {name, id};
};

export const setUser = user => {
  localStorage.setItem(USER_NAME_STORAGE_KEY, user.name);
  localStorage.setItem(USER_ID_STORAGE_KEY, user.id);
};

export const logout = () => {
    [USER_NAME_STORAGE_KEY, USER_ID_STORAGE_KEY].forEach(x => {
        localStorage.removeItem(x);
    });
};
