import React from 'react';
import { IMPLEMENTATION_STEPS } from '../data/proposalData';
import { CheckCircle2, Calendar } from 'lucide-react';

export const ImplementationStepsSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 bg-[#F8F9FA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            План интеграции
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            7 прозрачных этапов запуска за 3–5 рабочих дней
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Поэтапный процесс от первого брифа до приема реальных клиентов. Никаких простоев в работе салона — интеграция проходит параллельно.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMPLEMENTATION_STEPS.map((s, idx) => (
            <div
              key={s.step}
              className="bg-white border border-zinc-200 rounded-lg p-6 flex flex-col justify-between hover:border-zinc-300 transition-colors shadow-xs relative"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100">
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    Этап {s.step}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded">
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    <span>{s.time}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-950 mb-2 leading-snug">
                  {s.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                <span>Фиксируемый результат</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
