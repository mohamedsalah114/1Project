import { $authHost, $host } from "./index";
import { jwtDecode as jwt_decode } from 'jwt-decode';


export const registration = async (email, password, username) => {
    const { data } = await $host.post('api/user/registration', { email, password, username })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    const token = jwt_decode(data.token)
    localStorage.setItem('userId', token.id)
    console.log(localStorage.getItem('userId'))
    return token
}

export const fetchName = async (userId) => {
    if (userId != null) {
        const { data } = await $host.get('api/user/name/' + userId)
        return data
    } else {
        return null
    }
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}