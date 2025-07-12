/**
 * Módulo de autenticación para el sistema
 * Maneja tokens, sesiones y verificación de autenticación
 */

class AuthManager {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api_v1';
        this.tokenKey = 'adminToken';
        this.adminDataKey = 'adminData';
    }

    /**
     * Verifica si el usuario está autenticado
     * @returns {boolean}
     */
    isAuthenticated() {
        const token = this.getToken();
        return token !== null && token !== undefined;
    }

    /**
     * Obtiene el token almacenado
     * @returns {string|null}
     */
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Obtiene los datos del administrador
     * @returns {object|null}
     */
    getAdminData() {
        const data = localStorage.getItem(this.adminDataKey);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Guarda el token y datos del administrador
     * @param {string} token 
     * @param {object} adminData 
     */
    setAuthData(token, adminData) {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.adminDataKey, JSON.stringify(adminData));
    }

    /**
     * Limpia los datos de autenticación
     */
    clearAuthData() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.adminDataKey);
    }

    /**
     * Realiza el login del administrador
     * @param {string} admin_name 
     * @param {string} admin_password 
     * @returns {Promise<object>}
     */
    async login(admin_name, admin_password) {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    admin_name,
                    admin_password
                })
            });

            const data = await response.json();

            if (response.ok) {
                this.setAuthData(data.admin.token, {
                    id: data.admin.id,
                    name: data.admin.admin_name
                });
                return { success: true, data };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, error: 'Error de conexión' };
        }
    }

    /**
     * Realiza el logout
     */
    logout() {
        this.clearAuthData();
        window.location.href = '/index.html';
    }

    /**
     * Obtiene los headers con el token para peticiones autenticadas
     * @returns {object}
     */
    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    /**
     * Verifica si el token es válido
     * @returns {Promise<boolean>}
     */
    async verifyToken() {
        if (!this.isAuthenticated()) {
            return false;
        }

        try {
            const response = await fetch(`${this.apiUrl}/admin`, {
                headers: this.getAuthHeaders()
            });
            return response.ok;
        } catch (error) {
            console.error('Error verificando token:', error);
            return false;
        }
    }

    /**
     * Redirige al login si no está autenticado
     */
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/index.html';
            return false;
        }
        return true;
    }

    /**
     * Redirige al dashboard si ya está autenticado
     */
    redirectIfAuthenticated() {
        if (this.isAuthenticated()) {
            window.location.href = '/views/dashboard/index.html';
            return true;
        }
        return false;
    }
}

// Crear instancia global
const auth = new AuthManager();

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
} 