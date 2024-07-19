import { makeAutoObservable } from "mobx";

export default class CourseStore {
    constructor() {
        this._categories = [];
        this._languages = [];
        this._teachers = [];
        this._selectedCategory = {};
        this._selectedLanguage = {};
        this._selectedTeacher = {};
        this._titleSearch = '';
        this._courses = [];
        this._selectedCourse = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;
        makeAutoObservable(this);
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setLanguages(languages) {
        this._languages = languages;
    }

    setTeachers(teachers) {
        this._teachers = teachers;
    }

    setTitleSearch(titleSearch) {
        this._titleSearch = titleSearch;
    }

    setCourses(courses) {
        this._courses = courses;
    }

    setSelectedCategory(category) {
        this.setPage(1);
        this._selectedCategory = category;
    }

    setSelectedLanguage(language) {
        this.setPage(1);
        this._selectedLanguage = language;
    }

    setSelectedTeacher(teacher) {
        this.setPage(1);
        this._selectedTeacher = teacher;
    }

    setSelectedCourse(course) {
        this._selectedCourse = course;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    get categories() {
        return this._categories;
    }

    get languages() {
        return this._languages;
    }

    get teachers() {
        return this._teachers;
    }

    get courses() {
        return this._courses;
    }

    get titleSearch() {
        return this._titleSearch;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get selectedLanguage() {
        return this._selectedLanguage;
    }

    get selectedTeacher() {
        return this._selectedTeacher;
    }

    get selectedCourse() {
        return this._selectedCourse;
    }

    get totalCount() {
        return this._totalCount;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }
}
