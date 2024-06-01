export const highlightText = (
  text: string,
  query: string
): (string | JSX.Element)[] => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  const elements: (string | JSX.Element)[] = [];
  parts.forEach((part, index) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      elements.push(<strong key={index}>{part}</strong>);
    } else {
      elements.push(part);
    }
  });
  return elements;
};
