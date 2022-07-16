import {ADMIN_ROUTE, DISH_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, CATALOG_ROUTE} from "./utils/const";
import Admin from "./pages/Admin";
import Catalog from "./pages/Catalog";
import Auth from "./pages/Auth";
import DishPage from "./pages/DishPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
]

export const publicRoutes = [
    {
        path: CATALOG_ROUTE,
        Component: Catalog,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
    {
        path: DISH_ROUTE + '/:id',
        Component: DishPage,
    },
]