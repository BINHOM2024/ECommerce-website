import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) return res.json({ success: false, message: "not Authenticated.you may need login again!" })
    
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        req.body.userId = token_decode.id
       next()
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
export default userAuth