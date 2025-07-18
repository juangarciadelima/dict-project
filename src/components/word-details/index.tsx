import type { Meanings, WordData } from "@/types/word.types";
import { ExternalLink } from "lucide-react";

export const WordDetails = ({ data }: { data?: WordData }) => {
  // These helper functions can be simplified
  const extractSynonyms = (meaning: Meanings) => meaning.synonyms;
  const extractAntonyms = (meaning: Meanings) => meaning.antonyms;

  return (
    <div className="w-full py-12 flex flex-col items-start">
      <div className="flex flex-col gap-5 mb-4">
        <span className="font-title text-5xl font-bold dark:text-white">
          {data?.word}
        </span>
        <span className="text-xl text-purple-600 font-phonetic">
          {data?.phonetic}
        </span>
      </div>

      <div className="flex flex-col gap-8">
        {data?.meanings.map((meaning: Meanings, idx: number) => {
          const synonyms = extractSynonyms(meaning);
          const antonyms = extractAntonyms(meaning);
          return (
            <div key={`meaning-${idx}`} className="flex flex-col gap-2">
              <span className="text-2xl italic font-details font-medium">
                {meaning.partOfSpeech}
              </span>
              <div>
                <span className="font-details text-gray-500 text-lg font-medium">
                  Meaning
                </span>
                <ul className="list-disc marker:text-purple-600 flex flex-col gap-4 pl-10 pr-6 py-4">
                  {meaning.definitions.map((definition, defIdx: number) => (
                    <li
                      key={`definition-${idx}-${defIdx}`}
                      className="font-details dark:text-white text-black text-lg font-medium ml-4"
                    >
                      {definition.definition}
                      {definition.example && (
                        <span className="text-gray-500 text-lg italic my-2 block">
                          "{definition.example}"
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {synonyms.length > 0 && (
                  <div className="flex items-center gap-6 mt-2">
                    <span className="text-gray-500 font-medium">Synonyms:</span>
                    {synonyms.map((synonym) => (
                      <span
                        key={synonym}
                        className="text-purple-600 font-bold text-lg"
                      >
                        {synonym}
                      </span>
                    ))}
                  </div>
                )}

                {antonyms.length > 0 && (
                  <div className="flex items-center gap-6 mt-2">
                    <span className="text-gray-500 font-medium">Antonyms:</span>
                    {antonyms.map((antonym) => (
                      <span
                        key={antonym}
                        className="text-purple-600 font-bold text-lg"
                      >
                        {antonym}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {data && data?.sourceUrls?.length > 0 && (
        <div className="mt-8">
          {data.sourceUrls.map((url, index) => (
            <div key={`source-${index}`} className="flex gap-3 mt-2">
              <span className="font-medium text-lg">Source:</span>
              <div className="flex gap-2 items-center">
                <a
                  className="text-gray-500 font-medium text-lg break-all"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url}
                </a>
                <ExternalLink
                  size={20}
                  className="text-gray-500 cursor-pointer flex-shrink-0"
                  onClick={() => window.open(url, "_blank")}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
