export default (date) => {
    const dateObj = new Date(date)
    return dateObj.getFullYear() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getDate();
}