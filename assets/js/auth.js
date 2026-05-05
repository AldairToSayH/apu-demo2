function registrarUsuario(datos) {
    const usuarios = obtenerDatos(STORAGE_KEYS.usuarios) || [];
    
    if (usuarios.find(u => u.email === datos.email)) {
        return { success: false, mensaje: 'Ya existe una cuenta con este correo electrónico' };
    }
    
    if (datos.password !== datos.confirmPassword) {
        return { success: false, mensaje: 'Las contraseñas no coinciden' };
    }
    
    if (datos.password.length < 6) {
        return { success: false, mensaje: 'La contraseña debe tener al menos 6 caracteres' };
    }
    
    const rol = datos.rol === 'vendedor' ? 'vendedor' : 'comprador';
    const idPrefix = rol === 'vendedor' ? 'vnd_' : 'usr_';
    
    const nuevoUsuario = {
        id: idPrefix + Date.now().toString(36).substr(2, 9),
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono,
        password: datos.password,
        rol: rol,
        avatar: 'https://via.placeholder.com/40',
        fechaRegistro: new Date().toISOString().split('T')[0],
        perfilCompleto: false
    };
    
    usuarios.push(nuevoUsuario);
    guardarDatos(STORAGE_KEYS.usuarios, usuarios);
    
    const { password, ...usuarioSinPassword } = nuevoUsuario;
    
    return { success: true, usuario: usuarioSinPassword, mensaje: 'Registro exitoso' };
}

function iniciarSesionUsuario(email, password) {
    const usuarios = obtenerDatos(STORAGE_KEYS.usuarios) || [];
    
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (!usuario) {
        return { success: false, mensaje: 'Correo o contraseña incorrectos' };
    }
    
    const sesionData = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        avatar: usuario.avatar || 'https://via.placeholder.com/40',
        telefono: usuario.telefono,
        fechaLogin: new Date().toISOString()
    };
    
    iniciarSesion(sesionData);
    
    return { success: true, usuario: sesionData, mensaje: 'Login exitoso' };
}

function cerrarSesionUsuario() {
    cerrarSesion();
    window.location.href = 'index.html';
}

function verificarAutenticacion() {
    if (!estaAutenticado()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function verificarRol(rolRequerido) {
    if (!verificarAutenticacion()) return false;
    
    const sesion = obtenerSesion();
    if (sesion.rol !== rolRequerido) {
        if (sesion.rol === 'vendedor') {
            window.location.href = '../vendedor/dashboard.html';
        } else {
            window.location.href = '../comprador/catalogo.html';
        }
        return false;
    }
    return true;
}

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
            button.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            input.type = 'password';
            button.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const formularioRegistro = document.getElementById('formularioRegistro');
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value.trim(),
                email: document.getElementById('email').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirmPassword').value,
                rol: document.querySelector('input[name="rol"]:checked')?.value || 'comprador'
            };
            
            if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
                document.getElementById('errorGeneral').textContent = 'Por favor completa todos los campos';
                document.getElementById('errorGeneral').style.display = 'block';
                document.getElementById('errorGeneral').className = 'auth-error show';
                return;
            }
            
            const resultado = registrarUsuario(formData);
            
            if (resultado.success) {
                document.getElementById('successMensaje').textContent = '¡Registro exitoso! Redirigiendo...';
                document.getElementById('successMensaje').style.display = 'block';
                document.getElementById('successMensaje').className = 'auth-success show';
                document.getElementById('errorGeneral').style.display = 'none';
                
                iniciarSesion(resultado.usuario);
                
                setTimeout(function() {
                    if (resultado.usuario.rol === 'vendedor') {
                        window.location.href = 'vendedor/dashboard.html';
                    } else {
                        window.location.href = 'comprador/catalogo.html';
                    }
                }, 1500);
            } else {
                document.getElementById('errorGeneral').textContent = resultado.mensaje;
                document.getElementById('errorGeneral').style.display = 'block';
                document.getElementById('errorGeneral').className = 'auth-error show';
            }
        });
    }
    
    const formularioLogin = document.getElementById('formularioLogin');
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                document.getElementById('errorLogin').textContent = 'Por favor completa todos los campos';
                document.getElementById('errorLogin').style.display = 'block';
                document.getElementById('errorLogin').className = 'auth-error show';
                return;
            }
            
            const resultado = iniciarSesionUsuario(email, password);
            
            if (resultado.success) {
                document.getElementById('errorLogin').style.display = 'none';
                
                setTimeout(function() {
                    if (resultado.usuario.rol === 'vendedor') {
                        window.location.href = 'vendedor/dashboard.html';
                    } else {
                        window.location.href = 'comprador/catalogo.html';
                    }
                }, 500);
            } else {
                document.getElementById('errorLogin').textContent = resultado.mensaje;
                document.getElementById('errorLogin').style.display = 'block';
                document.getElementById('errorLogin').className = 'auth-error show';
            }
        });
    }
    
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesionUsuario();
        });
    }
    
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            roleButtons.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            
            const radio = btn.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
    
    const urlActual = window.location.pathname;
    const esLogin = urlActual.includes('login.html');
    const esRegistro = urlActual.includes('registro.html');
    
    if (estaAutenticado() && (esLogin || esRegistro)) {
        const sesion = obtenerSesion();
        if (sesion && sesion.rol === 'comprador') {
            window.location.href = 'comprador/catalogo.html';
        } else if (sesion && sesion.rol === 'vendedor') {
            window.location.href = 'vendedor/dashboard.html';
        }
    }
});