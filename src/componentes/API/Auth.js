import {
    USER_KEY,
    USER_NAME
} from "../../var.config";

const LoginMethod = (datos) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (datos.email === 'email@algo.com') {
            localStorage.setItem(USER_KEY, 'email@algo.com')
            localStorage.setItem(USER_NAME, 'Santiago')
            resolve({
                status: true
            })
        } else {
            resolve({
                status: false,
                mensaje: "Por favor, verifica la contraseña y el email."
            })
        }
    }, 700);
})


const verificarAuth = () => {
    if (localStorage.getItem(USER_KEY)) {
        return true;
    } else {
        return false;
    }
}


export {
    LoginMethod, verificarAuth
}