const calculateDDay = (date: string) => {
  const eventDate = new Date(date);
  const today = new Date();
  const diff = Math.ceil(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) return "D-day";
  if (diff < 0) return "종료됨";
  return `D-${diff}`;
};
export { calculateDDay };
