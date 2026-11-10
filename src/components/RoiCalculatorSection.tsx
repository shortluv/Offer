import React, { useState } from 'react';
import { Calculator, TrendingUp, ShieldAlert, Clock, RefreshCw } from 'lucide-react';
import { Currency, calculateSalonRoi, formatCurrency, PRICING_DATA } from '../utils/calculator';

interface RoiCalculatorSectionProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({
  currency,
  onCurrencyChange,
}) => {
  const defaultAvgCheck = currency === 'AMD' ? 12000 : currency === 'USD' ? 30 : 2500;
  const setupCost = PRICING_DATA.standardSetup[currency];

  const [mastersCount, setMastersCount] = useState<number>(3);
  const [avgCheck, setAvgCheck] = useState<number>(defaultAvgCheck);
  const [clientsPerMasterDay, setClientsPerMasterDay] = useState<number>(5);
  const [workingDaysMonth, setWorkingDaysMonth] = useState<number>(26);
  const [noShowRatePercent, setNoShowRatePercent] = useState<number>(15);

  // Sync avgCheck when currency changes if it was at previous default
  React.useEffect(() => {
    setAvgCheck(defaultAvgCheck);
  }, [currency]);

  const roi = calculateSalonRoi(
    {
      mastersCount,
      avgCheck,
      clientsPerMasterDay,
      workingDaysMonth,
      noShowRatePercent,
    },
    setupCost
  );

  return (
    <section id="roi" className="py-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Экономика и расчет окупаемости
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            Калькулятор финансового эффекта для вашего салона
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Оцените реальную отдачу от внедрения бота: сокращение пустых окон, привлечение ночных
            заявок и возврат постоянных клиентов.
          </p>
        </div>

        {/* Currency Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Валюта расчета:
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              (пересчет чека, выручки и стоимости бота)
            </span>
          </div>

          <div className="inline-flex p-1 bg-white rounded-lg border border-zinc-200 shadow-2xs" role="group" aria-label="Валюта калькулятора">
            <button
              type="button"
              onClick={() => onCurrencyChange('RUB')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                currency === 'RUB'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              ₽ Рубли (RUB)
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange('AMD')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                currency === 'AMD'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              ֏ Драмы (AMD)
            </button>
            <button
              type="button"
              onClick={() => onCurrencyChange('USD')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              $ Доллары (USD)
            </button>
          </div>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-zinc-50 border border-zinc-200 rounded-lg p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4 text-zinc-700" />
                <span>Параметры салона</span>
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                Расчет в реальном времени
              </span>
            </div>

            {/* Slider 1: Masters */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-900 mb-2">
                <label htmlFor="masters-input">Количество мастеров в салоне:</label>
                <span className="font-mono-numbers text-sm text-zinc-950 font-bold">
                  {mastersCount} специалистов
                </span>
              </div>
              <input
                id="masters-input"
                type="range"
                min={1}
                max={15}
                value={mastersCount}
                onChange={(e) => setMastersCount(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                <span>1 мастер</span>
                <span>15 мастеров</span>
              </div>
            </div>

            {/* Slider 2: Average Check */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-900 mb-2">
                <label htmlFor="avg-check-input">Средний чек визита:</label>
                <span className="font-mono-numbers text-sm text-zinc-950 font-bold">
                  {formatCurrency(avgCheck, currency)}
                </span>
              </div>
              <input
                id="avg-check-input"
                type="range"
                min={currency === 'USD' ? 10 : currency === 'AMD' ? 3000 : 800}
                max={currency === 'USD' ? 150 : currency === 'AMD' ? 50000 : 10000}
                step={currency === 'USD' ? 5 : currency === 'AMD' ? 500 : 100}
                value={avgCheck}
                onChange={(e) => setAvgCheck(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer"
              />
            </div>

            {/* Slider 3: Clients per day per master */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-900 mb-2">
                <label htmlFor="clients-per-day">Клиентов в день на одного мастера:</label>
                <span className="font-mono-numbers text-sm text-zinc-950 font-bold">
                  {clientsPerMasterDay} визитов
                </span>
              </div>
              <input
                id="clients-per-day"
                type="range"
                min={1}
                max={10}
                value={clientsPerMasterDay}
                onChange={(e) => setClientsPerMasterDay(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer"
              />
            </div>

            {/* Slider 4: Current No-Show rate */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-900 mb-2">
                <label htmlFor="noshow-rate">Текущая доля неявок и забытых визитов (no-show):</label>
                <span className="font-mono-numbers text-sm text-zinc-950 font-bold">
                  {noShowRatePercent}%
                </span>
              </div>
              <input
                id="noshow-rate"
                type="range"
                min={5}
                max={30}
                step={1}
                value={noShowRatePercent}
                onChange={(e) => setNoShowRatePercent(Number(e.target.value))}
                className="w-full accent-zinc-950 cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500 mt-1">
                В среднем по индустрии без напоминаний не является 12–18% записавшихся.
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 bg-white border border-zinc-200 rounded-lg p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider pb-4 mb-6 border-b border-zinc-100 flex items-center justify-between">
                <span>Прогнозируемый финансовый эффект</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Высокая окупаемость</span>
                </span>
              </div>

              {/* Total Monthly Gain Highlight */}
              <div className="bg-zinc-900 text-white rounded-lg p-5 mb-6">
                <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1 font-medium">
                  Сохраняемая и дополнительная выручка в месяц:
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono-numbers text-white tracking-tight">
                  +{formatCurrency(roi.totalMonthlyGain, currency)}
                </div>
                <div className="text-xs text-zinc-300 mt-2">
                  Или <strong className="text-white font-mono-numbers">+{formatCurrency(roi.annualGain, currency)}</strong> в год чистого прироста к кассе
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-zinc-100">
                  <div className="flex items-start gap-2 text-zinc-700">
                    <ShieldAlert className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-zinc-950">
                        Предотвращенные неявки ({roi.savedNoShowsCount} визитов)
                      </div>
                      <div className="text-xs text-zinc-500">
                        Благодаря каскаду пушей за 24ч, 3ч и 1ч
                      </div>
                    </div>
                  </div>
                  <span className="font-mono-numbers font-bold text-zinc-900 whitespace-nowrap">
                    +{formatCurrency(roi.savedNoShowRevenue, currency)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 pb-3 border-b border-zinc-100">
                  <div className="flex items-start gap-2 text-zinc-700">
                    <Clock className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-zinc-950">
                        Ночные и вечерние записи 24/7 ({roi.afterHoursNewBookingsCount} визитов)
                      </div>
                      <div className="text-xs text-zinc-500">
                        Заявки, которые раньше уходили к конкурентам
                      </div>
                    </div>
                  </div>
                  <span className="font-mono-numbers font-bold text-zinc-900 whitespace-nowrap">
                    +{formatCurrency(roi.afterHoursRevenue, currency)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 pb-3 border-b border-zinc-100">
                  <div className="flex items-start gap-2 text-zinc-700">
                    <RefreshCw className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-zinc-950">
                        Автовозврат через 21 день ({roi.reactivatedClientsCount} визитов)
                      </div>
                      <div className="text-xs text-zinc-500">
                        Реактивация базы без затрат на рекламу
                      </div>
                    </div>
                  </div>
                  <span className="font-mono-numbers font-bold text-zinc-900 whitespace-nowrap">
                    +{formatCurrency(roi.reactivatedRevenue, currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payback period footer */}
            <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
              <span className="text-zinc-600 font-medium">Срок полной окупаемости внедрения:</span>
              <span className="font-mono-numbers font-extrabold text-sm text-zinc-950 bg-zinc-100 px-2.5 py-1 rounded">
                ~{roi.paybackDays} дней
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
