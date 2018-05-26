var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var auth = require('../config/auth');
var isUser = auth.isUser;

//Get Shop model
var Shop = require('../models/shop');

// Get Product model
var Product = require('../models/product');

// Get Category model
var Category = require('../models/category');

/*
 * GET all products
 */
router.get('/all', isUser, function (req, res) {

    Shop.find(function (err, shops) {
        if (err)
            console.log(err);

        res.render('all_shops', {
            title: 'All Shops',
            shops: shops
        });
    });

});


/*
 * GET products by shops
 */
router.get('/:shopname', function (req, res) {

    var shopSlug = req.params.shopname;

    Shop.findOne({slug: shopSlug}, function (err, c) {
        Product.find({shopname: shopSlug}, function (err, products) {
            if (err)
                console.log(err);

            res.render('cat_products', {
                title: c.shopname,
                products: products
            });
        });
    });
});

/*
 * GET product details
 */
router.get('/:category/:product', function (req, res) {

    var galleryImages = null;
    var loggedIn = (req.isAuthenticated()) ? true : false;

    Product.findOne({slug: req.params.product}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
            var galleryDir = 'public/product_images/' + product._id + '/gallery';

            fs.readdir(galleryDir, function (err, files) {
                if (err) {
                    console.log(err);
                } else {
                    galleryImages = files;

                    res.render('product', {
                        title: product.title,
                        p: product,
                        galleryImages: galleryImages,
                        loggedIn: loggedIn
                    });
                }
            });
        }
    });

});

// Exports
module.exports = router;


