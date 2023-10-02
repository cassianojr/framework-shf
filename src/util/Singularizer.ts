export default class Singularizer {
  private static endings: { [key: string]: string } = {
    "ões": "ão",
    "ães": "ão",
    "res": "r",
    "ses": "s",
    "zes": "z",
    "ais": "al",
    "eis": "el",
    "is": "il",
    "ns": "m",
    "les": "l",
    "óis": "ol",
    "uis": "ul",
    "us": "u",
    "ãos": "ão",
    "cis": "x",
    "xis": "x",
    "os": "o",
    "s": "",
    "cas": "ca",
    "ras": "ra",
    "ias":"ia"
  };

  public static singularize(word: string): string {
    return word.replace(
      new RegExp(`(${Object.keys(Singularizer.endings).join('|')})$`, "i"),
      (r: string) => Singularizer.endings[r.toLowerCase()] || r
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