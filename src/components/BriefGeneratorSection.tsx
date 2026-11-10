import React, { useState } from 'react';
import { Clipboard, Check, FileText, Send, Building, Users, Clock, MessageSquare } from 'lucide-react';

export const BriefGeneratorSection: React.FC = () => {
  const [salonName, setSalonName] = useState<string>('');
  const [salonAddress, setSalonAddress] = useState<string>('');
  const [mastersList, setMastersList] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const [checklist, setChecklist] = useState({
    salonInfo: true,
    masters: true,
    services: true,
    schedule: true,
    reminders: true,
  });

  const toggleItem = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyBrief = () => {
    const briefText = `БРИФ НА ПОДКЛЮЧЕНИЕ TELEGRAM-БОТА САЛОНА:
----------------------------------------
1. ИНФОРМАЦИЯ О САЛОНЕ:
- Название салона: ${salonName || '[Укажите название салона]'}
- Фактический адрес: ${salonAddress || '[Укажите точный адрес]'}
- Геолокация: [Ссылка на Яндекс/Google карты или геометка]
- Желаемый username бота: @[название]_salon_bot

2. МАСТЕРА И СПЕЦИАЛИСТЫ:
${mastersList || '- Имя мастера 1 (@username в Telegram, слоты: 60 мин, график: Пн-Пт 10:00-20:00)\n- Имя мастера 2 (@username в Telegram, слоты: 45 мин, график: Вт-Сб 11:00-21:00)'}

3. УСЛУГИ И ПЕРЕВОДЫ:
- Каталог услуг с переводами (Русский / Հայերեն / English)
- Цены и длительность процедур

4. НАСТРОЙКИ СООБЩЕНИЙ:
- Напоминания: за 24ч, 3ч и 1ч до записи (ВКЛ)
- Возврат клиентов через 21 день отсутствия (ВКЛ)
- Безопасность: пароли и доступы к личным аккаунтам НЕ передаются.`;

    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="brief" className="py-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Чек-лист для быстрого старта
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            Какие данные нужны от салона для настройки бота
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Подготовка занимает не более 1–2 часов. Заполните ключевые поля прямо здесь или скопируйте
            структурированный шаблон для отправки разработчику.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Checklist & Input Form */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200 rounded-lg p-6 sm:p-8 space-y-6">
            <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider pb-3 border-b border-zinc-200 flex items-center justify-between">
              <span>Чек-лист готовности данных</span>
              <span className="text-zinc-500 font-normal">Раздел 4 спецификации</span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Item 1 */}
              <div
                onClick={() => toggleItem('salonInfo')}
                className="flex items-start gap-3 p-3 bg-white border border-zinc-200 rounded-md cursor-pointer hover:border-zinc-300 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checklist.salonInfo}
                  onChange={() => {}}
                  className="mt-0.5 accent-zinc-950 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-bold text-zinc-950 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-zinc-600" />
                    <span>4.1. Информация о салоне</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Название, фактический адрес, геометка/ссылка на точку и желаемое имя бота в Telegram.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div
                onClick={() => toggleItem('masters')}
                className="flex items-start gap-3 p-3 bg-white border border-zinc-200 rounded-md cursor-pointer hover:border-zinc-300 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checklist.masters}
                  onChange={() => {}}
                  className="mt-0.5 accent-zinc-950 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-bold text-zinc-950 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-zinc-600" />
                    <span>4.2. Мастера и специалисты</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Имена специалистов для клиентов и их Telegram-аккаунты (пароли и доступы не требуются!).
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div
                onClick={() => toggleItem('services')}
                className="flex items-start gap-3 p-3 bg-white border border-zinc-200 rounded-md cursor-pointer hover:border-zinc-300 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checklist.services}
                  onChange={() => {}}
                  className="mt-0.5 accent-zinc-950 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-bold text-zinc-950 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-zinc-600" />
                    <span>4.3. Список услуг и переводы</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Названия процедур на русском, армянском и английском языках (каталог общий для мастеров).
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div
                onClick={() => toggleItem('schedule')}
                className="flex items-start gap-3 p-3 bg-white border border-zinc-200 rounded-md cursor-pointer hover:border-zinc-300 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checklist.schedule}
                  onChange={() => {}}
                  className="mt-0.5 accent-zinc-950 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-bold text-zinc-950 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-600" />
                    <span>4.4. Расписание и шаг слотов</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Рабочие дни, часы смены, шаг слота (30, 45, 60, 90 или 120 мин) и глубина записи (3, 7, 14, 30 дней).
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div
                onClick={() => toggleItem('reminders')}
                className="flex items-start gap-3 p-3 bg-white border border-zinc-200 rounded-md cursor-pointer hover:border-zinc-300 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checklist.reminders}
                  onChange={() => {}}
                  className="mt-0.5 accent-zinc-950 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-bold text-zinc-950 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-600" />
                    <span>4.5. Настройка напоминаний</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Подтверждение отправки напоминаний за 24ч, 3ч и 1ч, а также рассылки возврата через 21 день.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Input fields */}
            <div className="space-y-3 pt-3 border-t border-zinc-200 text-xs">
              <div>
                <label className="font-semibold text-zinc-800 block mb-1">
                  Название вашего салона:
                </label>
                <input
                  type="text"
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  placeholder="Например: Салон красоты «LUMIERE»"
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded focus:outline-hidden focus:border-zinc-950"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-800 block mb-1">
                  Фактический адрес и город:
                </label>
                <input
                  type="text"
                  value={salonAddress}
                  onChange={(e) => setSalonAddress(e.target.value)}
                  placeholder="Например: г. Ереван, ул. Амиряна, 4/6"
                  className="w-full px-3 py-2 bg-white border border-zinc-300 rounded focus:outline-hidden focus:border-zinc-950"
                />
              </div>
            </div>
          </div>

          {/* Structured Output & Copy action */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-lg p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider pb-3 mb-4 border-b border-zinc-100 flex items-center justify-between">
                <span>Готовый текст брифа</span>
                <span className="text-zinc-400 font-mono-numbers">v1.0</span>
              </div>

              <div className="bg-zinc-950 text-zinc-200 p-4 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[360px] whitespace-pre-wrap select-all border border-zinc-800">
{`БРИФ НА ПОДКЛЮЧЕНИЕ TELEGRAM-БОТА САЛОНА:
1. САЛОН:
- Название: ${salonName || '[Ваш салон]'}
- Адрес: ${salonAddress || '[Ваш адрес]'}
- Геометка: [Координаты на карте]

2. МАСТЕРА:
- Имя, Telegram ID/Username, слоты (30-120 мин)

3. УСЛУГИ:
- Каталог с переводами (RU/HY/EN)

4. НАПОМИНАНИЯ:
- За 24ч, 3ч и 1ч до визита
- Возврат клиентов через 21 день`}
              </div>

              <div className="mt-4 p-3 bg-zinc-50 border border-zinc-200 rounded text-xs text-zinc-600">
                <strong>Безопасность:</strong> Разработчику никогда не требуются пароли от личных Telegram-аккаунтов мастеров или владельца.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleCopyBrief}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Бриф скопирован в буфер обмена!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-4 h-4" />
                    <span>Скопировать готовый бриф для отправки</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
