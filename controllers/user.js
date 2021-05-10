import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
//controllers for user authentication using JWT(JSON Web Tokens);
export const signin = async (req,res) => {
    const {email, password } = req.body;

    try {
        const existingUser = await User.findOne({email}); //searches for users based on email

        if(!existingUser) return res.status(404).json({message: "User doesn't exist. "});//404 not found if no user is found

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);//checks that the encrypted password matches the stored encrypted password 

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});//incorrect password results in a 400 bad request 

        const token = jwt.sign({ email: existingUser.email, id:existingUser._id}, 'test', {expiresIn: "1h"}); 
        //provides user with a unique token - used to identify the user and target them specifically - also expires in 1 hour
        res.status(200).json({result: existingUser, token}); //logs user in and assigns the token to them
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
};

export const signup = async (req,res) => { //sign in controller
    const {email, password, firstName, lastName} = req.body;
    
    try {
        const existingUser = await User.findOne({email}); //checks they dont already exist

        if(existingUser) return res.status(400).json({message: "User already exists. "});

        const hashedPassword = await bcrypt.hash(password, 12); //hashs their password with a salt of 12

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`}); //creates the user in the Database

        const token = jwt.sign({ email: result.email, id:result._id}, 'test', {expiresIn: "1h"});//provides the user with a token so they are logged in

        res.status(201).json({result, token});//assigns user the token
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'});
    }

}

export const userRentals = async (req,res) => { //used to track the users rented items
    try {
        const userRentals = await User.find()//find the user
        console.log(userRentals);
        res.status(200).json(userRentals)//return their rented items 
    } catch (error) {
        res.status(404).json({error});
    }
}

export const updateRentals = async (req, res) => {//controller to update their rented items 
    const {id: _id} = req.params;
    const rental = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that ID');//find users ID

    const newRental = await User.findByIdAndUpdate(_id, {rentedProducts: rental.rentedProducts, numberOfProducts: rental.numberOfProducts, _id}, {new:true});
    //find the users rented array and update
    res.json(newRental)
}