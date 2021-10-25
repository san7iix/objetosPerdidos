var json = require('../data/productos.json');


const buscarProductoGTIN = (GTIN, fecha, lote) => {
    const productos = json.productos;
    let producto = productos.find(producto => producto.GTIN === GTIN);

    if (producto) {
        producto.fecha = fecha;
        producto.lote = lote;

        return producto;
    }

    return null;

}

const buscarProductoReferencia = (referencia, fecha, lote) => {
    const productos = json.productos;
    let producto = productos.find(producto => producto.Reference === referencia);

    if (producto) {
        producto.fecha = fecha;
        producto.lote = lote;
        return producto;
    }

    return null;

}


const agregarProducto = (data) => {
    return {
        estado: true,
        mensaje: 'Producto agregado correctamente'
    };
}


export {
    agregarProducto,
    buscarProductoGTIN,
    buscarProductoReferencia
}