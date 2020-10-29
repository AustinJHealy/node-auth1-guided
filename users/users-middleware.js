const bcrypt = require("bcrypt")
const Users = require("./users-model")

function restrict() {
	// Create a middleware function that restricts routes to authorized users only.
	// It should get the username and password from the request headers.
	return async (req,res,next) => {


	try {
	// 	const {username, password} = req.headers
	// 	if(!username || !password){
	// 		return res.status(401).json({
	// 			message: "Username and password do not match",
	// 		})
	// 	}
	// 	const user = await Users.findBy({ username }).first()
	// 	if(!user) {
	// 		return res.status(401).json({
	// 			message: "Invalid Username",
	// 		})
	// 	}
	// 	const passwordValid = await bcrypt.compare(password, user.password)
	// 	if (!passwordValid) {
	// 		return res.status(401).json({
	// 			message: "Invalid Password",
	// })
	
	// } 
	if(!req.session || !req.session.user){
		return res.status(401).json({
			message: "Invalid Credentials"
		})
	}
	
	next() }
	catch (err){
		next(err)
		}
	}
}
module.exports = {
	restrict,
}