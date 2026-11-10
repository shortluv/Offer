import React, { useState } from 'react';
import {
  Check,
  MessageCircle,
  Copy,
  CheckCheck,
  Send,
  ExternalLink,
  ShieldCheck,
  Headphones,
  CalendarCheck,
  Sparkles,
} from 'lucide-react';
import { Currency, formatCurrency, PRICING_DATA } from '../utils/calculator';
import { SUBSCRIPTION_FEATURES } from '../data/proposalData';

interface PricingAndContactSectionProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  onScrollToTop: () => void;
}

export const PricingAndContactSection: React.FC<PricingAndContactSectionProps> = ({
  currency,
  onCurrencyChange,
  onScrollToTop,
}) => {
  const [copiedContact, setCopiedContact] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'quarter'>('month');

  const standardPrice = PRICING_DATA.standardSetup[currency];
  const premiumPrice = PRICING_DATA.premiumSetup[currency];
  const subscriptionPrice =
    billingPeriod === 'month'
      ? PRICING_DATA.monthlySubscription[currency]
      : PRICING_DATA.quarterlySubscription[currency];

  const telegramUsername = 'short_luvq'; // Telegram username
  const developerEmail = 'aleksandr.6182@gmail.com';

  const defaultDraftMessage = `Здравствуйте! Ознакомился с коммерческим предложением по Telegram-боту для записи в салон. Хотим обсудить запуск и детали для нашего салона.`;

  const handleCopyContact = () => {
    navigator.clipboard.writeText(`@${telegramUsername} (${developerEmail})`);
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2500);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(defaultDraftMessage);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleOpenTelegram = () => {
    const textEncoded = encodeURIComponent(defaultDraftMessage);
    window.open(`https://t.me/${telegramUsername}?text=${textEncoded}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Тарифы и условия сотрудничества
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            Прозрачная стоимость внедрения и формат ежемесячного ведения
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Вы можете выбрать разовый запуск бота под ключ либо подключить подписку на полное
            техническое ведение, чтобы снять с администратора и мастеров любые вопросы по обновлению расписания и поддержке.
          </p>
        </div>

        {/* Currency Switcher Bar for Pricing Packages */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Валюта тарифов:
            </span>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              (отображение цен внедрения и абонентского ведения)
            </span>
          </div>

          <div className="inline-flex p-1 bg-white rounded-lg border border-zinc-200 shadow-2xs" role="group" aria-label="Выбор валюты тарифов">
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

        {/* 3-Card Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-stretch">
          {/* Card 1: Standard Turnkey */}
          <div className="border border-zinc-200 bg-white rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-zinc-300 transition-colors shadow-xs">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                    Разовый запуск
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">Тариф «Стандарт»</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-zinc-950 font-mono-numbers">
                    {formatCurrency(standardPrice, currency)}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-medium">Единоразово</div>
                </div>
              </div>

              <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                Быстрое развертывание базовой версии бота под ключ для одного салона за 3–5 рабочих дней.
              </p>

              <div className="space-y-3 text-xs text-zinc-700 py-4 border-t border-zinc-100">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Подключение до 5 мастеров с отдельными графиками</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Каталог услуг с переводами (Русский / Հայերեն / English)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Каскад из 3 напоминаний клиентам (24ч / 3ч / 1ч)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Автоматический возврат неактивных клиентов через 21 день</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Отправка точной геолокации и адреса в чат</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>1 месяц базовой гарантии на работоспособность</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleOpenTelegram}
                className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Обсудить тариф «Стандарт»</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            </div>
          </div>

          {/* Card 2: Premium Turnkey */}
          <div className="border border-zinc-300 bg-white rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-zinc-400 transition-colors shadow-xs relative">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[11px] font-semibold text-zinc-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-zinc-950" />
                    <span>Для растущих студий</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950">Тариф «Премиум»</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-zinc-950 font-mono-numbers">
                    {formatCurrency(premiumPrice, currency)}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-medium">Единоразово</div>
                </div>
              </div>

              <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                Максимальный запуск: брендирование интерфейса, инструктаж персонала и материалы для стойки ресепшн.
              </p>

              <div className="space-y-3 text-xs text-zinc-700 py-4 border-t border-zinc-100">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Всё, что входит в тариф «Стандарт»</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Подключение до 15 специалистов без доплат</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Фирменное оформление (аватар, описание, карточка визита)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Готовые макеты QR-тейблтентов для стойки администратора</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>Онлайн-инструктаж администратора и мастеров</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-zinc-900 mt-0.5 shrink-0" />
                  <span>3 месяца расширенной технической поддержки</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleOpenTelegram}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Обсудить тариф «Премиум»</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Monthly Maintenance Subscription */}
          <div className="border border-zinc-900 bg-zinc-950 text-white rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-md relative md:col-span-2 lg:col-span-1">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Headphones className="w-3.5 h-3.5 text-zinc-300" />
                    <span>Подписка на ведение</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Ведение и поддержка</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-white font-mono-numbers">
                    {formatCurrency(subscriptionPrice, currency)}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-medium">
                    {billingPeriod === 'month' ? '/ месяц' : '/ квартал (скидка)'}
                  </div>
                </div>
              </div>

              {/* Billing Switcher */}
              <div className="inline-flex p-0.5 bg-zinc-800 rounded-md mb-4 text-[11px]">
                <button
                  type="button"
                  onClick={() => setBillingPeriod('month')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    billingPeriod === 'month'
                      ? 'bg-white text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Помесячно
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod('quarter')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                    billingPeriod === 'quarter'
                      ? 'bg-white text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  За квартал (-15%)
                </button>
              </div>

              <p className="text-xs text-zinc-300 mb-5 leading-relaxed">
                Полное делегирование технического сопровождения разработчику. Никакой головной боли с расписаниями, отпусками и обновлениями.
              </p>

              <div className="space-y-2.5 text-xs text-zinc-200 py-4 border-t border-zinc-800">
                {SUBSCRIPTION_FEATURES.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={handleOpenTelegram}
                className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-100 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Подключить ведение бота</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Direct Interaction & Contact Hub (Replaces the application form) */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto shadow-xs">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex p-2.5 bg-zinc-950 text-white rounded-full mb-3">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 mb-2">
              Прямая связь с разработчиком
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Так как предложение открыто по прямой ссылке, вы можете сразу написать разработчику в Telegram,
              согласовать технические вопросы и утвердить запуск без лишних форм и ожидания.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Left: Pre-filled Message Draft */}
            <div className="md:col-span-7 bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 text-xs">
                  <span className="font-bold text-zinc-900 uppercase tracking-wider">
                    Готовый текст первого сообщения
                  </span>
                  <span className="text-zinc-400 text-[11px]">1 клик для копирования</span>
                </div>
                <div className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200/70 text-xs text-zinc-700 font-mono leading-relaxed select-all">
                  {defaultDraftMessage}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {copiedDraft ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Скопировано в буфер!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Скопировать сообщение</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleOpenTelegram}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Открыть диалог в Telegram</span>
                </button>
              </div>
            </div>

            {/* Right: Direct Contacts Card */}
            <div className="md:col-span-5 bg-white border border-zinc-200 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider pb-3 mb-3 border-b border-zinc-100">
                  Прямые контакты
                </div>
                <div className="space-y-3 text-xs text-zinc-700">
                  <div>
                    <div className="text-zinc-500 text-[11px]">Telegram:</div>
                    <a
                      href={`https://t.me/${telegramUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-zinc-950 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>@{telegramUsername}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </a>
                  </div>

                  <div>
                    <div className="text-zinc-500 text-[11px]">Email:</div>
                    <a
                      href={`mailto:${developerEmail}`}
                      className="font-medium text-zinc-900 hover:underline mt-0.5 block"
                    >
                      {developerEmail}
                    </a>
                  </div>

                  <div>
                    <div className="text-zinc-500 text-[11px]">География работы:</div>
                    <div className="font-medium text-zinc-800 mt-0.5">
                      Ереван (Армения) · Россия · Международные проекты
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={handleCopyContact}
                  className="w-full py-2 px-3 text-xs font-medium text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {copiedContact ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Контакт скопирован!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Скопировать реквизиты</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Minimalist Footer */}
        <footer className="mt-20 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Telegram Salon Booking Solution. Все права защищены.
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onScrollToTop}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Наверх
            </button>
            <span aria-hidden="true">·</span>
            <span>Конфиденциальность данных гарантирована</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
