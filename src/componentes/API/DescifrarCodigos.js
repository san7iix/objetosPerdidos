const descifrar = (codigos) => {

    const {
        codigo1,
        codigo2
    } = codigos

    if (codigo1.length > 16 && codigo1.startsWith('01')) {
        return descifrarRegla1(codigo1);
    } else if (codigo1.length === 16 && codigo1.startsWith('01')) {
        return descifrarRegla2(codigo1,codigo2);
    } else if (codigo1.startsWith('+')) {
        return descifrarRegla3(codigo1,codigo2);
    }


}


const descifrarRegla1 = (codigo) =>{
    return {
        GTIN: codigo.substring(2,16),
        fecha: codigo.substring(18,24),
        lote: codigo.substring(26)
    }
}

const descifrarRegla2 = (codigo1, codigo2) =>{
    return {
        GTIN: codigo1.substring(2,16),
        fecha: codigo2.substring(2,8),
        lote: codigo2.substring(10)
    }
}

const descifrarRegla3 = (codigo1, codigo2) =>{
    return ({
        referencia: codigo1.substring(1,14),
        fecha: 'N/A',
        lote: codigo2.substring(10,18)
    })
}



export {
    descifrar
}