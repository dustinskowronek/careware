export const validateInsuranceId = (id: string): boolean => {
  const pattern = /^[A-Z][0-9]{9}$/;
  return pattern.test(id);
};

export const validatePostalCode = (code: string): boolean => {
  const pattern = /^[0-9]{5}$/;
  return pattern.test(code);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const pattern = /^[+]?[0-9\s-()]{6,}$/;
  return pattern.test(phone);
};