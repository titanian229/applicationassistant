export default {
    saveToLocal: (key, data) => {
        if (typeof data === 'string') {
            localStorage.setItem(key, data);
            return;
        }
        localStorage.setItem(key, JSON.stringify(data));
    },
    loadLocal: (key) => JSON.parse(localStorage.getItem(key)),
    clearLocal: () => localStorage.clear(),
    clearItem: (key) => localStorage.clearItem(key),
};
