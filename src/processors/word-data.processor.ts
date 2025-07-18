import type { WordData } from "@/types/word.types";

export const processWordData: (data: WordData[]) => WordData = (
  data: WordData[],
) => {
  return {
    word: data[0].word,
    license: data[0].license,
    phonetic: data[0].phonetic,
    phonetics: data[0].phonetics,
    meanings: data[0].meanings,
    sourceUrls: data[0].sourceUrls,
  };
};
