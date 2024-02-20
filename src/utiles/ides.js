export const saveID = (id, uno, marca) => {
    localStorage.setItem('id', id);
    localStorage.setItem('uno', uno);
    localStorage.setItem('marca', marca);
};

export const getID = () => {
    const id = localStorage.getItem('id');
    const uno = localStorage.getItem('uno');
    return { id, uno };
};


export const eliminarID = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('uno');
};

export const guadarUVP = (uvp) => {
    localStorage.setItem('uvp',uvp);
};

export const guadarUVD = (uvp) => {
    localStorage.setItem('uvd',uvp);
};

export const getUVP = () => {
    return localStorage.getItem('uvp');
};

export const getUVD = () => {
    return localStorage.getItem('uvd');
};

