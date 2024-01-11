import i18next from 'i18next';

export default class Singularizer {
  private static endings_pt_br: { [key: string]: string } = {
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
    "ias": "ia"
  };

  private static endings_en: { [key: string]: string } = {
    ves: 'fe',
    ies: 'y',
    i: 'us',
    zes: 'ze',
    ses: 's',
    es: 'e',
    s: '',
    rs: 'r',
    cs: 'c',
    ms: 'm'
  };

  public static singularize(word: string): string {
    const endings = i18next.language === 'pt_br' ? Singularizer.endings_pt_br : Singularizer.endings_en;
    return word.replace(
      new RegExp(`(${Object.keys(endings).join('|')})$`, "i"),
      (r: string) => endings[r.toLowerCase()] || r
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