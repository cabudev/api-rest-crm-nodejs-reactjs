const Productos = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');

//Configuración del multer
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato NO válido'))
        }
    },
} 

//Pasar la configuracion de multer y el campo
const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje : error})
        }
        return next();
    })
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agrego un nuevo producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto) {
        res.json({mensaje : 'El producto solicitado no existe'});
        return next();
    }

    res.json(producto);
}

exports.actualizarProducto = async (req, res, next) => {
    try {
        //Construie un nuevo producto
        const productoNuevo = req.body;
 
        //verifica si hay imagen nueva
        if(req.file) {
            productoNuevo.imagen = req.file.filename;
        } else {
            const productoAnterior = await Productos.findById(req.params.idProducto);
            productoNuevo.imagen = productoAnterior.imagen;
        }
        
        const producto = await Productos.findOneAndUpdate({ _id : req.params.idProducto },
            productoNuevo, { new : true }
        );

        res.json(producto);    
    } catch (error) {
        console.log(error);
        next();        
    }
}

exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete( { _id : req.params.idProducto } );
        res.json( { mensaje : 'El producto ha sido eliminado con exito'} );
    } catch (error) {
        console.log(error);
        next();     
    }
}

exports.buscarProducto = async (req, res, next) => {
    try {
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}