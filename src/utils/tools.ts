export const titleToLowerCase = (str: string) => {
  if (!(str && str.trim())) {
    return str;
  }
  const f = str.substring(0, 1).toLocaleLowerCase();
  const t = str.substring(1, str.length);
  return f + t;
};
