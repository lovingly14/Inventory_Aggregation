const { mongoose } = require('./mongoose');

var CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    },
    {
        timestamps: true
    });

let Category = mongoose.model('Category', CategorySchema);
module.exports = { Category };