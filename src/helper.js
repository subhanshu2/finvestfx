export const titlecase = (input) => {
  if (!input) {
      return null;
  }
  return input
      .split(' ')
      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ');
};