export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // переводим из секунд
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
