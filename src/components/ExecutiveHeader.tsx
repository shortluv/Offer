import React from 'react';
import { Calendar, FileCheck, Globe, DollarSign } from 'lucide-react';

interface ExecutiveHeaderProps {
  currency: 'RUB' | 'AMD' | 'USD';
  onCurrencyChange: (c: 'RUB' | 'AMD' | 'USD') => void;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  currency,
  onCurrencyChange,
}) => {
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600">
        {/* Left: Document Metadata */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-1.5 font-medium text-zinc-900">
            <FileCheck className="w-3.5 h-3.5 text-zinc-700" />
            <span className="font-mono-numbers">КП № 2026/BOT-SALON</span>
          </div>
          <span className="text-zinc-300 hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>Действительно на: {currentDate}</span>
          </div>
          <span className="text-zinc-300 hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>Локализация: Ереван / РФ / СНГ / International</span>
          </div>
        </div>

        {/* Right: Currency Selector */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-600 font-medium hidden sm:inline">Валюта расчетов:</span>
          <div className="inline-flex p-0.5 bg-zinc-100 rounded-md border border-zinc-200" role="group" aria-label="Выбор валюты">
            <button
              type="button"
              onClick={() => onCurrencyChange('RUB')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                currency === 'RUB'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              ₽ RUB
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange('AMD')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                currency === 'AMD'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              ֏ AMD
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange('USD')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                currency === 'USD'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
