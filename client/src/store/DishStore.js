import {makeAutoObservable} from "mobx";

export default class DishStore{
    constructor() {
        this._categories = []
        this._nationalities = []
        this._specialGroups = []
        this._selectedCategory = {}
        this._selectedNationality = {}
        this._selectedSpecialGroup = {}
        this._ingridientSearch = ''
        this._selectedIngridientSearch = ''
        this._selectedSpecialGroup = {}
        this._dishes = []
        this._measure_id = {}
        this._ingridient = []
        this._selectedMeaSure = {}
        this._selectedIngridient = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setNationalities(nationalities) {
        this._nationalities = nationalities
    }
    setSpecialGroup(specialGroups) {
        this._specialGroups = specialGroups
    }
    setIngridientSearch(ingridientSearch) {
        this._ingridientSearch = ingridientSearch
    }
    setDish(dishes) {
        this._dishes = dishes
    }
    setMeaSure(measure_id) {
        this._measure_id = measure_id
    }
    setIngridient(ingridient) {
        this._ingridient = ingridient
    }
    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }
    setSelectedSpecialGroup(specialGroup) {
        this.setPage(1)
        this._selectedSpecialGroup = specialGroup
    }
    setSelectedNationality(nationality) {
        this.setPage(1)
        this._selectedNationality = nationality
    }
    setSelectedIngridientSearch(ingridientSearch) {
        this.setPage(1)
        this._selectedIngridientSearch = ingridientSearch
    }
    setSelectedMeaSure(measure_id) {
        this._selectedMeaSure = measure_id
    }
    setSelectedIngridient(ingridient) {
        this._selectedIngridient = ingridient
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }


    get categories(){
        return this._categories
    }
    get nationalities() {
        return this._nationalities
    }
    get specialGroup() {
        return this._specialGroups
    }
    get dishes() {
        return this._dishes
    }
    get ingridientSearch() {
        return this._ingridientSearch
    }
    get measure_id() {
        return this._measure_id
    }
    get ingridients() {
        return this._ingridient
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get selectedNationality() {
        return this._selectedNationality
    }
    get selectedSpecialGroup() {
        return this._selectedSpecialGroup
    }
    get selectedIngridientSearch() {
        return this._selectedIngridientSearch
    }
    get selectedMeaSure() {
        return this._selectedMeaSure
    }
    get selectedIngridient() {
        return this._selectedMeaSure
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}

