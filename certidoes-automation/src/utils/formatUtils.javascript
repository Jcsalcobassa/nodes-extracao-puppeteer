const formatCpf = (cpf) => {
  if (!cpf) return null;
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatCnpj = (cnpj) => {
  if (!cnpj) return null;
  const cleaned = cnpj.replace(/\D/g, '');
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

const validateDocument = (doc) => {
  // Implemente validação real de CPF/CNPJ aqui
  return doc && doc.length > 0;
};

module.exports = { formatCpf, formatCnpj, validateDocument };
