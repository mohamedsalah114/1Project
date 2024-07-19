import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Context } from "../index";
import { ADMIN_ROUTE, LOGIN_ROUTE, CATALOG_ROUTE } from "../utils/const";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white', textDecoration: 'none' }} to={CATALOG_ROUTE}>PRO language</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"}
                            onClick={() => navigate(ADMIN_ROUTE)}>Добавить курс</Button>
                        <Button variant={"outline-danger"}
                            onClick={() => logOut()}
                            style={{ marginLeft: '10px' }}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>}
            </Container>
        </Navbar>
    );
});

export default NavBar;