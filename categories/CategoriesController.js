const express = require('express'); 
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify'); // slugify is a format of get value or string and transforms into string tiny with arrows,
                                    //example: desenvolvimento-web

router.get('/admin/categories/new', (req, res) =>{
    res.render('admin/categories/new');
});

router.get('/categories/save', (req, res) =>{
    var title = req.body.title;
    if(title != undefined){

    } else {
        res.redirect('/admin/categories/new');
    }
});

//the form is ever post method
router.post('/categories/save', (req, res) =>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/');
        })
    } else {
        res.redirect('/admin/categories/new');
    }
});

router.get('/admin/categories', (req, res) =>{

    Category.findAll().then(categories => {
        res.render('admin/categories/index', {categories: categories}); //move categories to front-end, format json
    })

});

router.post('/categories/delete', (req, res) =>{
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)) { //is number
            Category.destroy({
                where: {
                    id: id //remove elemento by id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            })

        } else {// is not a number
            res.redirect('/admin/categories');
        }
    } else { //null
        res.redirect('/admin/categories');
    }

});

module.exports = router;