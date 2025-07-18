import { useThemeStore } from "./stores/theme.store";

import { InputSearch } from "./components/input-search";
import { Header } from "./components/header";
import { WordDetails } from "./components/word-details";
import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { processWordData } from "./processors/word-data.processor";
import type { WordData } from "./types/word.types";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [word, setWord] = useQueryState("word", { defaultValue: "" });

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
      console.log(processWordData(data));
      return processWordData(data);
    },
    enabled: false,
    gcTime: 0,
    staleTime: 0,
  });

  console.log(isError);

  window.addEventListener("storage", (event) => {
    if (event.key === "theme" && event.storageArea === localStorage) {
      setTheme(event?.newValue || "light");
    }
  });

  return (
    <>
      <div
        className={`${theme} flex min-w-screen min-h-screen flex-col items-center justify-center dark:bg-title transition-all overflow-hidden `}
      >
        <div className="flex flex-col w-4xl h-[800px] gap-10 items-center">
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
