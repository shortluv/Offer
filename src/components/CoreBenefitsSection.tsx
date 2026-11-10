import React from 'react';
import { CORE_BENEFITS } from '../data/proposalData';

export const CoreBenefitsSection: React.FC = () => {
  return (
    <section id="benefits" className="py-16 bg-[#F8F9FA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Ключевые преимущества
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            Система, которая превращает Telegram в главный канал генерации выручки салона
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Внедрение специализированного бота устраняет ключевые точки потери клиентов: долгое
            ожидание ответа, неявки, языковой барьер и отсутствие работы с повторными визитами.
          </p>
        </div>

        {/* Asymmetric Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_BENEFITS.map((b) => (
            <div
              key={b.number}
              className="bg-white border border-zinc-200 rounded-lg p-6 flex flex-col justify-between hover:border-zinc-300 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-zinc-100">
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    {b.number}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-zinc-950 font-mono-numbers">
                      {b.metric}
                    </span>
                    <span className="text-[11px] text-zinc-500 ml-1.5 font-medium">
                      {b.metricLabel}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-zinc-950 mb-2 leading-snug">
                  {b.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-100 text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Включено в базовую конфигурацию
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
