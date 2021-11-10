import moment from 'moment';

export const years = (end = 30, start = 30): number[] => {
  const years = [];
  const dateStart = moment().subtract(start, 'year');
  const dateEnd = moment().add(end, 'year');

  while (dateEnd.diff(dateStart, 'years') >= 0) {
    years.push(+dateStart.format('YYYY'));
    dateStart.add(1, 'year');
  }

  return years;
};

export const monthsNames = (locale = 'ru'): string[] => {
  moment.locale(locale);

  return moment().localeData().months().reduce<string[]>((months, monthName) => {
    return [...months, monthName.replace(/^./, monthName[0].toUpperCase())];
  }, []);
};

export const getCurrentMonthName = (locale = 'ru'): string => {
  const monthIndex = moment().month();

  return monthsNames(locale)[monthIndex];
};

export const getCurrentYear = (): string => {
  return moment().format('YYYY');
};

export const previousDay = (format = 'DD.MM.YYYY'): string => {
  return moment().subtract(1, 'day').format(format);
};

export const currentDay = (format = 'DD.MM.YYYY'): string => {
  return moment().format(format);
};

export const dateIsValid = (dateToCheck: string): boolean => {
  const date = new Date(dateToCheck);
  return date instanceof Date && !isNaN(date.valueOf());
};
