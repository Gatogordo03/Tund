function User_name() {
    const name = "Gatogordo03"; // Cambiar con DB para usuarios
    
    if (name) {
        return <h1>Bienvenido {name}</h1>
    }
    return <h1>Bienvenido Usuario</h1>
}

export default User_name