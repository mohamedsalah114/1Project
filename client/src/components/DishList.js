import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DishItem from "./DishItem";

const DishList = observer(() => {
    const {dish} = useContext(Context)
    return (
        <Row>
            {dish.dishes.map(dish =>
                <DishItem key={dish.id} dish={dish}/>
            )}
        </Row>
    );
});

export default DishList;