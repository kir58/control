const normalizeMoney = (value: string) : string => value.replace(/\s|[^\d]/g, '')
  .replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');

const prepareMoney = (str: string) : number => Number(str.replace(/\s/g, ''));

export { normalizeMoney, prepareMoney };
