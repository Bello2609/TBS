import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const GetLoggedInUser = (token: string)=>{
    token  = token.split(" ")[1];
    let decoded =  jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const userId =  decoded.id;
    return userId;
}  
export default GetLoggedInUser;