import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSalonRoi, formatCurrency, PRICING_DATA } from './calculator';

test('calculateSalonRoi returns realistic positive gains for a 3-master salon', () => {
  const result = calculateSalonRoi({
    mastersCount: 3,
    avgCheck: 2500,
    clientsPerMasterDay: 5,
    workingDaysMonth: 25,
    noShowRatePercent: 15,
  }, 35000);

  // 3 * 5 * 25 = 375 appointments
  assert.equal(result.monthlyAppointments, 375);
  assert.equal(result.monthlyRevenue, 375 * 2500);

  // Expected no-shows: 375 * 0.15 = 56.25 -> saved 60% = ~34 appointments
  assert.ok(result.savedNoShowsCount > 30 && result.savedNoShowsCount < 40);
  assert.ok(result.totalMonthlyGain > 150000, `Total monthly gain ${result.totalMonthlyGain} should exceed 150k`);
  assert.ok(result.paybackDays <= 10, `Payback days ${result.paybackDays} should be 10 days or less`);
});

test('calculateSalonRoi handles single master gracefully', () => {
  const result = calculateSalonRoi({
    mastersCount: 1,
    avgCheck: 1500,
    clientsPerMasterDay: 4,
    workingDaysMonth: 20,
    noShowRatePercent: 10,
  }, 25000);

  assert.equal(result.monthlyAppointments, 80);
  assert.ok(result.totalMonthlyGain > 0);
  assert.ok(result.paybackDays > 0);
});

test('formatCurrency formats Russian Rubles, Armenian Drams, and USD properly', () => {
  assert.ok(formatCurrency(2500, 'RUB').includes('₽'));
  assert.ok(formatCurrency(25000, 'AMD').includes('֏'));
  assert.ok(formatCurrency(150, 'USD').includes('$'));
});

test('PRICING_DATA contains valid positive rates for setup and subscriptions across all 3 currencies', () => {
  assert.equal(PRICING_DATA.standardSetup.RUB, 35000);
  assert.equal(PRICING_DATA.standardSetup.AMD, 150000);
  assert.equal(PRICING_DATA.standardSetup.USD, 380);

  assert.ok(PRICING_DATA.monthlySubscription.RUB > 0);
  assert.ok(PRICING_DATA.monthlySubscription.AMD > 0);
  assert.ok(PRICING_DATA.monthlySubscription.USD > 0);
});
