import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface InputSearchProps {
  theme: string;
  word: string;
  setWord: (word: string) => void;
  refetch: () => void;
}

export const InputSearch = ({
  theme,
  word,
  setWord,
  refetch,
}: InputSearchProps) => {
  const queryClient = useQueryClient();

  const schema = z.object({
    word: z
      .string()
      .min(2, { message: "Word must be at least 2 characters" })
      .max(100, { message: "Word must be less than 100 characters" })
      .trim()
      .nonempty({ message: "Word is required" }),
  });

  type Schema = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      word: word || "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (data.word !== word) {
      setWord(data.word);
    }

    queryClient.removeQueries({ queryKey: ["word", data.word] });

    refetch();
  };

  return (
    <div className="w-full flex items-center justify-center flex-col gap-7">
      <form
        className="flex w-full justify-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full max-w-[600px] flex flex-col gap-2">
          <div className="w-full flex items-center gap-3">
            <Controller
              name="word"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  className={`w-full lg:text-xl text-sm ${
                    theme === "dark"
                      ? "hover:bg-gray-300/20"
                      : "hover:bg-gray-300/60"
                  } transition-colors`}
                  aria-invalid={!!errors.word}
                  onChange={(e) => {
                    field.onChange(e);
                    setWord(e.target.value);
                  }}
                  placeholder="Enter a word"
                />
              )}
            />
            <Button
              className="bg-details w-12 h-12 rounded-lg cursor-pointer hover:bg-details/80"
              type="submit"
              disabled={!word || word.length < 2}
            >
              <Search className="size-5" color="white" />
            </Button>
          </div>
          {errors.word && (
            <span className="text-red-600 text-sm">{errors.word.message}</span>
          )}
        </div>
      </form>

      <span className="flex gap-3 font-details dark:text-white">
        Press
        <kbd className="bg-details/80 lg:px-3 px-2 h-4/5 text-white opacity-100 font-mono font-sm">
          Enter
        </kbd>
        or <Search className="text-details" /> to find your word.
      </span>
    </div>
  );
};
