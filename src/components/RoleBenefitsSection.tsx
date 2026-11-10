import React, { useState } from 'react';
import { ShieldCheck, UserCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const RoleBenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'owner' | 'master' | 'client'>('owner');

  const roles = {
    owner: {
      title: 'Для владельца салона',
      badge: 'Управление & Выручка',
      icon: ShieldCheck,
      summary:
        'Контроль загрузки специалистов, прозрачная база клиентов и исключение простоев без увеличения фонда оплаты труда.',
      points: [
        {
          title: 'Единый центр управления расписанием',
          desc: 'Возможность подключать и отключать мастеров, настраивать общий каталог услуг и актуализировать рабочие графики.',
        },
        {
          title: 'Автоматический рост повторных визитов (LTV)',
          desc: 'Встроенный триггер возврата через 21 день реактивирует клиентов без расходов на таргетированную рекламу и SMS.',
        },
        {
          title: 'Разгрузка администратора на 2–3 часа в день',
          desc: 'Персонал ресепшн больше не тратит время на рутинную переписку «есть ли свободные окошки на завтра».',
        },
        {
          title: 'Снижение финансовых потерь от no-show',
          desc: 'Каскад из трех напоминаний (за 24ч, 3ч и 1ч) дисциплинирует клиентов и снижает неявки до 70%.',
        },
      ],
    },
    master: {
      title: 'Для мастера салона',
      badge: 'График & Уведомления',
      icon: UserCheck,
      summary:
        'Персональный рабочий календарь, мгновенные оповещения в Telegram и защита от сорванных рабочих смен.',
      points: [
        {
          title: 'Индивидуальная длительность слота',
          desc: 'Мастер сам выбирает комфортный шаг записи: 30, 45, 60, 90 или 120 минут под специфику своих процедур.',
        },
        {
          title: 'Мгновенные Telegram-уведомления',
          desc: 'Мастер получает сообщение прямо в мессенджер при каждой новой записи, отмене или переносе визита.',
        },
        {
          title: 'Прозрачные причины отмен',
          desc: 'Если клиент отменяет визит, мастер видит точную причину (до 300 символов) и может сразу открыть слот для других.',
        },
        {
          title: 'Настройка рабочих дней и горизонта записи',
          desc: 'Четкие границы: указание смен, выходных и глубины записи (на 3, 7, 14 или 30 дней вперед).',
        },
      ],
    },
    client: {
      title: 'Для клиента салона',
      badge: 'Комфорт & Забота',
      icon: HeartHandshake,
      summary:
        'Запись за 30 секунд в привычном Telegram без звонков, выбора между приложениями и ожидания ответа.',
      points: [
        {
          title: 'Коммуникация на родном языке',
          desc: 'Выбор между русским, армянским и английским языками (RU, HY, EN) с сохранением выбора для всех сообщений.',
        },
        {
          title: 'Два интуитивных способа подбора времени',
          desc: 'Запись к конкретному любимому специалисту либо быстрый поиск ближайшего свободного часа среди всех мастеров.',
        },
        {
          title: 'Точная геолокация и маршрут',
          desc: 'Подтверждение записи содержит адрес и кликабельную геометку на карте города, исключая блуждания и опоздания.',
        },
        {
          title: 'Личный кабинет и деликатное управление',
          desc: 'Просмотр предстоящих визитов в разделе «Мои записи», легкая отмена при форс-мажоре и контроль рассылок.',
        },
      ],
    },
  };

  const currentRole = roles[activeTab];
  const IconComponent = currentRole.icon;

  return (
    <section className="py-16 bg-[#F8F9FA] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Ценность по ролям
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            Продуманная выгода для каждого участника сервисного процесса
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Бот спроектирован так, чтобы упростить рутину руководства, дать удобный инструмент мастерам
            и предоставить первоклассный сервис клиентам.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1 bg-zinc-200/70 rounded-lg max-w-md mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('owner')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer text-center ${
              activeTab === 'owner'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Владельцу
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('master')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer text-center ${
              activeTab === 'master'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Мастеру
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('client')}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer text-center ${
              activeTab === 'client'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Клиенту
          </button>
        </div>

        {/* Role Content Card */}
        <div className="bg-white border border-zinc-200 rounded-lg p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-zinc-900 text-white rounded-lg">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-950">
                  {currentRole.title}
                </h3>
                <div className="text-xs text-zinc-500 font-medium">
                  {currentRole.badge}
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md">
              {currentRole.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentRole.points.map((p, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-zinc-900 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 mb-1">
                    {p.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
