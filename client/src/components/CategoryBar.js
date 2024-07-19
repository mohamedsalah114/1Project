import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const CategoryBar = observer(() => {
    const { course } = useContext(Context)
    return (
        <ListGroup className="mt-3">
            <h3>Категории</h3>
            {course.categories.map(category => <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={category.id === course.selectedCategory.id}
                onClick={() => course.setSelectedCategory(category)}
                key={category.id}>{category.title}</ListGroup.Item>)}
        </ListGroup>
    );
});

export default CategoryBar;