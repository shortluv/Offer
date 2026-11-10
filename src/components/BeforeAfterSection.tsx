import React from 'react';
import { X, Check } from 'lucide-react';
import { COMPARISON_ROWS } from '../data/proposalData';

export const BeforeAfterSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Сравнение операционных моделей
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            Как салон теряет деньги сейчас и что меняется после внедрения
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Прямое сравнение классического ручного процесса записи через звонки и переписки с автоматизированной системой на базе Telegram.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-zinc-200 rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold text-zinc-700 uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6 w-1/3">Операционный процесс</th>
                <th className="py-3.5 px-4 sm:px-6 w-1/3 text-zinc-500">Без бота (текущая модель)</th>
                <th className="py-3.5 px-4 sm:px-6 w-1/3 text-zinc-950 bg-zinc-100/70">С Telegram-ботом записи</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-xs sm:text-sm">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-semibold text-zinc-900">
                    {row.criterion}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-zinc-600">
                    <div className="flex items-start gap-2">
                      <span className="p-0.5 rounded-full bg-zinc-100 text-zinc-400 shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5" />
                      </span>
                      <span>{row.withoutBot}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-zinc-900 font-medium bg-zinc-50/40">
                    <div className="flex items-start gap-2">
                      <span className="p-0.5 rounded-full bg-zinc-900 text-white shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{row.withBot}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
