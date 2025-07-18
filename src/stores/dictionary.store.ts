import { create } from 'zustand';

// Define word data types for better type safety
export interface WordPhonetic {
  text?: string;
  audio?: string;
}

export interface WordDefinition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface WordMeaning {
  partOfSpeech: string;
  definitions: WordDefinition[];
}

export interface WordData {
  word: string;
  phonetic?: string;
  phonetics?: WordPhonetic[];
  origin?: string;
  meanings: WordMeaning[];
}

export type DictionaryApiResponse = WordData[] | { title: string; message: string; resolution: string };

// Combined store interface
interface StoreState {
  // Theme state
  theme: string;
  setTheme: (theme: string) => void;
  
  // Dictionary state
  isLoading: boolean;
  error: string | null;
  wordData: DictionaryApiResponse | null;
  fetchWord: (word: string) => Promise<void>;
  resetWordData: () => void;
}

// Create the combined store
export const useStore = create<StoreState>((set) => ({
  // Theme management
  theme: localStorage.getItem('theme') || 'light',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },
  
  // Dictionary data management
  isLoading: false,
  error: null,
  wordData: null,
  
  fetchWord: async (word) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      set({ wordData: data, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An unknown error occurred', isLoading: false });
    }
  },
  
  resetWordData: () => set({ wordData: null, error: null })
}));

// For backward compatibility and explicit typing
export type StoreTypes = {
  theme: string;
  setTheme: (theme: string) => void;
};