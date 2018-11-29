
import jwt from 'jsonwebtoken';
require('dotenv').config();

const isTokenExist = (token) => {
   const n = jwt.verify(token, process.env.SECRET, function(err, data) {
        if (err) {
           return false;
        }
        return true;
    });
   return n;
}

export default { isTokenExist }