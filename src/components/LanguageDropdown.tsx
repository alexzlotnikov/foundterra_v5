import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import { englishContent } from "@/content/siteContent";

interface LanguageDropdownProps {
  currentLanguage: 'en' | 'he' | 'ru';
  onLanguageChange: (language: 'en' | 'he' | 'ru') => void;
}

const LanguageDropdown = ({ currentLanguage, onLanguageChange }: LanguageDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'en' as const, label: englishContent.navigation.languages.english, flag: '🇺🇸' },
    { code: 'he' as const, label: englishContent.navigation.languages.hebrew, flag: '🇮🇱' }
  ];
  
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1 px-2 py-1.5 h-8 sm:h-9 bg-background/80 backdrop-blur-sm hover:bg-accent transition-colors relative z-[220]">
          <span className="text-sm sm:text-base">{currentLang?.flag}</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[120px] bg-popover/95 backdrop-blur-sm border-border shadow-lg z-[230]"
        sideOffset={5}
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => {
              onLanguageChange(language.code);
              setIsOpen(false);
            }}
            className={`flex items-center gap-2 cursor-pointer transition-colors ${
              currentLanguage === language.code 
                ? 'bg-primary/10 text-primary font-medium' 
                : 'hover:bg-accent'
            }`}
          >
            <span className="text-sm sm:text-base">{language.flag}</span>
            <span className="text-xs sm:text-sm">{language.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;