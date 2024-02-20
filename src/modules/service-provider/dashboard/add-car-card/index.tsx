import LinkButton from '@shared/components/link-button';

const AddCarCard = () => {
  return (
    <LinkButton to="/prestador-servico/add-veiculo" className="md:hidden h-20 md:h-32">
      <h3>Adicionar veiculo</h3>
    </LinkButton>
  );
};

export default AddCarCard;
