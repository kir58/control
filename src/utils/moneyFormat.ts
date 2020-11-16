const moneyFormat = (num: number) : string => `${String(num).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')} ₽`;

export { moneyFormat };
