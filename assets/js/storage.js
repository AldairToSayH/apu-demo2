const STORAGE_KEYS = {
    usuarios: 'apu_usuarios',
    productos: 'apu_productos',
    vendedores: 'apu_vendedores',
    pedidos: 'apu_pedidos',
    carrito: 'apu_carrito',
    sesion: 'apu_sesion'
};

const DATOS_POR_DEFECTO = {
    usuarios: [
        { id: 'usr_001', nombre: 'Ana María Quispe', email: 'ana@email.com', telefono: '+51 984 123 456', password: 'password123', rol: 'comprador', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', fechaRegistro: '2026-01-15' },
        { id: 'usr_002', nombre: 'Carlos Mendoza', email: 'carlos@email.com', telefono: '+51 987 654 321', password: 'password123', rol: 'comprador', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', fechaRegistro: '2026-02-01' },
        { id: 'vnd_001', nombre: 'María Elena Ccallo', email: 'elena@artescusco.com', telefono: '+51 984 234 567', password: 'password123', rol: 'vendedor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', fechaRegistro: '2026-01-10', perfilCompleto: true },
        { id: 'vnd_002', nombre: 'Roberto Huanca', email: 'roberto@andescraft.com', telefono: '+51 985 345 678', password: 'password123', rol: 'vendedor', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', fechaRegistro: '2026-01-20', perfilCompleto: true },
        { id: 'vnd_003', nombre: 'Lucía Sumire', email: 'lucia@textilesmana.com', telefono: '+51 986 456 789', password: 'password123', rol: 'vendedor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', fechaRegistro: '2026-02-05', perfilCompleto: false }
    ],
    productos: [
        { id: 'prod_001', nombre: 'Poncho Inti Raymi', categoria: 'abrigos', precio: 380, precioOriginal: 480, material: '100% Alpaca Baby', descripcion: 'Poncho tejidos a mano con motivos del Inti Raymi. Fibra de alpaca baby seleccionadas de Cusco.', imagen: 'https://images.unsplash.com/photo-1596870230751-ebdfce989b97?w=400', stock: 15, vendedor: 'vnd_001', tienda: 'Artes Cusco', estado: 'activo', badge: 'bestseller', colores: ['rojo', 'negro', 'natural'], tallas: ['Única'], peso: '0.8 kg', dimensiones: '120 x 70 cm' },
        { id: 'prod_002', nombre: 'Chompa Qori', categoria: 'chompas', precio: 220, precioOriginal: null, material: 'Mezcla Alpaca-Merino', descripcion: 'Suéter de Alpaca con Merino. Diseño contemporáneo con colores andinos.', imagen: 'https://images.unsplash.com/photo-1434389677669-e08db4fec82c?w=400', stock: 25, vendedor: 'vnd_001', tienda: 'Artes Cusco', estado: 'activo', badge: null, colores: ['dorado', 'gris', 'marron'], tallas: ['S', 'M', 'L', 'XL'], peso: '0.5 kg', dimensiones: '60 x 50 cm' },
        { id: 'prod_003', nombre: 'Bufanda Pachamama', categoria: 'accesorios', precio: 95, precioOriginal: null, material: 'Alpaca Superfina', descripcion: 'Bufanda de alpaca superfina. Suavidad excepcional y colores naturales.', imagen: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400', stock: 40, vendedor: 'vnd_002', tienda: 'Andes Craft', estado: 'activo', badge: 'nuevo', colores: ['natural', 'marron', 'gris'], tallas: ['Única'], peso: '0.2 kg', dimensiones: '180 x 30 cm' },
        { id: 'prod_004', nombre: 'Vestido Saqsaywaman', categoria: 'vestidos', precio: 310, precioOriginal: 390, material: 'Algodón Pima & Alpaca', descripcion: 'Vestido largo con tejido de袖. Inspirado en las ruinas de Sacsayhuamán.', imagen: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', stock: 8, vendedor: 'vnd_002', tienda: 'Andes Craft', estado: 'activo', badge: 'sale', colores: ['rojo', 'azul', 'naranja'], tallas: ['S', 'M', 'L'], peso: '0.6 kg', dimensiones: '130 x 45 cm' },
        { id: 'prod_005', nombre: 'Abrigo Ausangate', categoria: 'abrigos', precio: 520, precioOriginal: null, material: '100% Alpaca Royal', descripcion: 'Abrigo de alpaca royal. Cálido y elegante para ocasiones especiales.', imagen: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400', stock: 5, vendedor: 'vnd_001', tienda: 'Artes Cusco', estado: 'activo', badge: null, colores: ['negro', 'marron'], tallas: ['M', 'L', 'XL'], peso: '1.2 kg', dimensiones: '100 x 60 cm' },
        { id: 'prod_006', nombre: 'Chaleco Willka', categoria: 'chompas', precio: 175, precioOriginal: 210, material: 'Alpaca Baby', descripcion: 'Chaleco tejido a mano con motivos andinos. Regenerable y elegante.', imagen: 'https://images.unsplash.com/photo-1591047139829-d91aecb6d1d9?w=400', stock: 12, vendedor: 'vnd_002', tienda: 'Andes Craft', estado: 'activo', badge: 'sale', colores: ['natural', 'verde'], tallas: ['S', 'M', 'L'], peso: '0.4 kg', dimensiones: '55 x 45 cm' },
        { id: 'prod_007', nombre: 'Gorro Chakana', categoria: 'accesorios', precio: 65, precioOriginal: null, material: 'Alpaca Superfina', descripcion: 'Gorro tradicional andino con símbolo de la Chakana. Tejido a mano.', imagen: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400', stock: 30, vendedor: 'vnd_001', tienda: 'Artes Cusco', estado: 'activo', badge: 'nuevo', colores: ['rojo', 'negro', 'azul'], tallas: ['Única'], peso: '0.15 kg', dimensiones: '25 x 20 cm' },
        { id: 'prod_008', nombre: 'Falda Qoya', categoria: 'vestidos', precio: 195, precioOriginal: null, material: 'Lana de Alpaca & Seda', descripcion: 'Falda larga con tejido tradicional. Mezcla de alpaca y seda.', imagen: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9p?w=400', stock: 18, vendedor: 'vnd_002', tienda: 'Andes Craft', estado: 'activo', badge: 'nuevo', colores: ['morado', 'rojo', 'azul'], tallas: ['S', 'M', 'L'], peso: '0.4 kg', dimensiones: '90 x 40 cm' },
        { id: 'prod_009', nombre: 'Chullo Tradicional', categoria: 'accesorios', precio: 55, precioOriginal: null, material: '100% Lana de Alpaca', descripcion: 'Gorro tradicional sys. Tejido en telar de cintura.', imagen: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400', stock: 45, vendedor: 'vnd_003', tienda: 'Textiles Mana', estado: 'activo', badge: null, colores: ['marron', 'negro', 'gris'], tallas: ['Única'], peso: '0.12 kg', dimensiones: '22 x 18 cm' },
        { id: 'prod_010', nombre: 'Poncho Wayllapunku', categoria: 'abrigos', precio: 450, precioOriginal: null, material: '100% Alpaca Baby', descripcion: 'Poncho de edición limitada con motivos de Sacsayhuamán.', imagen: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400', stock: 3, vendedor: 'vnd_003', tienda: 'Textiles Mana', estado: 'activo', badge: 'bestseller', colores: ['negro', 'rojo'], tallas: ['Única'], peso: '0.9 kg', dimensiones: '125 x 75 cm' }
    ],
    vendedores: [
        { id: 'vnd_001', usuarioId: 'vnd_001', nombreTienda: 'Artes Cusco', slug: 'artes-cusco', categoria: 'textiles', descripcion: 'Artes Cusco es una tienda familiar dedicada a textiles artesanales de Cusco.', ubicacion: 'Cusco, Peru', banner: 'https://images.unsplash.com/photo-1523906834658-6e4ef28fa3f5?w=800', logo: 'https://via.placeholder.com/150x150/E5B869/1A1A1A?text=AC', facebook: 'https://facebook.com/artescusco', instagram: 'https://instagram.com/artes_cusco', whatsapp: '+51 984234567', envioNacional: true, costoEnvio: 15, envioInternacional: true, costoEnvioInt: 45, perfilCompleto: true, fechaRegistro: '2026-01-10', pedidosTotales: 45, ventasTotales: 18500, productosActivos: 5, rating: 4.8 },
        { id: 'vnd_002', usuarioId: 'vnd_002', nombreTienda: 'Andes Craft', slug: 'andescraft', categoria: 'moda', descripcion: 'Andes Craft brings designs inspired by the Andean culture.', ubicacion: 'Cusco, Peru', banner: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', logo: 'https://via.placeholder.com/150x150/E67E22/FFFFFF?text=AC', facebook: 'https://facebook.com/andescraft', instagram: 'https://instagram.com/andescraft', whatsapp: '+51 985345678', envioNacional: true, costoEnvio: 12, envioInternacional: true, costoEnvioInt: 50, perfilCompleto: true, fechaRegistro: '2026-01-20', pedidosTotales: 32, ventasTotales: 12400, productosActivos: 4, rating: 4.6 },
        { id: 'vnd_003', usuarioId: 'vnd_003', nombreTienda: 'Textiles Mana', slug: 'textilesmana', categoria: 'textiles', descripcion: 'Textiles Mana es una cooperative de mujeres tejedoras del Valle Sagrado.', ubicacion: 'Urubamba, Cusco', banner: 'https://images.unsplash.com/photo-1469322897084-b784a1615c04?w=800', logo: 'https://via.placeholder.com/150x150/E5B869/1A1A1A?text=TM', facebook: '', instagram: '', whatsapp: '', envioNacional: false, costoEnvio: 0, envioInternacional: false, costoEnvioInt: 0, perfilCompleto: false, fechaRegistro: '2026-02-05', pedidosTotales: 5, ventasTotales: 2100, productosActivos: 2, rating: 4.5 }
    ],
    pedidos: [
        { id: 'ped_001', numeroOrden: 'APL-2026-0001', codigoSeguimiento: 'APL-TRK-001', comprador: 'usr_001', tienda: 'Artes Cusco', productos: [{ productoId: 'prod_001', nombre: 'Poncho Inti Raymi', cantidad: 1, precio: 380, talla: 'Única', color: 'rojo', imagen: 'https://images.unsplash.com/photo-1596870230751-ebdfce989b97?w=400' }], subtotal: 380, envio: 15, total: 395, estado: 'entregado', estadoHistorial: [{ estado: 'origen', fecha: '2026-01-20', nota: 'Pedido confirmado' }, { estado: 'transito', fecha: '2026-01-22', nota: 'En camino hacia Lima' }, { estado: 'destino', fecha: '2026-01-25', nota: 'Llegó a destino' }, { estado: 'entregado', fecha: '2026-01-26', nota: 'Entregado al cliente' }], fechaPedido: '2026-01-20', fechaEntrega: '2026-01-26', fechaEstimada: '2026-01-27', cliente: { nombre: 'Ana María Quispe', email: 'ana@email.com', telefono: '+51 984 123 456' }, envio: { direccion: 'Av. Ejercito 456, Dpto 301', distrito: 'Miraflores', ciudad: 'Lima', region: 'Lima', codigoPostal: '15074' }, pago: { metodo: 'Tarjeta de Crédito', ultimosDigitos: '4242', estado: 'pagado' } },
        { id: 'ped_002', numeroOrden: 'APL-2026-0002', codigoSeguimiento: 'APL-TRK-002', comprador: 'usr_001', tienda: 'Andes Craft', productos: [{ productoId: 'prod_003', nombre: 'Bufanda Pachamama', cantidad: 2, precio: 95, talla: 'Única', color: 'natural', imagen: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400' }], subtotal: 190, envio: 12, total: 202, estado: 'transito', estadoHistorial: [{ estado: 'origen', fecha: '2026-01-25', nota: 'Pedido confirmado' }, { estado: 'transito', fecha: '2026-01-27', nota: 'En tránsito' }], fechaPedido: '2026-01-25', fechaEntrega: null, fechaEstimada: '2026-02-01', cliente: { nombre: 'Ana María Quispe', email: 'ana@email.com', telefono: '+51 984 123 456' }, envio: { direccion: 'Av. Ejercito 456, Dpto 301', distrito: 'Miraflores', ciudad: 'Lima', region: 'Lima', codigoPostal: '15074' }, pago: { metodo: 'PayPal', ultimosDigitos: '', estado: 'pagado' } },
        { id: 'ped_003', numeroOrden: 'APL-2026-0003', codigoSeguimiento: 'APL-TRK-003', comprador: 'usr_002', tienda: 'Artes Cusco', productos: [{ productoId: 'prod_002', nombre: 'Chompa Qori', cantidad: 1, precio: 220, talla: 'L', color: 'dorado', imagen: 'https://images.unsplash.com/photo-1434389677669-e08db4fec82c?w=400' }, { productoId: 'prod_007', nombre: 'Gorro Chakana', cantidad: 1, precio: 65, talla: 'Única', color: 'rojo', imagen: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400' }], subtotal: 285, envio: 15, total: 300, estado: 'origen', estadoHistorial: [{ estado: 'origen', fecha: '2026-02-01', nota: 'Esperando preparación' }], fechaPedido: '2026-02-01', fechaEntrega: null, fechaEstimada: '2026-02-08', cliente: { nombre: 'Carlos Mendoza', email: 'carlos@email.com', telefono: '+51 987 654 321' }, envio: { direccion: 'Jr. Lima 234', distrito: 'Cercado', ciudad: 'Cusco', region: 'Cusco', codigoPostal: '08002' }, pago: { metodo: 'Transferencia', ultimosDigitos: '', estado: 'pendiente' } }
    ]
};

function inicializarStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.usuarios)) {
        guardarDatos(STORAGE_KEYS.usuarios, DATOS_POR_DEFECTO.usuarios);
    }
    if (!localStorage.getItem(STORAGE_KEYS.productos)) {
        guardarDatos(STORAGE_KEYS.productos, DATOS_POR_DEFECTO.productos);
    }
    if (!localStorage.getItem(STORAGE_KEYS.vendedores)) {
        guardarDatos(STORAGE_KEYS.vendedores, DATOS_POR_DEFECTO.vendedores);
    }
    if (!localStorage.getItem(STORAGE_KEYS.pedidos)) {
        guardarDatos(STORAGE_KEYS.pedidos, DATOS_POR_DEFECTO.pedidos);
    }
    if (!localStorage.getItem(STORAGE_KEYS.carrito)) {
        guardarDatos(STORAGE_KEYS.carrito, []);
    }
    if (!localStorage.getItem(STORAGE_KEYS.sesion)) {
        guardarDatos(STORAGE_KEYS.sesion, null);
    }
}

function guardarDatos(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
        return true;
    } catch (e) {
        console.error('Error guardando datos:', e);
        return false;
    }
}

function obtenerDatos(clave) {
    try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
    } catch (e) {
        console.error('Error obteniendo datos:', e);
        return null;
    }
}

function generarId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generarCodigoOrden() {
    const pedidos = obtenerDatos(STORAGE_KEYS.pedidos) || [];
    const numero = pedidos.length + 1;
    return 'APL-2026-' + numero.toString().padStart(4, '0');
}

function generarCodigoSeguimiento() {
    return 'APL-TRK-' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function obtenerCarrito() {
    return obtenerDatos(STORAGE_KEYS.carrito) || [];
}

function agregarAlCarrito(producto, cantidad, talla, color) {
    let carrito = obtenerCarrito();
    const itemExistente = carrito.find(
        item => item.productoId === producto.id && item.talla === talla && item.color === color
    );
    
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: generarId(),
            productoId: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad,
            talla: talla,
            color: color,
            vendedor: producto.vendedor,
            tienda: producto.tienda
        });
    }
    
    return guardarDatos(STORAGE_KEYS.carrito, carrito);
}

function actualizarCantidadCarrito(itemId, cantidad) {
    let carrito = obtenerCarrito();
    const item = carrito.find(el => el.id === itemId);
    if (item) {
        item.cantidad = cantidad;
        return guardarDatos(STORAGE_KEYS.carrito, carrito);
    }
    return false;
}

function eliminarDelCarrito(itemId) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(el => el.id !== itemId);
    return guardarDatos(STORAGE_KEYS.carrito, carrito);
}

function vaciarCarrito() {
    return guardarDatos(STORAGE_KEYS.carrito, []);
}

function calcularTotalCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function obtenerSesion() {
    return obtenerDatos(STORAGE_KEYS.sesion);
}

function iniciarSesion(usuario) {
    const sesion = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        avatar: usuario.avatar || 'https://via.placeholder.com/40',
        fechaLogin: new Date().toISOString()
    };
    return guardarDatos(STORAGE_KEYS.sesion, sesion);
}

function cerrarSesion() {
    return guardarDatos(STORAGE_KEYS.sesion, null);
}

function estaAutenticado() {
    const sesion = obtenerSesion();
    return sesion !== null;
}

function esVendedor() {
    const sesion = obtenerSesion();
    return sesion && sesion.rol === 'vendedor';
}

function esComprador() {
    const sesion = obtenerSesion();
    return sesion && sesion.rol === 'comprador';
}

function obtenerProductos() {
    return obtenerDatos(STORAGE_KEYS.productos) || [];
}

function obtenerProductoPorId(productoId) {
    const productos = obtenerProductos();
    return productos.find(p => p.id === productoId);
}

function obtenerProductosPorVendedor(vendedorId) {
    const productos = obtenerProductos();
    return productos.filter(p => p.vendedor === vendedorId);
}

function obtenerProductosActivos(filtro = {}) {
    let productos = obtenerProductos().filter(p => p.estado === 'activo');
    
    if (filtro.categoria && filtro.categoria !== 'todos') {
        productos = productos.filter(p => p.categoria === filtro.categoria);
    }
    
    if (filtro.buscar) {
        const termino = filtro.buscar.toLowerCase();
        productos = productos.filter(p => 
            p.nombre.toLowerCase().includes(termino) ||
            p.descripcion.toLowerCase().includes(termino)
        );
    }
    
    return productos;
}

function obtenerVendedores() {
    return obtenerDatos(STORAGE_KEYS.vendedores) || [];
}

function obtenerVendedorPorId(vendedorId) {
    const vendedores = obtenerVendedores();
    return vendedores.find(v => v.id === vendedorId);
}

function obtenerPedidos() {
    return obtenerDatos(STORAGE_KEYS.pedidos) || [];
}

function obtenerPedidoPorId(pedidoId) {
    const pedidos = obtenerPedidos();
    return pedidos.find(p => p.id === pedidoId);
}

function buscarPedidoPublico(numeroOrden, codigoSeguimiento) {
    const pedidos = obtenerPedidos();
    return pedidos.find(p => 
        p.numeroOrden === numeroOrden || p.codigoSeguimiento === codigoSeguimiento
    );
}

function obtenerPedidosPorComprador(compradorId) {
    const pedidos = obtenerPedidos();
    return pedidos.filter(p => p.comprador === compradorId);
}

function obtenerPedidosPorVendedor(vendedorId) {
    const vendedores = obtenerVendedores();
    const vendor = vendedores.find(v => v.id === vendedorId);
    if (!vendor) return [];
    const pedidos = obtenerPedidos();
    return pedidos.filter(p => p.tienda === vendor.nombreTienda);
}

function crearPedido(datosPedido) {
    const productos = obtenerCarrito();
    
    const subtotal = productos.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    const envio = datosPedido.envio || 15;
    const total = subtotal + envio;
    
    const pedido = {
        id: generarId(),
        numeroOrden: generarCodigoOrden(),
        codigoSeguimiento: generarCodigoSeguimiento(),
        comprador: datosPedido.comprador,
        productos: productos,
        subtotal: subtotal,
        envio: envio,
        total: total,
        estado: 'origen',
        estadoHistorial: [
            { estado: 'origen', fecha: new Date().toISOString().split('T')[0], nota: 'Pedido confirmado' }
        ],
        fechaPedido: new Date().toISOString().split('T')[0],
        fechaEstimada: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        cliente: {
            nombre: datosPedido.nombre,
            email: datosPedido.email,
            telefono: datosPedido.telefono
        },
        envio: {
            direccion: datosPedido.direccion,
            distrito: datosPedido.distrito,
            ciudad: datosPedido.ciudad,
            region: datosPedido.region,
            codigoPostal: datosPedido.codigoPostal
        },
        pago: {
            metodo: datosPedido.metodoPago,
            ultimosDigitos: datosPedido.metodoPago === 'tarjeta' ? datosPedido.numeroTarjeta.slice(-4) : '',
            estado: 'pagado'
        }
    };
    
    const vendedores = obtenerVendedores();
    const miTienda = vendedores.find(v => v.id === datosPedido.comprador);
    pedido.tienda = miTienda ? miTienda.nombreTienda : 'Tienda';
    
    const pedidos = obtenerPedidos();
    pedidos.push(pedido);
    guardarDatos(STORAGE_KEYS.pedidos, pedidos);
    vaciarCarrito();
    
    return pedido;
}

function actualizarEstadoPedido(pedidoId, nuevoEstado) {
    const pedidos = obtenerPedidos();
    const indice = pedidos.findIndex(p => p.id === pedidoId);
    
    if (indice !== -1) {
        pedidos[indice].estado = nuevoEstado;
        pedidos[indice].estadoHistorial.push({
            estado: nuevoEstado,
            fecha: new Date().toISOString().split('T')[0],
            nota: obtenerNotEstado(nuevoEstado)
        });
        
        if (nuevoEstado === 'entregado') {
            pedidos[indice].fechaEntrega = new Date().toISOString().split('T')[0];
        }
        
        return guardarDatos(STORAGE_KEYS.pedidos, pedidos);
    }
    
    return false;
}

function obtenerNotEstado(estado) {
    const notas = {
        'origen': 'Pedido confirmado',
        'transito': 'En tránsito',
        'destino': 'Llegó a destino',
        'entregado': 'Entregado al cliente'
    };
    return notas[estado] || 'Estado actualizado';
}

window.addEventListener('DOMContentLoaded', function() {
    inicializarStorage();
    
    window.inicializarDatosDemo = function() {
        localStorage.clear();
        inicializarStorage();
        alert('Datos reinicializados correctamente');
        location.reload();
    };
});