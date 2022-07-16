import React, {useContext, useEffect} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategory, fetchDishes, fetchIngridients, fetchNationality, fetchSpecialGroup} from "../http/dishAPI";
import SpecialGroupBar from "../components/SpecialGroupBar";
import DishList from "../components/DishList";
import Search from "../components/Search";
import Pages from "../components/Pages";

const Catalog = observer(() => {
    const {dish} = useContext(Context)

    useEffect(() => {
        fetchCategory().then(data => dish.setCategories(data))
        fetchNationality().then(data => dish.setNationalities(data))
        fetchSpecialGroup().then(data => dish.setSpecialGroup(data))
        fetchIngridients().then(data => dish.setIngridient(data))
    }, [])

    useEffect(() => {
        fetchDishes(dish.selectedCategory.id, dish.selectedNationality.id, dish.selectedSpecialGroup.id, dish.selectedIngridientSearch, dish.page, 8).then(data => {
            dish.setDish(data)
            dish.setTotalCount(data.length)
        })
    }, [dish.page, dish.selectedCategory, dish.selectedNationality, dish.selectedSpecialGroup, dish.selectedIngridientSearch])

    const clean = () => {
        if (!dish.selectedIngridientSearch){
            dish.setSelectedCategory('*')
            dish.setSelectedSpecialGroup('*')
            dish.setSelectedNationality('*')
        } else {
            window.location.reload()
        }
    }

    return (
        <Container>
            <Row className="mt-3">
                <Search/>
            </Row>
            <Row className="mt-3">
                <Col md={9}>
                    <DishList/>
                </Col>
                <Col md={3}>
                    <CategoryBar/>
                    <SpecialGroupBar className="mt-3"/>
                    <Button className="mt-3" variant="outline-danger" onClick={clean}>Очистить</Button>
                </Col>
            </Row>
            <Pages/>
        </Container>
    );
});

export default Catalog;