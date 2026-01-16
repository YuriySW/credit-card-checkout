// validation.js
/**
 * Валидация Card Holder
 * Пропускает строку с двумя словами, разделенными пробелами,
 * состоящую только из латинских букв
 */
export function validateCardHolder(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const trimmedValue = value.trim();

  // Проверка на наличие цифр
  if (/\d/.test(trimmedValue)) {
    return false;
  }

  // Проверка на кириллицу
  if (/[а-яА-ЯёЁ]/.test(trimmedValue)) {
    return false;
  }

  // Проверка на два слова, разделенных пробелом
  const words = trimmedValue.split(/\s+/);

  if (words.length !== 2) {
    return false;
  }

  // Проверка, что оба слова состоят только из латинских букв
  const latinLettersOnly = /^[a-zA-Z]+$/;

  return words.every((word) => latinLettersOnly.test(word));
}

/**
 * Валидация Card Number
 * Пропускает только строку из цифр (с пробелами или без)
 * Длина должна быть от 13 до 16 цифр
 */
export function validateCardNumber(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  // Убираем пробелы для проверки
  const digitsOnly = value.replace(/\s/g, '');

  // Проверка на наличие нецифровых символов
  if (!/^\d+$/.test(digitsOnly)) {
    return false;
  }

  // Проверка длины (стандартные карты: 13-16 цифр)
  const length = digitsOnly.length;

  return length >= 13 && length <= 16;
}

/**
 * Валидация CVV/CVC
 * Пропускает строку ровно из 3 цифровых символов
 */
export function validateCVV(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const trimmedValue = value.trim();

  // Проверка на точную длину 3 символа
  if (trimmedValue.length !== 3) {
    return false;
  }

  // Проверка, что все символы - цифры
  return /^\d{3}$/.test(trimmedValue);
}

/**
 * Валидация даты карты (MM/YY)
 */
export function validateCardDate(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  // Формат MM/YY
  const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

  return datePattern.test(value);
}

/**
 * Общая валидация всех полей формы
 */
export function validateForm(cardHolder, cardNumber, cardDate, cvv) {
  return {
    cardHolder: validateCardHolder(cardHolder),
    cardNumber: validateCardNumber(cardNumber),
    cardDate: validateCardDate(cardDate),
    cvv: validateCVV(cvv),
    isValid: function () {
      return this.cardHolder && this.cardNumber && this.cardDate && this.cvv;
    },
  };
}
