import { Notification } from "../models/notification.model.js"

type Notification = {
    userId: string,
    action: string,
    message: string
}
export const Notify = async({userId, action, message}: Notification)=>{
    try{
        const notification_data = { 
            userId: userId,
            action: action,
            message: message }
        await Notification.create(notification_data);
        console.log("notification");
        
    }catch(error: any){
        throw new Error(error.message || "An error occured");
    }
}