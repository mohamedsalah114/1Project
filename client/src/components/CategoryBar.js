import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const CategoryBar = observer(() => {
    const {dish} = useContext(Context)
    return (
        <ListGroup className="mt-3">
            <h3>Категории</h3>
            {dish.categories.map(category => <ListGroup.Item
                style={{cursor: "pointer"}}
                active={category.id === dish.selectedCategory.id}
                onClick={() => dish.setSelectedCategory(category)}
                key={category.id}>{category.title}</ListGroup.Item>)}
        </ListGroup>
    );
});

export default CategoryBar;