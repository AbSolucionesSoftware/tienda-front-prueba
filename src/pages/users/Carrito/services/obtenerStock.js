
export function obtenerStockCarrito(carrito){
    var nuevo = carrito.articulos.map((res) => {
        if(res.idarticulo.activo === false){
            return [];
        }else{
            return res;
        }
    });
    return nuevo
}

export function obtenerSubtotal(cantidad, precio){
    const subtotal = precio * cantidad
   return subtotal;
}
