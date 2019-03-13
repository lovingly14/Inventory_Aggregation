'use strict';
const { Category } = require('../schema/Category');
const { ErrorHandler} = require('../utils/ErrorHandler');
const { Response } = require('../utils/Response');
const  mongoose  = require('mongoose');
const puppeteer = require('puppeteer');
const PDF_OUT = 'files/category.pdf';
const csv = require('fast-csv');  
const fs = require('fs');
var json2xls = require('json2xls');

class NewCategoryController {

    /**
     * API | Get
     * Show Category along with parent category
     * @param {*} req 
     * @param {*} res 
     */
    static async showCategory(req, res) {
        try {
            let id = req.body.id;

            Category.aggregate([
                {
                    $match: { _id: mongoose.Types.ObjectId(id)} 
                },
                {
                    $lookup:
                            {
                                from: 'categories',                             
                                localField: 'parentId',
                                foreignField: '_id',
                                as: 'category'
                            }
                },
                {
                    $project:
                            {
                                '_id':1,                             
                                'name':1,
                                'category':{'_id':1,'name':1}
                            }
                },
            ]).exec(function(err,data){                
                return new Response(res, {Category:data},'success' );
            });            
        } catch (error) {
            ErrorHandler.sendError(res, error);
        }
    }

    /**
     * API | Get
     * Show Category list
     * @param {*} req 
     * @param {*} res 
     */
    static async viewCategory(req, res) {
        try {
            await Category.find(function(err,data){
                res.render('../views/category.ejs',{
                    data:data
                });
            });            
        } catch (error) {
            ErrorHandler.sendError(res, error);
        }
    }

    /**
     * API | POST
     * Add category
     * @param {*} req 
     * @param {*} res 
     */
    static async addCategory(req, res) {
        try {
            let name = req.body.name;
            if (name == null) throw { code: 400, message: 'Name is required' };
            let category = new Category({ name: name, parentId : req.body.parentId });
            await category.save();
            return new Response(res, {
                data: category,
                message: 'category saved successfully',
            });
        } catch (error) {
            ErrorHandler.sendError(res, error);
        }
    }



    /**
     * API | Get
     * export category list as pdf
     * @param {*} req 
     * @param {*} res 
     */
    static async export(req, res){
        try{
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            //visit the page and wait till all asset & XHR calls are done.
            await page.goto('http://localhost:3000/api/viewCategory', {waitUntil: 'networkidle2'}); 
            await page.pdf({path: PDF_OUT , format: 'A4'});    
            await browser.close();
        }
        catch (error){
            ErrorHandler.sendError(res, error);
        }
    }


    /**
     * API | Get
     * export category list as csv
     * @param {*} req 
     * @param {*} res 
     */
    static async export_csv(req, res) {
        try {
            await Category.find(function(err,data){
                var ws = fs.createWriteStream('files/category.csv');
                csv.write(data, {
                    headers: true,
                    transform: function(row){
                        return {
                            _id: row._id,
                            name: row.name,
                            parentId: row.parentId
                        };
                    }
                }).pipe(ws);             
            });
        }catch (err) {
            ErrorHandler.sendError(res, err);
        }
    }



    /**
     * API | Get
     * export category list as xlsx
     * @param {*} req 
     * @param {*} res 
     */
    static async export_xlsx(req, res) {
        try {
            await Category.find(function(err,data){
                var xls = json2xls(data,{
                    fields: ['_id', 'name','parentId']
                });
                fs.writeFileSync('files/category.xlsx', xls, 'binary');
            });            
        } catch (err) {
            ErrorHandler.sendError(res, err);
        }
    }
}

module.exports = { NewCategoryController };
