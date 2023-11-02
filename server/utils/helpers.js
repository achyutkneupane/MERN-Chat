const fullName = (firstName, middleName, lastName) => {
    return `${firstName}${middleName ? ' ' + middleName : ''} ${lastName}`;
}

module.exports = {
    fullName
}