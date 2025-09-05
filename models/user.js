import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    //properties
    _id:{ type:String, required:true},
    name:{type:String , required:true},
    email:{type:String, required:true},
    email: { type:String, required:true, unique:true},
    imageUrl: {type: String, required:true},
    cartItems: {type:Object, default:{} }
}, {minimize: false})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User

//import mongooseas mongose then set a const name schema to be new mongoose schema and can have id name email 
// set const User to be mongo