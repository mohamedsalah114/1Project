import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup } from "react-bootstrap";

const SpecialGroupBar = observer(() => {
    const { course } = useContext(Context)
    return (
        <ListGroup className="mt-3">
            <h3>Специальные категории</h3>
            {course.specialGroup.map(specialGroup => <ListGroup.Item
                style={{ cursor: "pointer" }}
                active={specialGroup.id === course.selectedSpecialGroup.id}
                onClick={() => course.setSelectedSpecialGroup(specialGroup)}
                key={specialGroup.id}>{specialGroup.name}</ListGroup.Item>)}
        </ListGroup>
    );
});

export default SpecialGroupBar;