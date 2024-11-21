/**
 * Formats a given number as a currency string in Brazilian Real (BRL).
 *
 * @param value - The numeric value to be formatted as currency.
 * @returns A string representing the formatted currency in "pt-BR" locale.
 */
export const formatCurrency = (value: number) => {
   return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
   }).format(value);
};
