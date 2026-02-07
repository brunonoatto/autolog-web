export const sanitizeChangedValue = (value: string) => {
  let result = value;
  result = result.replace(/\./g, ','); // 1. Troca ponto por vírgula na hora
  result = result.replace(/[^\d,]/g, ''); // 2. Remove caracteres inválidos (aceita apenas números e uma vírgula)
  const parts = result.split(',');
  if (parts?.length > 2) result = parts[0] + ',' + parts.slice(1).join(''); // 3. Impede mais de uma vírgula
  if (parts[1]?.length > 2) result = `${parts[0]},${parts[1].slice(0, 2)}`; // 4. Limita a 2 casas decimais enquanto digita (opcional, mas recomendado)

  return result;
};

export const formatToDisplayValue = (value: string) => {
  let result = value;
  if (result.startsWith(',')) result = '0' + result; // Se o usuário digitou apenas a vírgula (ex: ",5"), adicionamos o zero à esquerda

  // Se não tem vírgula, adiciona ",00"
  if (!result.includes(',')) {
    result += ',00';
  } else {
    // Se tem vírgula, garante duas casas decimais
    const [integer, decimal] = result.split(',');
    result = `${integer},${decimal.padEnd(2, '0')}`;
  }

  return result;
};
