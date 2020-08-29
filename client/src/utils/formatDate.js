export default (date) => {
    if (!date || date === '') return '';
    try {
        const dateObj = new Date(date);
        return dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate();
    } catch (err) {
        console.log(err);
        return '';
    }
};
