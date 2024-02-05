const RegisterProvider = () => {
  return (
    <>
      Sessão de cadastro de prestador de serviço
      <form>
        <div className="grid md:grid-cols-3 gap-4 whitespace-nowrap">
          <label>
            Nome:
            <input id="username" name="username" type="text" />
          </label>

          <label>
            CNPJ:
            <input id="username" name="username" type="text" />
          </label>

          <label>
            Email:
            <input id="username" name="username" type="text" />
          </label>

          <label>
            Endereço:
            <input id="username" name="username" type="text" />
          </label>
        </div>
      </form>
    </>
  );
};

export default RegisterProvider;
