const moment = require('moment');

const getTodayDate = () => {
    return moment().format("DD-MM-YYYY");
}

const getTodayDate2 = () => {
    return moment().format("DD_MM_YYYY");
}

module.exports = {
    getTodayDate,
    getTodayDate2
}
