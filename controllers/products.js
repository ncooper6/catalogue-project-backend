import mongoose from 'mongoose';
import ProductMessage from '../models/productMessage.js';

export const getProducts = async (req, res) => {
    try{
        const productMessages = await ProductMessage.find()
        console.log(productMessages);
        res.status(200).json(productMessages);
    } catch (error) {
        res.status(404).json({error});
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new ProductMessage(product);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({error});
    }
}

export const updateProduct = async (req, res) => {
    const {id: _id} = req.params;
    const product = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    const updatedProduct = await ProductMessage.findByIdAndUpdate(_id, {...product, _id}, {new: true});
    
    res.json(updatedProduct);
    
}

export const updateStock = async (req, res) => {
    const {id: _id} = req.params;
    const product = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    
    const updatedStock = await ProductMessage.findByIdAndUpdate(_id, {inStock: product.inStock - product.unitsRented, _id}, {new: true});
    
    res.json(updatedStock);
    
}
