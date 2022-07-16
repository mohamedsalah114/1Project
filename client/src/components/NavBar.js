import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Context} from "../index";
import {ADMIN_ROUTE, LOGIN_ROUTE, CATALOG_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";
import {NavLink, useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
       user.setUser({})
       user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white', textDecoration: 'none'}} to={CATALOG_ROUTE}>MR RAMSAY</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"}
                                onClick={() => history.push(ADMIN_ROUTE)}>Добавить рецепт</Button>
                        <Button variant={"outline-danger"}
                                onClick={() => logOut()}
                                style={{marginLeft: '10px'}}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>}
            </Container>
        </Navbar>
    );
});

export default NavBar;