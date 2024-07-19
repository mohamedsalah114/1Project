import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";
import moduleStyle from "../modules/LanguageBar.module.css"

const LanguageBar = observer(() => {
    const { course } = useContext(Context)
    return (
        <Row className={moduleStyle.cardRow}>
            {course.languages.map(language => <Card className={moduleStyle.card}
                style={{ cursor: "pointer" }}
                text={language.id === course.selectedLanguage.id ? "danger" : "light"}
                onClick={() => course.setSelectedLanguage(language)}
                key={language.id}>
                {language.title}
            </Card>)}
        </Row>
    );
});

export default LanguageBar;