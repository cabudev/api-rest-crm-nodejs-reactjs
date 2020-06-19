const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function () {

    //Agrega nuevo cliente
    router.post('/clientes', clientesController.nuevoCliente);
    
    //Obtiene todos los clientes
    router.get('/clientes', auth, clientesController.mostrarClientes);

    //Obtiene un cliente
    router.get('/clientes/:idCliente', clientesController.mostrarCliente);

    //Actualiza un cliente
    router.put('/clientes/:idCliente', clientesController.actualizarCliente);

    //Elimina un cliente
    router.delete('/clientes/:idCliente', clientesController.eliminarCliente);


    /** PRODUCTOS */
    //Agrega nuevo producto
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //Obtiene todos los productos
    router.get('/productos', productosController.mostrarProductos);

    //Obtiene un producto
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    //Actualiza un producto
    router.put('/productos/:idProducto', 
        productosController.subirArchivo,
        productosController.actualizarProducto
    );
    
    //Elimina un producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    //Busca un producto
    router.post('/productos/buscar/:query', productosController.buscarProducto);

    /** PEDIDOS */
    //Agrega nuevo pedido
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);
        
    //Obtiene todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    //Obtiene un pedido
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    //Actualiza un producto
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);
    
    //Eliminar un pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    router.post('/crear-cuenta',
    usuariosController.registrarUsuario,

    );

    router.post('/iniciar-sesion',
    usuariosController.autenticarUsuario,
    );


    return router;
}