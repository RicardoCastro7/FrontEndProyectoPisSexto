const URL = "http://localhost:5006/api"
const URLAPI = 'https://computacion.unl.edu.ec/uv/api/';
const URLA = 'http://localhost:3004/api/';

export const metodoGet = async (link, key) => {
    var cabecera = {
        "x-api-token": key,
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL+link,{
        method: "GET",
        headers: cabecera
    })).json();
  //  console.log((datos.info));
    return datos;
}  
//const URL = "http://172.26.0.3:3006/api"

export const InicioSesion = async (data) => {
    const headers = {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/sesion", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
        
    })).json();
    return datos;
}



export const ObtenerGet = async (key, url) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URL}/${url}`, {
        method: "GET",
        headers: headers,
    })).json();
    return datos;
}
export const getAPI = async (key,url) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URLAPI+url, {
        method: "GET",
        headers: headers,
    })).json();
    return datos;
}

export const postAPI = async (data, url, key) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-token": key,
      //  body: JSON.stringify(data)
    };

    const datos = await (await fetch(URLAPI+url , {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
        
    })).json();

    return datos;
};

export const PostGuardar = async (data, key, urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URL}/${urls}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    return datos;
}
