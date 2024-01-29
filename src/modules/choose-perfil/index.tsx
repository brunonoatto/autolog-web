import { Link } from "react-router-dom";

const ChoosePerfil = () => {
    return <>
        <Link to="prestador-servico" >Sou Prestador de Serviço</Link>
        <Link to="cliente" >Sou Cliente</Link>
    </>
}

export default ChoosePerfil;