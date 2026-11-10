export type Currency = 'RUB' | 'AMD' | 'USD';

export interface SalonMetrics {
  mastersCount: number;
  avgCheck: number;
  clientsPerMasterDay: number;
  workingDaysMonth: number;
  noShowRatePercent: number; // e.g. 15%
}

export interface RoiResult {
  monthlyAppointments: number;
  monthlyRevenue: number;
  savedNoShowsCount: number;
  savedNoShowRevenue: number;
  afterHoursNewBookingsCount: number;
  afterHoursRevenue: number;
  reactivatedClientsCount: number;
  reactivatedRevenue: number;
  totalMonthlyGain: number;
  annualGain: number;
  paybackDays: number;
}

export interface PackagePricing {
  standardSetup: Record<Currency, number>;
  premiumSetup: Record<Currency, number>;
  monthlySubscription: Record<Currency, number>;
  quarterlySubscription: Record<Currency, number>;
}

export const PRICING_DATA: PackagePricing = {
  standardSetup: {
    RUB: 35000,
    AMD: 150000,
    USD: 380,
  },
  premiumSetup: {
    RUB: 55000,
    AMD: 235000,
    USD: 590,
  },
  monthlySubscription: {
    RUB: 6500,
    AMD: 28000,
    USD: 70,
  },
  quarterlySubscription: {
    RUB: 16500,
    AMD: 70000,
    USD: 180,
  },
};

/**
 * Calculates ROI and financial impact of Telegram booking bot for salon.
 * - Cascade reminders (24h, 3h, 1h) cut no-shows by ~60%.
 * - 24/7 self-service recovers ~12% after-hours bookings that would otherwise be lost.
 * - 21-day auto-reactivation returns ~5% dormant clients.
 */
export function calculateSalonRoi(
  metrics: SalonMetrics,
  setupCost: number = 35000
): RoiResult {
  const masters = Math.max(1, metrics.mastersCount);
  const avgCheck = Math.max(0, metrics.avgCheck);
  const clientsPerDay = Math.max(1, metrics.clientsPerMasterDay);
  const days = Math.max(1, metrics.workingDaysMonth);
  const noShowRate = Math.min(100, Math.max(0, metrics.noShowRatePercent)) / 100;

  const monthlyAppointments = Math.round(masters * clientsPerDay * days);
  const monthlyRevenue = monthlyAppointments * avgCheck;

  // 1. Saved no-shows (cascade reminders reduce no-shows by 60%)
  const expectedNoShows = monthlyAppointments * noShowRate;
  const savedNoShowsCount = Math.round(expectedNoShows * 0.6);
  const savedNoShowRevenue = Math.round(savedNoShowsCount * avgCheck);

  // 2. 24/7 booking capture (at evening/night when admin isn't working: ~12% extra bookings)
  const afterHoursNewBookingsCount = Math.round(monthlyAppointments * 0.12);
  const afterHoursRevenue = Math.round(afterHoursNewBookingsCount * avgCheck);

  // 3. Reactivation of dormant clients every 21 days (~5% lift on client base)
  const reactivatedClientsCount = Math.round(monthlyAppointments * 0.05);
  const reactivatedRevenue = Math.round(reactivatedClientsCount * avgCheck);

  const totalMonthlyGain = savedNoShowRevenue + afterHoursRevenue + reactivatedRevenue;
  const annualGain = totalMonthlyGain * 12;

  // Payback period in days
  const dailyGain = totalMonthlyGain > 0 ? totalMonthlyGain / 30 : 0;
  const paybackDays = dailyGain > 0 ? Math.max(1, Math.round(setupCost / dailyGain)) : 999;

  return {
    monthlyAppointments,
    monthlyRevenue,
    savedNoShowsCount,
    savedNoShowRevenue,
    afterHoursNewBookingsCount,
    afterHoursRevenue,
    reactivatedClientsCount,
    reactivatedRevenue,
    totalMonthlyGain,
    annualGain,
    paybackDays,
  };
}

export function formatCurrency(amount: number, currency: Currency = 'RUB'): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('ru-RU').format(rounded);
  switch (currency) {
    case 'RUB':
      return `${formatted} ₽`;
    case 'AMD':
      return `${formatted} ֏`;
    case 'USD':
      return `$${formatted}`;
    default:
      return `${formatted} ₽`;
  }
}
