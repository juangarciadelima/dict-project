type License = {
  name: string;
  url: string;
};

type Definitions = {
  definition: string;
  antonyms: string[];
  synonyms: string[];
  example?: string;
};

export type Meanings = {
  antonyms: string[];
  definitions: Definitions[];
  partOfSpeech: string;
  synonyms: string[];
};

type Phonetics = {
  audio: string;
  license: License;
  sourceUrl: string;
};

export type WordData = {
  license: License;
  phonetic: string;
  phonetics: Phonetics[];
  meanings: Meanings[];
  sourceUrls: string[];
  word: string;
};
