'use strict';
const { Product } = require('../schema/product');
const { ErrorHandler} = require('../utils/ErrorHandler');
const { Response } = require('../utils/Response');
const  mongoose  = require('mongoose');

class NewProductController {

    /** 
    * API | POST
    * Add a product to database
    * @example {
    *      name: String
    * }
    * @param {*} req 
    * @param {*} res 
    */
    static async addProduct(req, res) {
        try {
            let name = req.body.name;
            let price = req.body.price;
            let quantity = req.body.quantity;
            let categoryId = req.body.categoryId;
            let product = new Product({ name: name, price: price, quantity:quantity, categoryId: categoryId});
            await product.save();
            res.send({
                data: product,
                message: 'Product saved successfully',
                success: true,
                status: 200
            });
        } catch (error) {
            res.status(400).send({
                message: JSON.stringify(error),
                success: false,
                status: 400
            });
        }
    }


    /**
     * API | Get
     * Show Product list along with categories and parent category
     * @param {*} req 
     * @param {*} res 
     */
    static async showProduct(req, res) {
        let id = req.body.id;
        try{
            Product.aggregate([
                { 
                    $match: { _id: mongoose.Types.ObjectId(id)} 
                },
                {
                    $lookup: {
                        from: 'categories',                             
                        localField: 'categoryId',
                        foreignField: '_id',
                        as: 'category'
                    }
                }, 
                {
                    $lookup: {
                        from: 'categories',                             
                        localField: 'category.parentId',
                        foreignField: '_id',
                        as: 'ParentCategory'
                    }
                }, 
            ]).exec(function(err,data){
                return new Response(res, {Category:data},'success' );
            }); 
        }          
        catch (error) {
            ErrorHandler.sendError(res, error);
        }    
    }
}

module.exports = { NewProductController };