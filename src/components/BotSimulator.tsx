import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  User,
  CheckCircle,
  Bell,
  RefreshCw,
  XCircle,
  Sparkles,
  ChevronRight,
  Globe,
  RotateCcw,
} from 'lucide-react';
import { INITIAL_SERVICES, INITIAL_MASTERS, ServiceItem, MasterProfile } from '../data/proposalData';
import { Currency, formatCurrency } from '../utils/calculator';

type Step = 'lang' | 'method' | 'service' | 'master' | 'slot' | 'confirmed';

interface BotSimulatorProps {
  currency: Currency;
}

export const BotSimulator: React.FC<BotSimulatorProps> = ({ currency }) => {
  const [lang, setLang] = useState<'ru' | 'hy' | 'en'>('ru');
  const [step, setStep] = useState<Step>('lang');
  const [method, setMethod] = useState<'by_master' | 'by_time'>('by_master');
  const [selectedService, setSelectedService] = useState<ServiceItem>(INITIAL_SERVICES[0]);
  const [selectedMaster, setSelectedMaster] = useState<MasterProfile>(INITIAL_MASTERS[0]);
  const [selectedDate, setSelectedDate] = useState<string>('Завтра, 14:00');
  const [simulatedAlert, setSimulatedAlert] = useState<{
    type: 'reminder' | 'cancel' | 'retention';
    title: string;
    text: string;
  } | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const resetFlow = () => {
    setStep('lang');
    setSimulatedAlert(null);
    setIsCancelled(false);
    setCancelReason('');
  };

  const getServiceName = (s: ServiceItem) => {
    if (lang === 'hy') return s.nameHy;
    if (lang === 'en') return s.nameEn;
    return s.nameRu;
  };

  const labels = {
    ru: {
      chooseLang: 'Пожалуйста, выберите язык обслуживания:',
      welcome: 'Добро пожаловать в салон! Как вам удобнее записаться?',
      byMaster: 'Сначала выбрать мастера',
      byTime: 'Сначала выбрать удобное время',
      chooseService: 'Выберите интересующую услугу:',
      chooseMaster: 'Выберите специалиста:',
      chooseSlot: 'Выберите свободное время визита:',
      confirmationTitle: 'Запись успешно подтверждена!',
      waitingText: 'Будем рады видеть вас к назначенному времени.',
      addressLabel: 'Адрес салона:',
      addressValue: 'г. Ереван, ул. Амиряна, 4/6',
      geoNote: 'Точная геолокация отправлена геометкой в чат',
      myBooking: 'Мои записи',
      cancelBooking: 'Отменить эту запись',
      bookingDetails: 'Детали визита',
      simulate24h: 'Тест: Напоминание (24ч / 3ч / 1ч)',
      simulateCancel: 'Тест: Отмена клиентом с причиной',
      simulateRetention: 'Тест: Возврат через 21 день',
    },
    hy: {
      chooseLang: 'Խնդրում ենք ընտրել սպասարկման լեզուն.',
      welcome: 'Բարի գալուստ սրահ: Ինչպե՞ս եք ցանկանում գրանցվել:',
      byMaster: 'Նախ ընտրել մասնագետին',
      byTime: 'Նախ ընտրել հարմար ժամը',
      chooseService: 'Ընտրեք ծառայությունը.',
      chooseMaster: 'Ընտրեք մասնագետին.',
      chooseSlot: 'Ընտրեք այցի ազատ ժամը.',
      confirmationTitle: 'Գրանցումը հաջողությամբ հաստատված է:',
      waitingText: 'Սիրով կսպասենք Ձեզ նշված ժամին:',
      addressLabel: 'Սրահի հասցեն.',
      addressValue: 'ք. Երևան, Ամիրյան փող., 4/6',
      geoNote: 'Սրահի տեղադրությունը ուղարկված է քարտեզի նշումով',
      myBooking: 'Իմ գրանցումները',
      cancelBooking: 'Չեղարկել գրանցումը',
      bookingDetails: 'Այցի մանրամասները',
      simulate24h: 'Թեստ: Հիշեցում (24ժ / 3ժ / 1ժ)',
      simulateCancel: 'Թեստ: Չեղարկում պատճառով',
      simulateRetention: 'Թեստ: Վերադարձ 21 օրից',
    },
    en: {
      chooseLang: 'Please select your preferred language:',
      welcome: 'Welcome to the salon! How would you like to book?',
      byMaster: 'Choose specialist first',
      byTime: 'Choose convenient time first',
      chooseService: 'Select desired service:',
      chooseMaster: 'Choose specialist:',
      chooseSlot: 'Select available time slot:',
      confirmationTitle: 'Appointment confirmed successfully!',
      waitingText: 'We look forward to welcoming you at your scheduled time.',
      addressLabel: 'Salon Address:',
      addressValue: 'Yerevan, 4/6 Amiryan Street',
      geoNote: 'Live geolocation pin has been sent to this chat',
      myBooking: 'My Appointments',
      cancelBooking: 'Cancel appointment',
      bookingDetails: 'Booking details',
      simulate24h: 'Test: Reminder (24h / 3h / 1h)',
      simulateCancel: 'Test: Client cancellation with reason',
      simulateRetention: 'Test: Reactivation after 21 days',
    },
  }[lang];

  const handleSimulateReminder = () => {
    setSimulatedAlert({
      type: 'reminder',
      title: lang === 'hy' ? 'Հիշեցում այցի մասին' : lang === 'en' ? 'Upcoming Visit Reminder' : 'Напоминание о предстоящем визите',
      text:
        lang === 'hy'
          ? `Հիշեցնում ենք Ձեր այցի մասին: ${getServiceName(selectedService)}, ${selectedDate}, Մասնագետ՝ ${selectedMaster.name}. Հասցե՝ Երևան, Ամիրյան 4/6: Սպասում ենք Ձեզ!`
          : lang === 'en'
          ? `Reminder of your appointment: ${getServiceName(selectedService)}, ${selectedDate}, Specialist: ${selectedMaster.name}. Address: Yerevan, 4/6 Amiryan St. See you soon!`
          : `Напоминаем о вашем визите: ${getServiceName(selectedService)}, ${selectedDate}, Специалист: ${selectedMaster.name}. Адрес: ул. Амиряна, 4/6. Ждем вас!`,
    });
  };

  const handleSimulateCancelSubmit = () => {
    setIsCancelled(true);
    setSimulatedAlert({
      type: 'cancel',
      title: 'Уведомление мастеру об отмене (Telegram)',
      text: `Мастер ${selectedMaster.name} получил(а) уведомление: «Клиент отменил запись на ${selectedDate} (${getServiceName(selectedService)}). Причина: "${cancelReason || 'Без указания причины'}". Окно открыто для новой записи.»`,
    });
  };

  const handleSimulateRetention = () => {
    setSimulatedAlert({
      type: 'retention',
      title: lang === 'hy' ? 'Վերադարձի հաղորդագրություն (21 օր)' : lang === 'en' ? 'Client Reactivation Message (21 days)' : 'Сообщение для возвращения клиента (21 день)',
      text:
        lang === 'hy'
          ? `Անցել է 21 օր Ձեր վերջին այցից: Ցանկանո՞ւմ եք թարմացնել սանրվածքը կամ խնամքը: Գրանցվեք Ձեր սիրելի մասնագետի մոտ մեկ հպումով:`
          : lang === 'en'
          ? `It has been 21 days since your last appointment! Would you like to refresh your style? Book with your favourite specialist in just 1 tap:`
          : `Прошел 21 день с вашего последнего визита! Будем рады снова видеть вас в нашем салоне. Обновим стрижку или уход? Запишитесь к своему мастеру в один клик:`,
    });
  };

  return (
    <section id="simulator" className="py-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Интерактивный прототип
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-3">
            Протестируйте клиентский путь в реальном времени
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Попробуйте сценарий, описанный в спецификации: выбор языка, 2 варианта поиска слота,
            подтверждение с адресом и геолокацией, а также проверьте работу напоминаний и реактивации.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Device Mockup (Telegram Interface) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-3 shadow-xl border border-zinc-300">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-zinc-800 rounded-full mx-auto mb-2" />

              {/* Telegram App Container */}
              <div className="bg-[#EFE7DE] rounded-2xl overflow-hidden flex flex-col h-[600px] border border-zinc-800/20 text-zinc-900">
                {/* Telegram Header */}
                <div className="bg-[#517DA2] text-white px-4 py-3 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs uppercase">
                      SB
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-tight">
                        Salon Booking Bot
                      </div>
                      <div className="text-[11px] text-white/80 leading-tight">
                        бот · официальный канал записи
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={resetFlow}
                    title="Начать сначала"
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/90 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Telegram Chat Message Stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
                  {/* Step 1: Language selection message */}
                  <div className="bg-white rounded-lg p-3 max-w-[85%] shadow-xs border border-zinc-200/50">
                    <p className="font-medium text-zinc-800 mb-2">
                      👋 Пожалуйста, выберите язык обслуживания:
                      <br />
                      Խնդրում ենք ընտրել լեզուն:
                      <br />
                      Please choose your language:
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setLang('ru');
                          setStep('method');
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer border ${
                          lang === 'ru' && step !== 'lang'
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        🇷🇺 Русский
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLang('hy');
                          setStep('method');
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer border ${
                          lang === 'hy' && step !== 'lang'
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        🇦🇲 Հայերեն
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLang('en');
                          setStep('method');
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer border ${
                          lang === 'en' && step !== 'lang'
                            ? 'bg-zinc-900 text-white border-zinc-900'
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200'
                        }`}
                      >
                        🇬🇧 English
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Method selection */}
                  {step !== 'lang' && (
                    <div className="bg-white rounded-lg p-3 max-w-[88%] shadow-xs border border-zinc-200/50">
                      <p className="text-zinc-800 font-medium mb-2">{labels.welcome}</p>
                      <div className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setMethod('by_master');
                            setStep('master');
                          }}
                          className={`text-left px-3 py-2 rounded text-xs font-medium cursor-pointer border flex items-center justify-between ${
                            method === 'by_master' && step !== 'method'
                              ? 'bg-zinc-900 text-white border-zinc-900'
                              : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                          }`}
                        >
                          <span>{labels.byMaster}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMethod('by_time');
                            setStep('service');
                          }}
                          className={`text-left px-3 py-2 rounded text-xs font-medium cursor-pointer border flex items-center justify-between ${
                            method === 'by_time' && step !== 'method'
                              ? 'bg-zinc-900 text-white border-zinc-900'
                              : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                          }`}
                        >
                          <span>{labels.byTime}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Master selection if by_master */}
                  {method === 'by_master' && (step === 'master' || step === 'service' || step === 'slot' || step === 'confirmed') && (
                    <div className="bg-white rounded-lg p-3 max-w-[88%] shadow-xs border border-zinc-200/50">
                      <p className="text-zinc-800 font-medium mb-2">{labels.chooseMaster}</p>
                      <div className="flex flex-col gap-1.5">
                        {INITIAL_MASTERS.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSelectedMaster(m);
                              setStep('service');
                            }}
                            className={`text-left px-2.5 py-1.5 rounded text-xs cursor-pointer border flex items-center justify-between ${
                              selectedMaster.id === m.id
                                ? 'bg-zinc-100 border-zinc-400 font-semibold text-zinc-950'
                                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                            }`}
                          >
                            <div>
                              <div>{m.name}</div>
                              <div className="text-[10px] text-zinc-500 font-normal">
                                {m.role} · {m.slotDurationMinutes} мин
                              </div>
                            </div>
                            <span className="text-[10px] text-zinc-400">Слот: {m.hours}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Service selection */}
                  {(step === 'service' || step === 'slot' || step === 'confirmed') && (
                    <div className="bg-white rounded-lg p-3 max-w-[88%] shadow-xs border border-zinc-200/50">
                      <p className="text-zinc-800 font-medium mb-2">{labels.chooseService}</p>
                      <div className="flex flex-col gap-1.5">
                        {INITIAL_SERVICES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setSelectedService(s);
                              setStep('slot');
                            }}
                            className={`text-left px-2.5 py-1.5 rounded text-xs cursor-pointer border flex items-center justify-between ${
                              selectedService.id === s.id
                                ? 'bg-zinc-100 border-zinc-400 font-semibold text-zinc-950'
                                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                            }`}
                          >
                            <div>
                              <div>{getServiceName(s)}</div>
                              <div className="text-[10px] text-zinc-500 font-normal">
                                {s.durationMinutes} мин
                              </div>
                            </div>
                            <span className="text-[11px] font-bold text-zinc-900 font-mono-numbers">
                              {formatCurrency(s.prices[currency], currency)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Slot selection */}
                  {(step === 'slot' || step === 'confirmed') && (
                    <div className="bg-white rounded-lg p-3 max-w-[88%] shadow-xs border border-zinc-200/50">
                      <p className="text-zinc-800 font-medium mb-2">{labels.chooseSlot}</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['Сегодня, 18:00', 'Завтра, 12:00', 'Завтра, 14:00', 'Сб, 15:30'].map((slotTime) => (
                          <button
                            key={slotTime}
                            type="button"
                            onClick={() => {
                              setSelectedDate(slotTime);
                              setStep('confirmed');
                            }}
                            className={`py-1.5 px-2 rounded text-xs text-center font-medium cursor-pointer border ${
                              selectedDate === slotTime && step === 'confirmed'
                                ? 'bg-zinc-900 text-white border-zinc-900'
                                : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800 border-zinc-200'
                            }`}
                          >
                            {slotTime}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 6: Confirmation message with Address & Geolocation */}
                  {step === 'confirmed' && (
                    <div className="bg-white rounded-lg p-3.5 max-w-[95%] shadow-xs border border-emerald-200/60 bg-emerald-50/20">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>{labels.confirmationTitle}</span>
                      </div>

                      <div className="space-y-1.5 text-zinc-700 text-xs mb-3 pb-3 border-b border-zinc-200">
                        <div>
                          <strong>{lang === 'hy' ? 'Ծառայություն' : lang === 'en' ? 'Service' : 'Услуга'}:</strong>{' '}
                          {getServiceName(selectedService)}
                        </div>
                        <div>
                          <strong>{lang === 'hy' ? 'Մասնագետ' : lang === 'en' ? 'Specialist' : 'Специалист'}:</strong>{' '}
                          {selectedMaster.name}
                        </div>
                        <div>
                          <strong>{lang === 'hy' ? 'Ամսաթիվ և ժամ' : lang === 'en' ? 'Date & Time' : 'Дата и время'}:</strong>{' '}
                          {selectedDate}
                        </div>
                        <div>
                          <strong>{labels.addressLabel}</strong> {labels.addressValue}
                        </div>
                        <div className="text-zinc-600 italic">
                          {labels.waitingText}
                        </div>
                      </div>

                      {/* Geolocation Card in chat */}
                      <div className="bg-zinc-100 rounded-md p-2 flex items-center gap-2 mb-3 border border-zinc-200">
                        <div className="p-2 bg-emerald-600 text-white rounded">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="text-[11px] leading-tight">
                          <div className="font-bold text-zinc-900">📍 Геолокация салона</div>
                          <div className="text-zinc-500">{labels.geoNote}</div>
                        </div>
                      </div>

                      {/* Cancellation Option with Reason (3.4 in doc) */}
                      {!isCancelled ? (
                        <div className="pt-2 border-t border-zinc-200">
                          <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
                            <span>{labels.myBooking}</span>
                            <span className="font-semibold text-emerald-700">Активна</span>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="text"
                              maxLength={300}
                              value={cancelReason}
                              onChange={(e) => setCancelReason(e.target.value)}
                              placeholder="Причина отмены (до 300 символов, опционально)"
                              className="w-full text-xs px-2.5 py-1.5 bg-white border border-zinc-300 rounded focus:outline-hidden focus:border-zinc-950"
                            />
                            <button
                              type="button"
                              onClick={handleSimulateCancelSubmit}
                              className="w-full py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded transition-colors cursor-pointer flex items-center justify-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{labels.cancelBooking}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2 bg-zinc-100 border border-zinc-200 rounded text-center text-xs text-zinc-600 font-medium">
                          Запись отменена клиентом. Мастер уведомлен в Telegram.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Incoming Simulated Notification Banner */}
                  {simulatedAlert && (
                    <div className="bg-zinc-950 text-white rounded-lg p-3 text-xs shadow-md border border-zinc-800 animate-in fade-in">
                      <div className="flex items-center gap-2 font-bold mb-1 text-zinc-200">
                        <Bell className="w-3.5 h-3.5 text-amber-400" />
                        <span>{simulatedAlert.title}</span>
                      </div>
                      <p className="text-zinc-300 text-[11px] leading-relaxed">
                        {simulatedAlert.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Telegram Input Bar */}
                <div className="bg-white border-t border-zinc-200 p-2.5 flex items-center gap-2">
                  <div className="flex-1 bg-zinc-100 rounded-full px-3 py-1.5 text-xs text-zinc-500">
                    Сообщение...
                  </div>
                  <div className="text-zinc-400 text-xs font-bold px-2 cursor-default">
                    Меню
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Explanation & Feature Test Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-5">
              <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-zinc-700" />
                <span>Что сейчас происходит в симуляторе?</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                Это точная модель сценария, описанного в разделах 3.1–3.8 документа. Клиент заходит в Telegram,
                выбирает язык (RU / HY / EN), находит время или мастера и получает моментальное подтверждение.
              </p>

              <div className="space-y-2.5 text-xs text-zinc-700 border-t border-zinc-200 pt-3">
                <div className="flex items-start gap-2">
                  <Globe className="w-3.5 h-3.5 text-zinc-900 mt-0.5 shrink-0" />
                  <span>
                    <strong>Язык сохраняется</strong>: все последующие напоминания и рассылки отправляются строго на выбранном клиентом языке.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-zinc-900 mt-0.5 shrink-0" />
                  <span>
                    <strong>У каждого мастера свой слот</strong>: длительность приема задается индивидуально (30, 45, 60, 90 или 120 мин).
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-900 mt-0.5 shrink-0" />
                  <span>
                    <strong>Геолокация</strong>: отправляется реальная точка на карте, чтобы клиенты не блуждали и не опаздывали.
                  </span>
                </div>
              </div>
            </div>

            {/* Test Trigger Buttons */}
            <div className="bg-white border border-zinc-200 rounded-lg p-5 shadow-xs">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wide mb-3">
                Проверить триггеры автоматизации
              </h4>
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleSimulateReminder}
                  className="w-full text-left px-3.5 py-2.5 text-xs font-medium text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-md transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-amber-600" />
                    <span>{labels.simulate24h}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>

                <button
                  type="button"
                  onClick={handleSimulateRetention}
                  className="w-full text-left px-3.5 py-2.5 text-xs font-medium text-zinc-800 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-md transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{labels.simulateRetention}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>

                <button
                  type="button"
                  onClick={resetFlow}
                  className="w-full text-left px-3.5 py-2.5 text-xs font-medium text-zinc-600 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-md transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Сбросить симулятор и начать заново</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
