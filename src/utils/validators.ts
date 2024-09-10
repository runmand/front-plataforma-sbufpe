export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais (e.g., 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Cálculo do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let firstVerifier = (sum * 10) % 11;
  if (firstVerifier === 10 || firstVerifier === 11) {
    firstVerifier = 0;
  }
  if (firstVerifier !== parseInt(cpf[9])) return false;

  // Cálculo do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  let secondVerifier = (sum * 10) % 11;
  if (secondVerifier === 10 || secondVerifier === 11) {
    secondVerifier = 0;
  }
  if (secondVerifier !== parseInt(cpf[10])) return false;

  return true;
};

export const validatePhone = (phone: string): boolean => {
  // Expressão regular para o formato +55(XX)XXXXX-XXXX
  const phoneRegex = /^\+55\(\d{2}\)\d{5}-\d{4}$/;

  return phoneRegex.test(phone);
};

export const validateEmail  = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}