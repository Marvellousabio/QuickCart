import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Buye" });


//inngest function to save to database
export const syncUserCreation =inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {event: 'clerk/user.created'},
    async ({event})=> {
        const {id, first_name,last_name,email_address,image_url} = event.data
        const userData = {
            _id:id,
            email:email_address[0].email_address,
            name: first_name +' ' + last_name,
            imageUrl: image_url

        }
        await connectDB()
        await User.create(userData)
    }
)

//Import Function to update user data in database

export const syncUserUpdation = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {event: 'clerk/user.updated'},
    async ({event})=> {
        const {id, first_name,last_name,email_address,image_url} = event.data
        const userData = {
            _id:id,
            email:email_address[0].email_address,
            name: first_name +' ' + last_name,
            imageUrl: image_url

        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)
    }
    
)

// Inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-with-clerk'
    },
    {event:'clerk/user.deleted'},
    async ({event})=>{
        const {id} = event.data
        
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)