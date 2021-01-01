const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * verify user token
 * @param token
 * @returns token information
 * @author Xingjing Li
 */
function verify(token) {
    let decoded = jwt.verify(token, config.get('jwtSecret'));
    return decoded;

}

module.exports = verify;
