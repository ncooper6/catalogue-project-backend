import mongoose from 'mongoose';
import ProductMessage from '../models/productMessage.js';

//controllers interact with the Schema and read/write data to the server and return a HTTP request

export const getProducts = async (req, res) => { //uses async function to get data
    try{
        const productMessages = await ProductMessage.find() //find the products 
        console.log(productMessages);
        res.status(200).json(productMessages); //returns the product in JSON format with a status of 200 meaning "OK"
    } catch (error) {
        res.status(404).json({error});
    }
}

export const createProduct = async (req, res) => {//req = request and res = response
    const product = req.body; //req = request 
    const newProduct = new ProductMessage(product); //sends the new product in the format schema
    try {
        await newProduct.save(); //creates a new product and returns with a 201 status meaning "created"
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({error});
    }
}

export const updateProduct = async (req, res) => {
    const {id: _id} = req.params;//get post ID 
    const product = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');//checks for posts with the ID
    
    const updatedProduct = await ProductMessage.findByIdAndUpdate(_id, {...product, _id}, {new: true}); //finds product with ID and updates it 
    
    res.json(updatedProduct);//responds with the updated product
    
}

export const updateStock = async (req, res) => {//similar to above but only updates the stock
    const {id: _id} = req.params;
    const product = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    const updatedStock = await ProductMessage.findByIdAndUpdate(_id, {inStock: product.inStock - product.unitsRented, _id}, {new: true});
    
    res.json(updatedStock);
    
}
