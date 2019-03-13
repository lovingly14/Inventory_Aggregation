'use strict';
const { ProductController } = require('./../controllers/ProductController');
const { CategoryController } = require('./../controllers/CategoryController');
const { Router } = require('express');
const router = new Router();
//var json2xls = require('json2xls');
//router.use(json2xls.middleware);

/** PRODUCT */
router.post('/addProduct', ProductController.addProduct);
router.get('/showProduct', ProductController.showProduct);

/** CATEGORY */
router.post('/addCategory', CategoryController.addCategory);
router.get('/showCategory', CategoryController.showCategory);
router.get('/viewCategory', CategoryController.viewCategory);
router.get('/export', CategoryController.export);
router.get('/export-csv', CategoryController.export_csv);
router.get('/export-xlsx', CategoryController.export_xlsx);

/** something else */


module.exports = router;