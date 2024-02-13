const admin =  require('../config/firebase_config');
class Middleware {
	async decodeToken(req, res, next) {
       
 console.log(req.headers.authorization);
		const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.json({ message: 'Unauthorized' });
        }
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);

			if (decodeValue) {
                console.log(decodeValue);
				return next();
			}
			return res.json({ message: 'Unauthorized' });
		} catch (e) {

			return next(e);
		}
	}
}
module.exports = new Middleware();