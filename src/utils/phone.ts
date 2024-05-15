export const formatPhone = (str: string) => {
  return str.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3");
};
