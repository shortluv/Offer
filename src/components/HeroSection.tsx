import React from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import heroImage from '../assets/images/hero_salon_minimalist_1794301642639.jpg';
interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToSection }) => {
  return (
    <section id="hero" className="pt-8 pb-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Text & Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              <span>Автоматизация бронирования</span>
              <span aria-hidden="true">·</span>
              <span>Telegram-решение под ключ</span>
              <span aria-hidden="true">·</span>
              <span>Срок внедрения 3–5 дней</span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-zinc-950 leading-[1.15] mb-5"
              style={{ textWrap: 'balance' }}
            >
              Telegram-бот онлайн-записи и удержания клиентов для современного салона
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mb-8 max-w-2xl">
              Автономная запись 24/7 без участия администратора, мультиязычный интерфейс
              (RU / HY / EN), индивидуальное расписание мастеров, каскад напоминаний против
              неявок и автоматический возврат «спящих» клиентов каждые 21 день.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm font-medium text-zinc-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                <span>Запись в 2 клика без скачивания приложений</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                <span>Уведомления мастерам прямо в Telegram</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                <span>Точный адрес и геометка для каждого гостя</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                <span>Сохранение базы гостей и истории отмен</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onScrollToSection('simulator')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Протестировать сценарий бота</span>
              </button>

              <button
                type="button"
                onClick={() => onScrollToSection('roi')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-md transition-colors cursor-pointer"
              >
                <span>Рассчитать окупаемость (ROI)</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </button>
            </div>
          </div>

          {/* Right Column: High-End Minimalist Editorial Image */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100 shadow-sm aspect-16/10 lg:aspect-auto lg:h-full min-h-[320px]">
              <img
  src={heroImage}
  alt="Интерьер премиального салона красоты"
  className="w-full h-full object-cover"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <div className="text-xs uppercase tracking-wider text-zinc-300 font-medium mb-1">
                    Единая экосистема бронирования
                  </div>
                  <div className="text-sm font-semibold">
                    Максимум загрузки рабочих мест мастеров без потерь на пустых окнах
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip (Full-width row below hero split) */}
        <div className="mt-14 pt-8 border-t border-zinc-200 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-mono-numbers">
              24/7
            </span>
            <span className="text-xs font-semibold text-zinc-900 mt-1 uppercase tracking-wider">
              Автономная запись
            </span>
            <span className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
              Клиент записывается в любое время суток за 30 секунд без ожидания ответа
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-mono-numbers">
              до -70%
            </span>
            <span className="text-xs font-semibold text-zinc-900 mt-1 uppercase tracking-wider">
              Снижение неявок
            </span>
            <span className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
              Каскад напоминаний за 24ч, 3ч и 1ч предотвращает забытые визиты
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-mono-numbers">
              21 день
            </span>
            <span className="text-xs font-semibold text-zinc-900 mt-1 uppercase tracking-wider">
              Цикл возврата
            </span>
            <span className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
              Автоматическое приглашение постоянных гостей обновить процедуру
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-mono-numbers">
              3 языка
            </span>
            <span className="text-xs font-semibold text-zinc-900 mt-1 uppercase tracking-wider">
              RU · HY · EN
            </span>
            <span className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
              Персонализированная коммуникация на родном языке клиента
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
