import { createBrowserRouter } from "react-router-dom";

import ChoosePerfil from "@choose-perfil/index";
import Client from "@client/index";
import ServiceProvider from "@service-provider/index";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ChoosePerfil />,
    },
    {
        path: "/prestador-servico",
        element: <ServiceProvider />,
    },
    {
        path: "/cliente",
        element: <Client />,
    },

]);

export default router;