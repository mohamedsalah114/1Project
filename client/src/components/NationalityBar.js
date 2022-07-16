import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import moduleStyle from "../modules/NationalityBar.module.css"

const NationalityBar = observer(() => {
    const {dish} = useContext(Context)
    return (
        <Row className={moduleStyle.cardRow}>
            {dish.nationalities.map(nationality => <Card className={moduleStyle.card}
                                                         style={{cursor: "pointer"}}
                                                         text={nationality.id === dish.selectedNationality.id ? "danger" : "light"}
                                                         onClick={() => dish.setSelectedNationality(nationality)}
                                                         key={nationality.id}>
                {nationality.name}
            </Card>)}
        </Row>
    );
});

export default NationalityBar;