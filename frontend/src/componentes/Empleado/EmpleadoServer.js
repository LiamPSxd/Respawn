const API_URL = "http://127.0.0.1:8000/api/empleados/";

export const listaEmpleados = async () => {
    return await fetch(API_URL);
};

export const getEmpleado = async (empleadoId) => {
    return await fetch(`${API_URL}${empleadoId}`);
};

export const registerEmpleado = async (nuevoEmpleado) => {
    return await fetch(API_URL, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "nombre":String(nuevoEmpleado.nombre).trim(),
            "direccion":String(nuevoEmpleado.direccion).trim(),
            "salario":parseInt(nuevoEmpleado.salario),
        })
    });
};

export const updateEmpleado = async (empleadoId, updateEmpleado) => {
    return await fetch(`${API_URL}${empleadoId}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "nombre":String(updateEmpleado.nombre).trim(),
            "direccion":String(updateEmpleado.direccion).trim(),
            "salario":parseInt(updateEmpleado.salario),
        })
    });
};

export const deleteEmpleado = async (empleadoId) => {
    return await fetch(`${API_URL}${empleadoId}`, {
        method:'DELETE'
    });
};