import type { StoreTypes } from "@/stores/theme.store";
import { Book, Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";

export const Header = ({ theme, setTheme }: StoreTypes) => {
  return (
    <div className="flex justify-around w-full text-center items-center">
      <Book
        size={50}
        className={theme === "dark" ? "text-white" : "text-details"}
      />
      <div className="flex gap-3 items-center">
        <Switch
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="cursor-pointer dark:data-[state=checked]:bg-details"
          checked={theme === "dark"}
        />
        {theme === "dark" ? (
          <Moon color={theme === "dark" ? "#541388" : "black"} size={30} />
        ) : (
          <Sun color={theme === "dark" ? "#541388" : "black"} size={30} />
        )}
      </div>
    </div>
  );
};
