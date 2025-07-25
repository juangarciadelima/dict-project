import { useThemeStore } from "./stores/theme.store";
import { InputSearch } from "./components/input-search";
import { Header } from "./components/header";
import { WordDetails } from "./components/word-details";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { processWordData } from "./processors/word-data.processor";
import type { WordData } from "./types/word.types";
import { useEffect, useRef } from "react";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [word, setWord] = useQueryState("word", { defaultValue: "" });
  const isAutoFetched = useRef(false);

  const {
    data: wordData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["word", word],
    queryFn: async () => {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      const data: WordData[] = await response.json();
      return processWordData(data);
    },
    enabled: false,
    gcTime: 0,
    staleTime: 0,
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "theme" && event.storageArea === localStorage) {
      setTheme(event?.newValue || "light");
    }
  });

  useEffect(() => {
    if (word && !isAutoFetched.current) {
      refetch();
      isAutoFetched.current = true;
    }
  }, [word, refetch]);

  return (
    <>
      <div
        className={`${theme} flex min-h-screen flex-col items-center justify-center dark:bg-title transition-all overflow-y-auto`}
      >
        <div className="flex flex-col w-full max-w-xl gap-10 items-center p-5 sm:p-8 md:p-10">
          <Header theme={theme} setTheme={setTheme} />
          <InputSearch
            theme={theme}
            word={word}
            setWord={setWord}
            refetch={refetch}
          />
          <WordDetails
            data={wordData}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default App;
