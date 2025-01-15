export const generateVerificationCode = () => { // Export generateVerificationCode function
    return Math.floor(100000 + Math.random() * 900000).toString(); // Return random 6 digit number
};