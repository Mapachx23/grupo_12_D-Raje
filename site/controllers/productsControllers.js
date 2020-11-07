const fs = require('fs')
const path = require('path')
const db = require(path.join(__dirname, '..', 'db', 'models'))
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = {

    detalleProducto: function(req, res) {
        idProducto = req.params.id
        let producto = dbProducts.filter(producto => {
            return producto.id == idProducto
        })
        res.render('detalleProducto', {
            title: 'Producto detallado',
            css: 'detalleProducto.css',
            producto: producto[0]
        })
    },

    cargaProducto: function(req, res) {
        res.render('cargaDeProducto', {
            title: 'Carga de producto',
            css: 'cargaProductos.css',
        })
    },

    agregarProducto:function(req,res){

        db.Products.create({
            nombre: req.body.nombre.trim(),
            marca: req.body.marca.trim(),
            precio:Number(req.body.precio),
            descuento:Number(req.body.descuento),
            descripcion:req.body.descripcion.trim(),
            image:(req.files[0])?req.files[0].filename:"default-image.jpg",
            estado:req.body.estado.trim(),
            categoria:req.body.categoria.trim(),
        })
        .then(product =>{
            res.redirect('/')
        })
        .catch(e =>{
            res.send(e)
        })
      /*   let ultimoId = 1
        dbProducts.forEach(producto=>{
            if(producto.id > ultimoId){
                ultimoId = producto.id
            }    
        })
        let nuevoProducto = {
            id : ultimoId + 1,
            nombre : req.body.nombre.trim(),
            marca: req.body.marca.trim(),
            precio:Number(req.body.precio),
            descuento:Number(req.body.descuento),
            estado:req.body.estado.trim(),
            descripcion:req.body.descripcion.trim(),
            categoria:req.body.categoria.trim(),
            imagen:(req.files[0])?req.files[0].filename:"default-image.jpg",
        }
        dbProducts.push(nuevoProducto)

        let productoJson = JSON.stringify(dbProducts)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'productos.json'),productoJson)
        res.redirect('/') */
    },

    mostrarProducto: function(req,res){
       db.Products.findByPk(req.params.id)
        .then(producto =>{
            res.render('mostrarProducto',{
                title: 'Editar Producto',
                css: 'home.css',
                producto: producto
    
            })
        })
        .catch(e=>{
            res.send(e)
        })
    },

    formProducto: function(req,res){
        db.Products.findByPk(req.params.id)
        .then(producto =>{
            res.render('editarProductos',{
            title: 'Editar Producto',
            css: 'detalleProducto.css',
            producto: producto
            }
        )
        })
        .catch(e=>{
            res.send(e)
        })
        
    },
    
    editarProducto: function(req,res){

            db.Products.update({
            nombre: req.body.nombre.trim(),
            marca: req.body.marca.trim(),
            precio:Number(req.body.precio),
            descuento:Number(req.body.descuento),
            descripcion:req.body.descripcion.trim(),
            image:(req.files[0])?req.files[0].filename:"default-image.jpg",
            estado:req.body.estado,
            categoria:req.body.categoria,
            },
            {
            where:{
                id:req.params.id
            }
        })
        .then(product=>{
            res.redirect('/')
        })
        .catch(e=>{
            res.send(e)
        })
        /* dbProducts.forEach(producto=>{
            if(producto.id == req.params.id){
                producto.nombre = req.body.nombre.trim()
                producto.marca = req.body.marca.trim()
                producto.precio = Number(req.body.precio),
                producto.descuento = Number(req.body.descuento),
                producto.estado = req.body.estado,
                producto.descripcion = req.body.descripcion.trim(),
                producto.categoria = req.body.categoria,
                producto.image = producto.image
            }
        });

        let productoJson = JSON.stringify(dbProducts)

        fs.writeFileSync(path.join(__dirname,'../data/productos.json'),productoJson,'utf-8');
        res.redirect('/products/show/'+ req.params.id) */

    },
    eliminarProducto: (req,res) =>{
        
         db.Products.destroy({
             where:{
                 id: req.params.id
             }
         })
         .then(product =>{
             res.redirect('/')
         })
         .catch(e => res.send(e))
      
        /* let indiceDelProducto;
    
        dbProducts.forEach(producto => {
            if(producto.id == req.params.id)
            indiceDelProducto = dbProducts.indexOf(producto)
        })
    
        dbProducts.splice( indiceDelProducto , 1);
        let productoJson =JSON.stringify(dbProducts);
    
        fs.writeFileSync(path.join(__dirname, '..' , 'data' , 'productos.json'), productoJson)
    
        res.redirect('/') */
    
    },

    listarTodos: function(req,res){

    db.Products.findAll()
    .then(result =>{
        res.render('productos',{
            title:'Resultado de la busqueda',
            css:'productos.css',
            productos: result,
        })
    })
    .catch(e => {
        res.send(e)
    })

    },
    buscar: function(req,res){
        let buscado = req.query.search
        if(buscado == ""){
            res.redirect('/')
        }

<<<<<<< HEAD
        /*let nombre = db.Produts.findAll({
            order : [
                ['nombre','ASC']
            ]
        });
        let marca = db.Produts.findAll({
            order : [
                ['marca','ASC']
            ]
        });
        Promise.all([generos,actores])
        .then(([generos,actores]) => {
            res.render('moviesAdd',{
                generos : generos,
                actores : actores
            })
        })
 */

    db.Products.findAll({
        where:{
            [Op.or]: [
            { nombre :{[Op.substring] : buscado }},
            { marca :{[Op.substring] : buscado }}, 
            ]
        }
    })
    .then(result =>{
        res.render('productos',{
            title:'Resultado de la busqueda',
            css:'home.css',
            productos: result,
=======
        db.Products.findAll({
            where:{
                [Op.or]: [
                { nombre :{[Op.substring] : buscado }},
                { marca :{[Op.substring] : buscado }},  
                { categoria : {[Op.substring] : buscado }},
                { precio:{[Op.lte] : buscado }},
                { estado : {[Op.substring] : buscado }}
                ]
            }
>>>>>>> 7db7adce1479452af130f56971865e11641880ac
        })
        .then(result =>{
            res.render('productos',{
                title:'Resultado de la busqueda',
                css:'home.css',
                productos: result,
            })
        })
    .catch(e => {
        res.send(e)
    })


        /*else{
            let encontrados = []
            dbProducts.forEach(producto =>{
            if(producto.nombre.toLowerCase().includes(buscado.toLowerCase())){
                encontrados.push(producto)
            }
            })
            res.render('productos',{
                title: 'Resultados de la búsqueda',
                css: 'h.css',
                productos : encontrados
            })
        }*/
    }
}