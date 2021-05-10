import mongoose from 'mongoose';

//mongoose model used to set a users data fields

const userSchema = mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required: true},
    id: {type: String},
    admin: {type: Boolean, required:true, default: false},
    rentedProducts: [{type: String, default: ''}],
    numberOfProducts: [{type:Number, default: 0}]
})


export default mongoose.model("User", userSchema);