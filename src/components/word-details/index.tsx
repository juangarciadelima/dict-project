import type { Meanings, WordData } from "@/types/word.types";
import { Skeleton } from "../ui/skeleton";

type WordDetailsProps = {
  data?: WordData;
  isLoading: boolean;
  isError: boolean;
};

export const WordDetails = ({ data, isLoading, isError }: WordDetailsProps) => {
  // These helper functions can be simplified
  const extractSynonyms = (meaning: Meanings) => meaning.synonyms;
  const extractAntonyms = (meaning: Meanings) => meaning.antonyms;

  if (isLoading) {
    return (
      <div className="h-full flex items-start justify-evenly flex-col w-full gap-5 ">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-[70px] w-[350px]" />
          <Skeleton className="h-[40px] w-[250px]" />
        </div>
        <div className="flex flex-col gap-10">
          <Skeleton className="h-[30px] w-[150px]" />
          <Skeleton className="h-[30px] w-[150px]" />
        </div>
        <div className="w-full flex flex-col gap-5">
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full" />
          <Skeleton className="h-[40px] w-full" />
        </div>
        <div></div>
        <Skeleton className="h-[20px] w-[300px]" />
      </div>
    );
  }

  const wordBaseStyle = "font-title text-5xl font-bold dark:text-white";

  if (isError) {
    return (
      <div className="flex items-center justify-center flex-col text-3xl gap-4">
        <span className="text-6xl"> 😭</span>
        <span className="font-bold text-xl font-details">
          No definitions found for your word.
        </span>
        <span className="text-gray-600 text-lg">
          We apologize for the inconvenience. Please try again later.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start">
      <div className="flex flex-col gap-5 mb-4">
        {data && data?.sourceUrls.length > 0 ? (
          <a
            className={` ${wordBaseStyle} hover:underline`}
            href={data?.sourceUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data?.word}
          </a>
        ) : (
          <span className={` ${wordBaseStyle}`}>{data?.word}</span>
        )}

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
    </div>
  );
};
