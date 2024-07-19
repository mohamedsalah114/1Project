import { $authHost, $host } from "./index";

export const fetchCategories = async () => {
    const { data } = await $host.get('api/category');
    return data;
}

export const fetchLanguages = async () => {
    const { data } = await $host.get('api/language');
    return data;
}

export const fetchTeachers = async () => {
    const { data } = await $host.get('api/teacher');
    return data;
}

export const fetchOneCourse = async (id) => {
    const { data } = await $host.get('api/course/' + id);
    return data;
}

export const fetchOneCourseDetails = async (id) => {
    const { data } = await $host.get('api/course/details/' + id);
    return data;
}

export const fetchCourses = async (category_id, language_id, teacher_id, page, limit) => {
    const { data } = await $host.get('api/course', {
        params: {
            category_id,
            language_id,
            teacher_id,
            page,
            limit
        }
    });
    return data;
}

export const createCourse = async (course) => {
    const { data } = await $authHost.post('api/course', course);
    return data;
}

export const signInToTheCourse = async (ids) => {
    const { data } = await $host.post('api/tickets/signIn', ids);
    return data;
}

export const fetchCheckTicket = async (student_id, course_id) => {
    const isBooked = await $host.get('api/tickets/checkTicket', {
        params: {
            student_id,
            course_id
        }
    });
    return isBooked;
}