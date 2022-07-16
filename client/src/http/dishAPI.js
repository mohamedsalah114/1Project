import {$authHost, $host} from "./index";

export const fetchCategory = async () => {
    const {data} = await $host.get('api/category')
    return data
}

export const fetchNationality = async () => {
    const {data} = await $host.get('api/nationality')
    return data
}

export const fetchSpecialGroup = async () => {
    const {data} = await $host.get('api/specialgroup')
    return data
}

export const fetchMeaSure = async () => {
    const {data} = await $host.get('api/measure')
    return data
}

export const fetchIngridients = async () => {
    const {data} = await $host.get('api/ingridient')
    return data
}

export const fetchOneDish = async (id) => {
    const {data} = await $host.get('api/dish/' + id)
    return data
}

export const fetchOneDishCompound = async (id) => {
    const {data} = await $host.get('api/compound/' + id)
    return data
}

export const fetchComments = async (id) => {
    const {data} = await $host.get('api/comments/' + id)
    return data
}

export const postComment = async (comment) => {
    const {data} = await $authHost.get('api/comments', comment)
    return data
}

export const fetchDishes = async (category_id, nationality_id, special_group_id, ingridientsArray, page, limit) => {
    const {data} = await $host.get('api/dish', {
            params: {
                category_id,
                nationality_id,
                special_group_id,
                ingridientsArray,
                page,
                limit
            }
        }
    )
    return data
}

export const createDish = async (dish) => {
    const {data} = await $host.post('api/dish', dish)
    return data
}

