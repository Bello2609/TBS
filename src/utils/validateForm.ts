export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  export const validateInvoiceAmount = (amount) => {
    return amount > 0;
  };
  export const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };
  
  export const validateInvoiceAmount = (amount: number): boolean => {
    return amount > 0;
  };