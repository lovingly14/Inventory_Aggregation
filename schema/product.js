const { mongoose } = require('./mongoose');

var productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },

        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
    },
    {
        timestamps: true
    });

let Product = mongoose.model('Product', productSchema);
module.exports = { Product };