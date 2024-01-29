import { createBrowserRouter } from "react-router-dom";

import ChoosePerfil from "@choose-perfil/index";
import Driver from "@driver/index";
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
        path: "/motorista",
        element: <Driver />,
    },

]);

export default router;