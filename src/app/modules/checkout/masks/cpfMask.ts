export const cpfMask = (digits: string) =>
  digits
    .replace(/(\d{3})/, '$1')
    .replace(/(\d{3})(\d{1,3})/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d{1,3})/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
    .trim()
