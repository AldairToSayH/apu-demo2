let vendedorActual = null;
let pedidoSeleccionado = null;
let productoEditando = null;

function cerrarModal(modalId) {
    const modal = modalId ? document.getElementById(modalId) : document.querySelector('.modal-overlay.show');
    if (modal) {
        modal.classList.remove('show');
    }
    pedidoSeleccionado = null;
    productoEditando = null;
}

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

window.cerrarModal = cerrarModal;
window.abrirModal = abrirModal;

function cargarVendedor() {
    const sesion = obtenerSesion();
    
    if (!sesion || sesion.rol !== 'vendedor') {
        window.location.href = '../login.html';
        return;
    }
    
    const vendedores = obtenerVendedores();
    vendedorActual = vendedores.find(v => v.usuarioId === sesion.id);
    
    if (!vendedorActual) {
        vendedorActual = {
            id: sesion.id,
            nombreTienda: 'Mi Tienda',
            perfilCompleto: false,
            pedidosTotales: 0,
            ventasTotales: 0,
            productosActivos: 0,
            rating: 0
        };
    }
    
    document.getElementById('userName').textContent = sesion.nombre;
    document.getElementById('userAvatar').src = sesion.avatar || 'https://via.placeholder.com/40';
    
    const profileAlert = document.getElementById('profileAlert');
    if (profileAlert) {
        if (vendedorActual && !vendedorActual.perfilCompleto) {
            profileAlert.style.display = 'flex';
        } else {
            profileAlert.style.display = 'none';
        }
    }
    
    cargarEstadisticas();
    cargarPedidosRecientes();
}

function cargarEstadisticas() {
    if (!vendedorActual) return;
    
    document.getElementById('pedidosTotal').textContent = vendedorActual.pedidosTotales;
    document.getElementById('ventasTotal').textContent = 'S/ ' + vendedorActual.ventasTotales;
    
    const productos = obtenerProductos();
    const misProductos = productos.filter(p => p.vendedor === vendedorActual.id);
    document.getElementById('productosActivos').textContent = misProductos.filter(p => p.estado === 'activo').length;
    document.getElementById('rating').textContent = vendedorActual.rating.toFixed(1);
}

function cargarPedidosRecientes() {
    if (!vendedorActual) return;
    
    const pedidos = obtenerPedidos();
    const misPedidos = pedidos.filter(p => p.tienda === vendedorActual.nombreTienda).slice(0, 5);
    const tbody = document.getElementById('pedidosRecientes');
    
    if (!tbody) return;
    
    if (misPedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #888;">No hay pedidos aún</td></tr>';
        return;
    }
    
    tbody.innerHTML = misPedidos.map(pedido => {
        const productosCount = pedido.productos ? pedido.productos.length : 0;
        
        return `
            <tr>
                <td>
                    <strong>${pedido.numeroOrden}</strong>
                </td>
                <td>${pedido.cliente?.nombre || 'Cliente'}</td>
                <td>${productosCount} producto(s)</td>
                <td><strong>S/ ${pedido.total}</strong></td>
                <td><span class="status-badge ${pedido.estado}">${pedido.estado.toUpperCase()}</span></td>
                <td>
                    <button class="action-btn edit" onclick="verDetallePedido('${pedido.id}')">VER</button>
                </td>
            </tr>
        `;
    }).join('');
}

function verDetallePedido(pedidoId) {
    const pedido = obtenerPedidoPorId(pedidoId);
    if (!pedido) return;
    
    pedidoSeleccionado = pedido;
    
    const productosHTML = pedido.productos.map(p => `
        <div style="display: flex; gap: 15px; padding: 10px 0; border-bottom: 1px solid #eee;">
            <img src="${p.imagen}" alt="${p.nombre}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <p style="font-weight: 600; color: #333; margin: 0;">${p.nombre}</p>
                <p style="font-size: 12px; color: #888; margin: 5px 0 0;">Talla: ${p.talla} | Color: ${p.color} | Cant: ${p.cantidad}</p>
                <p style="font-weight: 700; color: #333; margin: 5px 0 0;">S/ ${p.precio * p.cantidad}</p>
            </div>
        </div>
    `).join('');
    
    const estados = ['origen', 'transito', 'destino', 'entregado'];
    const opcionesEstado = estados.map(e => 
        `<option value="${e}" ${pedido.estado === e ? 'selected' : ''}>${e.charAt(0).toUpperCase() + e.slice(1)}</option>`
    ).join('');
    
    document.getElementById('pedidoDetalle').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <h4 style="font-size: 14px; color: #333; margin-bottom: 10px;">Cliente</h4>
                <p style="font-weight: 600; color: #333; margin: 0;">${pedido.cliente?.nombre}</p>
                <p style="font-size: 13px; color: #666; margin: 5px 0 0;">${pedido.cliente?.email}</p>
                <p style="font-size: 13px; color: #666; margin: 5px 0 0;">${pedido.cliente?.telefono}</p>
            </div>
            <div>
                <h4 style="font-size: 14px; color: #333; margin-bottom: 10px;">Envío</h4>
                <p style="font-size: 13px; color: #666; margin: 0;">${pedido.envio?.direccion}</p>
                <p style="font-size: 13px; color: #666; margin: 5px 0 0;">${pedido.envio?.distrito}, ${pedido.envio?.ciudad}</p>
                <p style="font-size: 13px; color: #666; margin: 5px 0 0;">${pedido.envio?.region}</p>
            </div>
        </div>
        
        <h4 style="font-size: 14px; color: #333; margin: 20px 0 10px;">Productos</h4>
        ${productosHTML}
        
        <div style="display: flex; justify-content: space-between; padding: 15px 0; border-top: 2px solid #eee; margin-top: 15px;">
            <span style="font-weight: 700; color: #333;">Total</span>
            <span style="font-weight: 700; font-size: 18px; color: #333;">S/ ${pedido.total}</span>
        </div>
        
        <div style="background-color: #FAFAFA; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <label style="display: block; font-size: 12px; font-weight: 600; color: #333; margin-bottom: 10px;">Actualizar Estado</label>
            <select id="nuevoEstado" class="form-select" style="margin-bottom: 10px; padding: 10px;">
                ${opcionesEstado}
            </select>
            <button class="btn btn-primary" onclick="actualizarEstadoPedido('${pedido.id}')" style="padding: 10px 20px;">ACTUALIZAR ESTADO</button>
        </div>
    `;
    
    document.getElementById('pedidoModal').classList.add('show');
}

function actualizarEstadoPedido(pedidoId) {
    const nuevoEstado = document.getElementById('nuevoEstado').value;
    
    const resultado = actualizarEstadoPedido(pedidoId, nuevoEstado);
    
    if (resultado) {
        alert('Estado actualizado correctamente');
        cerrarModal('pedidoModal');
        cargarPedidosRecientes();
    } else {
        alert('Error al actualizar estado');
    }
}

function abrirProductoModal(productoId = null) {
    if (productoId) {
        const producto = obtenerProductoPorId(productoId);
        if (producto) {
            productoEditando = producto;
            document.getElementById('modalTitulo').textContent = 'Editar Producto';
            document.getElementById('productoNombre').value = producto.nombre;
            document.getElementById('productoCategoria').value = producto.categoria;
            document.getElementById('productoPrecio').value = producto.precio;
            document.getElementById('productoStock').value = producto.stock;
            document.getElementById('productoMaterial').value = producto.material;
            document.getElementById('productoDescripcion').value = producto.descripcion;
        }
    } else {
        productoEditando = null;
        document.getElementById('modalTitulo').textContent = 'Agregar Producto';
        document.getElementById('formProducto').reset();
    }
    
    document.getElementById('productoModal').classList.add('show');
}

function guardarProducto() {
    const datos = {
        nombre: document.getElementById('productoNombre').value.trim(),
        categoria: document.getElementById('productoCategoria').value,
        precio: parseFloat(document.getElementById('productoPrecio').value),
        stock: parseInt(document.getElementById('productoStock').value),
        material: document.getElementById('productoMaterial').value.trim(),
        descripcion: document.getElementById('productoDescripcion').value.trim()
    };
    
    if (!datos.nombre || !datos.categoria || !datos.precio) {
        alert('Por favor completa los campos requeridos');
        return;
    }
    
    if (productoEditando) {
        const productos = obtenerProductos();
        const indice = productos.findIndex(p => p.id === productoEditando.id);
        if (indice !== -1) {
            productos[indice] = { ...productos[indice], ...datos };
            guardarDatos('apu_productos', productos);
        }
    } else {
        datos.id = generarId();
        datos.imagen = 'https://via.placeholder.com/400';
        datos.vendedor = vendedorActual?.id;
        datos.tienda = vendedorActual?.nombreTienda || 'Mi Tienda';
        datos.estado = 'activo';
        datos.badge = null;
        datos.colores = ['natural'];
        datos.tallas = ['Única'];
        datos.peso = '0.5 kg';
        datos.dimensiones = '30 x 40 cm';
        datos.precioOriginal = null;
        
        const productos = obtenerProductos();
        productos.push(datos);
        guardarDatos('apu_productos', productos);
    }
    
    cerrarModal('productoModal');
    alert('Producto guardado correctamente');
    
    if (window.location.href.includes('productos.html')) {
        location.reload();
    }
}

function eliminarProducto(productoId) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        const productos = obtenerProductos();
        const productosFiltrados = productos.filter(p => p.id !== productoId);
        guardarDatos('apu_productos', productosFiltrados);
        location.reload();
    }
}

function abrirPerfilModal() {
    if (!vendedorActual) return;
    
    document.getElementById('perfilNombreTienda').value = vendedorActual.nombreTienda || '';
    document.getElementById('perfilDescripcion').value = vendedorActual.descripcion || '';
    document.getElementById('perfilUbicacion').value = vendedorActual.ubicacion || '';
    document.getElementById('perfilWhatsapp').value = vendedorActual.whatsapp || '';
    document.getElementById('perfilCategoria').value = vendedorActual.categoria || '';
    
    document.getElementById('perfilModal').classList.add('show');
}

function guardarPerfil() {
    if (!vendedorActual) return;
    
    const datos = {
        nombreTienda: document.getElementById('perfilNombreTienda').value.trim(),
        descripcion: document.getElementById('perfilDescripcion').value.trim(),
        ubicacion: document.getElementById('perfilUbicacion').value.trim(),
        whatsapp: document.getElementById('perfilWhatsapp').value.trim(),
        categoria: document.getElementById('perfilCategoria').value,
        perfilCompleto: true
    };
    
    if (!datos.nombreTienda) {
        alert('Por favor ingresa el nombre de tu tienda');
        return;
    }
    
    const vendedores = obtenerVendedores();
    const indice = vendedores.findIndex(v => v.id === vendedorActual.id);
    if (indice !== -1) {
        vendedores[indice] = { ...vendedores[indice], ...datos };
        guardarDatos('apu_vendedores', vendedores);
        Object.assign(vendedorActual, datos);
    }
    
    cerrarModal('perfilModal');
    document.getElementById('profileAlert').style.display = 'none';
    alert('Perfil actualizado correctamente');
}

function cerrarSesionVendedor() {
    cerrarSesion();
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    cargarVendedor();
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('show');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.show').forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });
});

window.verDetallePedido = verDetallePedido;
window.actualizarEstadoPedido = actualizarEstadoPedido;
window.abrirProductoModal = abrirProductoModal;
window.guardarProducto = guardarProducto;
window.eliminarProducto = eliminarProducto;
window.abrirPerfilModal = abrirPerfilModal;
window.guardarPerfil = guardarPerfil;
window.cerrarSesionVendedor = cerrarSesionVendedor;
window.guardarEnvio = function() { alert('Guardado'); cerrarModal('envioModal'); };
window.guardarDatosExportacion = function() { alert('Guardado'); cerrarModal('exportacionModal'); };