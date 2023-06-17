// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class Singularizer {
  private static endings: { [key: string]: string } = {
    ves: 'fe',
    ies: 'y',
    i: 'us',
    zes: 'ze',
    ses: 's',
    es: 'e',
    s: ''
  };

  public static singularize(word: string): string {
    return word.replace(
      new RegExp(`(${Object.keys(Singularizer.endings).join('|')})$`),
      (r: string) => Singularizer.endings[r]
    );
  }

  public static singularizeSentence(sentence: string): string {
    return sentence
      .toLowerCase()
      .split(' ')
      .map((word) => Singularizer.singularize(word))
      .join(' ')
      .toUpperCase();
  }
}