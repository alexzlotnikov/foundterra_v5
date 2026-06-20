import { englishContent } from "@/content/siteContent";

interface LanguageDropdownProps {
  currentLanguage: "en" | "he";
  onLanguageChange: (language: "en" | "he") => void;
}

const LanguageDropdown = ({ currentLanguage, onLanguageChange }: LanguageDropdownProps) => {
  const languages = [
    { code: "en" as const, label: englishContent.navigation.languages.english, flag: "🇺🇸" },
    { code: "he" as const, label: englishContent.navigation.languages.hebrew, flag: "🇮🇱" },
  ];

  return (
    <label className="relative z-[220]">
      <span className="sr-only">Choose language</span>
      <select
        aria-label="Choose language"
        value={currentLanguage}
        onChange={(event) => onLanguageChange(event.target.value as "en" | "he")}
        className="h-8 cursor-pointer rounded-[2px] border border-[rgba(124,58,237,0.4)] bg-background px-2 text-xs text-foreground sm:h-9 sm:text-sm"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageDropdown;
