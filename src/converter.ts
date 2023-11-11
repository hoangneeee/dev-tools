export function toCamelCase(input: string): string {
  const words = input.split(/[-_ ]/);
  const camelCasedWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return camelCasedWords.join('');
}

export function toSlug(input: string): string {
  return input.replace(/_/g, '-').toLowerCase();
}

export function toSnake(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}
