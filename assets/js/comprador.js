let catalogoActual = 'todos';
let paginaActual = 1;
const productosPorPagina = 8;

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const badge = document.getElementById('cartCount');
    if (badge) {
        badge.textContent = totalItems;
    }
}

function obtenerParametroURL(parametro) {
    const params = new URLSearchParams(window.location.search);
    return params.get(parametro);
}

function aplicarFiltroDesdeURL() {
    const categoria = obtenerParametroURL('categoria');
    if (categoria) {
        catalogoActual = categoria;
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.categoria === categoria) {
                btn.classList.add('active');
            }
        });
        
        return true;
    }
    return false;
}

function renderizarProductos(productos) {
    const grid = document.getElementById('productosGrid');
    if (!grid) return;
    
    if (productos.length === 0) {
        grid.innerHTML = '<p style="grid-column: span 4; text-align: center; color: #666; padding: 40px;">No se encontraron productos</p>';
        return;
    }
    
    const inicio = (paginaActual - 1) * productosPorPagina;
    const productosPagina = productos.slice(inicio, inicio + productosPorPagina);
    
    grid.innerHTML = productosPagina.map(producto => {
        let badgeHTML = '';
        if (producto.badge) {
            const badgeTexto = producto.badge === 'bestseller' ? 'BESTSELLER' : 
                          producto.badge === 'nuevo' ? 'NUEVO' : 'SALE';
            const badgeClase = producto.badge === 'bestseller' ? 'badge-black' : 
                           producto.badge === 'nuevo' ? 'badge-orange' : 'badge-pink';
            badgeHTML = `<span class="producto-badge ${badgeClase}">${badgeTexto}</span>`;
        }
        
        const precioHTML = producto.precioOriginal 
            ? `<strong>S/ ${producto.precio}</strong> <del>S/ ${producto.precioOriginal}</del>`
            : `<strong>S/ ${producto.precio}</strong>`;
        
        const primeraTalla = producto.tallas && producto.tallas.length > 0 ? producto.tallas[0] : 'Única';
        const primerColor = producto.colores && producto.colores.length > 0 ? producto.colores[0] : 'natural';
        
        return `
            <article class="producto-card" data-id="${producto.id}">
                <div class="producto-img-wrapper">
                    ${badgeHTML}
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                    <button class="add-to-cart-btn" onclick="agregarProductoCarrito('${producto.id}', '${primeraTalla}', '${primerColor}')">
                        AÑADIR AL CARRITO
                    </button>
                </div>
                <div class="producto-info">
                    <span class="producto-categoria">${producto.categoria.toUpperCase()}</span>
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <p class="producto-material">${producto.material}</p>
                    <p class="producto-precio">${precioHTML}</p>
                    <p class="producto-vendedor">${producto.tienda}</p>
                </div>
            </article>
        `;
    }).join('');
    
    renderizarPaginacion(productos.length);
}

function agregarProductoCarrito(productoId, talla, color) {
    const producto = obtenerProductoPorId(productoId);
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    const resultado = agregarAlCarrito(producto, 1, talla, color);
    if (resultado !== false) {
        actualizarContadorCarrito();
        alert('Producto añadido al carrito');
    }
}

function renderizarPaginacion(totalProductos) {
    const paginacion = document.getElementById('pagination');
    if (!paginacion) return;
    
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
    
    if (totalPaginas <= 1) {
        paginacion.innerHTML = '';
        return;
    }
    
    let html = '';
    
    if (paginaActual > 1) {
        html += `<button class="pagination-btn" onclick="cambiarPagina(${paginaActual - 1})"><i class="fas fa-chevron-left"></i></button>`;
    }
    
    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button class="pagination-btn ${i === paginaActual ? 'active' : ''}" onclick="cambiarPagina(${i})">${i}</button>`;
    }
    
    if (paginaActual < totalPaginas) {
        html += `<button class="pagination-btn" onclick="cambiarPagina(${paginaActual + 1})"><i class="fas fa-chevron-right"></i></button>`;
    }
    
    paginacion.innerHTML = html;
}

function cambiarPagina(pagina) {
    paginaActual = pagina;
    const productos = obtenerProductosActivos({ categoria: catalogoActual });
    renderizarProductos(productos);
    window.scrollTo({ top: 400, behavior: 'smooth' });
}

function filtrarPorCategoria(categoria) {
    catalogoActual = categoria;
    paginaActual = 1;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.categoria === categoria) {
            btn.classList.add('active');
        }
    });
    
    const productos = obtenerProductosActivos({ categoria: categoria });
    renderizarProductos(productos);
    
    const url = new URL(window.location.href);
    if (categoria === 'todos') {
        url.searchParams.delete('categoria');
    } else {
        url.searchParams.set('categoria', categoria);
    }
    window.history.pushState({}, '', url);
}

function buscarProducto(termino) {
    catalogoActual = 'todos';
    paginaActual = 1;
    
    const productos = obtenerProductosActivos({ categoria: 'todos', buscar: termino });
    renderizarProductos(productos);
}

function verProducto(productoId) {
    window.location.href = `producto.html?id=${productoId}`;
}

function agregarAFavoritos(productoId) {
    // Funcionalidad de favoritos
}

document.addEventListener('DOMContentLoaded', function() {
    const filtroAplicado = aplicarFiltroDesdeURL();
    const productos = obtenerProductosActivos({ categoria: filtroAplicado ? catalogoActual : 'todos' });
    renderizarProductos(productos);
    actualizarContadorCarrito();
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filtrarPorCategoria(btn.dataset.categoria);
        });
    });
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let timeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                buscarProducto(e.target.value);
            }, 300);
        });
    }
    
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
});