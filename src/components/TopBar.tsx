import React from 'react';
import { Printer, ArrowRight } from 'lucide-react';

interface TopBarProps {
  onScrollToSection: (sectionId: string) => void;
  onPrint: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onScrollToSection, onPrint }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection('hero');
            }}
            className="text-sm font-bold tracking-tight text-zinc-950 uppercase whitespace-nowrap hover:text-zinc-700 transition-colors"
          >
            Telegram Salon Bot
          </a>
          <span className="hidden sm:inline text-xs text-zinc-600">/</span>
          <span className="hidden sm:inline text-xs font-medium text-zinc-600 whitespace-nowrap">
            Коммерческое предложение
          </span>
        </div>

        {/* Zone 2: 4-5 Navigation Links (Single-line, concise) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-600">
          <button
            onClick={() => onScrollToSection('benefits')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Преимущества
          </button>
          <button
            onClick={() => onScrollToSection('simulator')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Сценарий бота
          </button>
          <button
            onClick={() => onScrollToSection('roi')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Экономика и ROI
          </button>
          <button
            onClick={() => onScrollToSection('roadmap')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Этапы запуска
          </button>
          <button
            onClick={() => onScrollToSection('brief')}
            className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Бриф для старта
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Print */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onPrint}
            aria-label="Распечатать или сохранить в PDF"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-500" />
            <span className="whitespace-nowrap">Печать / PDF</span>
          </button>
          <button
            type="button"
            onClick={() => onScrollToSection('contact')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <span>Тарифы и связь</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
