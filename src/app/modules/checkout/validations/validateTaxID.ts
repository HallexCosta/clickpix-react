const validateCPF = (cpf: string) => {
  // Add CPF validation logic here (or use a library)
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf) || /^\d{11}$/.test(cpf) // Example
}

const validateCNPJ = (cnpj: string) => {
  // Add CNPJ validation logic here (or use a library)
  return (
    /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj) || /^\d{14}$/.test(cnpj)
  ) // Example
}

// export const validateTaxID = (taxID: string) => validateCPF(taxID) ?
