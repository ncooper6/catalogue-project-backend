import mongoose from 'mongoose';

//mongoose model used to set a products data fields

const productSchema = mongoose.Schema({
    title: String,
    type: String,
    allStock: Number,
    inStock: Number,
    img: String,
    desc: String,
    uid: [Number],
    rented: [{type:String, default: 'false'}],
    returnDate: [{type: Date, default: null}]
})

const ProductMessage = mongoose.model('ProductMessage', productSchema);

export default ProductMessage;