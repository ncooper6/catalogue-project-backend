import jwt from 'jsonwebtoken';

const secret = 'test';
//middle ware to work out roken length - usually used to differentiate between GoogleAuth Tokens and JWT
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, secret);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }    

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;