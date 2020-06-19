const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function () {

    //Agrega nuevo cliente
    router.post('/clientes', auth, clientesController.nuevoCliente);
    
    //Obtiene todos los clientes
    router.get('/clientes', auth, clientesController.mostrarClientes);

    //Obtiene un cliente
    router.get('/clientes/:idCliente', auth, clientesController.mostrarCliente);

    //Actualiza un cliente
    router.put('/clientes/:idCliente', auth, clientesController.actualizarCliente);

    //Elimina un cliente
    router.delete('/clientes/:idCliente', auth, clientesController.eliminarCliente);


    /** PRODUCTOS */
    //Agrega nuevo producto
    router.post('/productos', auth, 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //Obtiene todos los productos
    router.get('/productos', auth, productosController.mostrarProductos);

    //Obtiene un producto
    router.get('/productos/:idProducto', auth, productosController.mostrarProducto);

    //Actualiza un producto
    router.put('/productos/:idProducto', auth, 
        productosController.subirArchivo,
        productosController.actualizarProducto
    );
    
    //Elimina un producto
    router.delete('/productos/:idProducto', auth, productosController.eliminarProducto);

    //Busca un producto
    router.post('/productos/buscar/:query', auth, productosController.buscarProducto);

    /** PEDIDOS */
    //Agrega nuevo pedido
    router.post('/pedidos/nuevo/:idUsuario', auth, pedidosController.nuevoPedido);
        
    //Obtiene todos los pedidos
    router.get('/pedidos', auth, pedidosController.mostrarPedidos);

    //Obtiene un pedido
    router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedido);

    //Actualiza un producto
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido);
    
    //Eliminar un pedido
    router.delete('/pedidos/:idPedido', auth, pedidosController.eliminarPedido);

    router.post('/crear-cuenta', usuariosController.registrarUsuario);

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}