import React from 'react';
import { TRANSPARENCY_POINTS } from '../data/proposalData';
import { Info, Check } from 'lucide-react';

export const TransparencySection: React.FC = () => {
  return (
    <section className="py-16 bg-[#F8F9FA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Прозрачность и границы проекта
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            Что важно учесть до запуска бота
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Мы честно фиксируем технические рамки текущей версии, чтобы ожидания на 100% совпадали с результатом внедрения.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRANSPARENCY_POINTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200 rounded-lg p-6 shadow-xs flex items-start gap-3.5"
            >
              <div className="p-1.5 rounded-md bg-zinc-100 text-zinc-700 shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-950 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reliability Guarantee */}
        <div className="mt-8 p-4 bg-white border border-zinc-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-700">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Стандарты запуска:</strong> Перед стартом реальных клиентов проводится сквозной тест сценариев с владельцем и мастерами.
            </span>
          </div>
          <span className="text-zinc-500 font-mono-numbers text-[11px]">
            SLA доступности бота 99.8%
          </span>
        </div>
      </div>
    </section>
  );
};
