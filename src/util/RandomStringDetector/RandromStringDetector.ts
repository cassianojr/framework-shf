import { ENGLISH } from "./bigrams/BigramsEnglish";
import { PORTUGUESE_WITHOUT_ACCENTS } from "./bigrams/BigramsPortuguese";

export enum SupportedLanguages {
  ENGLISH = "english",
  PORTUGUESE = "portuguese"
}

export default class RandomStringDetector {

  private bigrams_probs: Readonly<Record<string, number>>;
  private commonBigramsThreshold: number;
  private uncommonBigramsThreshold: number;
  private duplicatedBigramsThreshold: number;
  private allowNumbers: boolean;

  constructor(language: SupportedLanguages, commonBigramsThreshold = 0.1, uncommonBigramsThreshold = 0.5, duplicatedBigramsThreshold = 0.33, allowNumbers = false) {
    this.commonBigramsThreshold = commonBigramsThreshold;
    this.uncommonBigramsThreshold = uncommonBigramsThreshold;
    this.duplicatedBigramsThreshold = duplicatedBigramsThreshold;
    this.allowNumbers = allowNumbers;

    this.bigrams_probs = PORTUGUESE_WITHOUT_ACCENTS;

    if (language === SupportedLanguages.ENGLISH) {
      this.bigrams_probs = ENGLISH;
    }
  }

  private isRandomWord(word: string): boolean {

    // Allow only words longer than 3 characters
    if (this.allowNumbers) {
      // Allow letters and numbers
      if (word.length < 4) return false;
    } else {
      // Allow only letters
      if (word.length < 4 || !this.isAlphaNumeric(word)) return false;
    }

    // Return true if the word is a single character repeated multiple times
    if (word.split('').every((val, i, arr) => val === arr[0])) return true;

    word = word.toLowerCase();

    // get list of bigrams from the word
    const bigrams = this.getBigrams(word);

    const commonBigramsCount = this.countCommonBigrams(bigrams);
    const uncommonBigramsCount = bigrams.length - commonBigramsCount;
    const duplicatedBigramsCount = bigrams.filter((bigram, index) => bigrams.indexOf(bigram) !== index).length;

    // Higher number wins
    // if uncommonBigramsCount is more than n of the bigrams, return true
    if (uncommonBigramsCount / bigrams.length > this.uncommonBigramsThreshold) return true;
    // if more than n of the bigrams are duplicated, return true
    if (duplicatedBigramsCount / bigrams.length > this.duplicatedBigramsThreshold) return true;

    return false;
  }

  private countCommonBigrams(bigrams: string[]): number {
    return bigrams.filter(bigram => this.bigrams_probs[bigram] > this.commonBigramsThreshold).length;
  }

  private getBigrams(word: string): string[] {
    const bigrams = [];
    for (let i = 0; i < word.length - 1; i++) {
      bigrams.push(word.slice(i, i + 2));
    }
    return bigrams;
  }
  private isAlphaNumeric(word: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(word);
  }

  private removeSpecialCharacters(text: string): string {
    return text.replace(/[^a-zA-Z0-9]/g, '');
  } 

  public isRandomText(text: string, threshold = 0.5): boolean {
    let counter = 0;
    text = this.removeSpecialCharacters(text);
    const words = text.split(' ');
    for(const word of words){
      if(this.isRandomWord(word)){
        counter++;
      }
    }

    if(counter / words.length > threshold) return true;

    return false;
  }
}