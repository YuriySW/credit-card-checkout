// validation.test.js
import {
  validateCardHolder,
  validateCardNumber,
  validateCVV,
  validateCardDate,
  validateForm,
} from './validation.js';

describe('validateCardHolder', () => {
  describe('должна отклонять одно слово', () => {
    test('отклоняет одно слово', () => {
      expect(validateCardHolder('John')).toBe(false);
    });

    test('отклоняет одно слово с пробелами', () => {
      expect(validateCardHolder('  John  ')).toBe(false);
    });
  });

  describe('должна отклонять кириллицу', () => {
    test('отклоняет два слова на кириллице', () => {
      expect(validateCardHolder('Иван Иванов')).toBe(false);
    });

    test('отклоняет смешанный текст (латиница + кириллица)', () => {
      expect(validateCardHolder('John Иванов')).toBe(false);
    });

    test('отклоняет кириллицу с буквой ё', () => {
      expect(validateCardHolder('Пётр Семёнов')).toBe(false);
    });
  });

  describe('должна отклонять содержание цифр', () => {
    test('отклоняет цифры в первом слове', () => {
      expect(validateCardHolder('John2 Doe')).toBe(false);
    });

    test('отклоняет цифры во втором слове', () => {
      expect(validateCardHolder('John Doe3')).toBe(false);
    });

    test('отклоняет цифры в обоих словах', () => {
      expect(validateCardHolder('John1 Doe2')).toBe(false);
    });
  });

  describe('валидные случаи', () => {
    test('принимает два слова латиницей', () => {
      expect(validateCardHolder('John Doe')).toBe(true);
    });

    test('принимает два слова с разным регистром', () => {
      expect(validateCardHolder('JOHN DOE')).toBe(true);
    });

    test('принимает два слова в нижнем регистре', () => {
      expect(validateCardHolder('john doe')).toBe(true);
    });
  });

  describe('граничные случаи', () => {
    test('отклоняет три слова', () => {
      expect(validateCardHolder('John Middle Doe')).toBe(false);
    });

    test('отклоняет пустую строку', () => {
      expect(validateCardHolder('')).toBe(false);
    });

    test('отклоняет null', () => {
      expect(validateCardHolder(null)).toBe(false);
    });

    test('отклоняет undefined', () => {
      expect(validateCardHolder(undefined)).toBe(false);
    });

    test('отклоняет специальные символы', () => {
      expect(validateCardHolder('John-Paul Smith')).toBe(false);
    });
  });
});

describe('validateCardNumber', () => {
  describe('должна отклонять нецифровые символы - кириллица', () => {
    test('отклоняет кириллицу', () => {
      expect(validateCardNumber('1234абвг5678')).toBe(false);
    });

    test('отклоняет только кириллицу', () => {
      expect(validateCardNumber('абвгдежзиклм')).toBe(false);
    });
  });

  describe('должна отклонять нецифровые символы - латиница', () => {
    test('отклоняет латиницу', () => {
      expect(validateCardNumber('1234abcd5678')).toBe(false);
    });

    test('отклоняет только латиницу', () => {
      expect(validateCardNumber('abcdefghijkl')).toBe(false);
    });
  });

  describe('должна отклонять нецифровые символы - знаки препинания', () => {
    test('отклоняет дефисы', () => {
      expect(validateCardNumber('1234-5678-9012-3456')).toBe(false);
    });

    test('отклоняет точки', () => {
      expect(validateCardNumber('1234.5678.9012.3456')).toBe(false);
    });

    test('отклоняет запятые', () => {
      expect(validateCardNumber('1234,5678,9012,3456')).toBe(false);
    });
  });

  describe('должна отклонять недостаточное количество цифр', () => {
    test('отклоняет 12 цифр', () => {
      expect(validateCardNumber('123456789012')).toBe(false);
    });

    test('отклоняет 10 цифр', () => {
      expect(validateCardNumber('1234567890')).toBe(false);
    });

    test('отклоняет 5 цифр', () => {
      expect(validateCardNumber('12345')).toBe(false);
    });
  });

  describe('должна отклонять слишком большое количество цифр', () => {
    test('отклоняет 17 цифр', () => {
      expect(validateCardNumber('12345678901234567')).toBe(false);
    });

    test('отклоняет 18 цифр', () => {
      expect(validateCardNumber('123456789012345678')).toBe(false);
    });

    test('отклоняет 20 цифр', () => {
      expect(validateCardNumber('12345678901234567890')).toBe(false);
    });
  });

  describe('валидные случаи', () => {
    test('принимает 16 цифр', () => {
      expect(validateCardNumber('1234567890123456')).toBe(true);
    });

    test('принимает 16 цифр с пробелами', () => {
      expect(validateCardNumber('1234 5678 9012 3456')).toBe(true);
    });

    test('принимает 15 цифр (American Express)', () => {
      expect(validateCardNumber('123456789012345')).toBe(true);
    });

    test('принимает 13 цифр (старый формат Visa)', () => {
      expect(validateCardNumber('1234567890123')).toBe(true);
    });
  });
});

describe('validateCVV', () => {
  describe('должна пропускать 3 цифровых символа', () => {
    test('принимает 3 цифры', () => {
      expect(validateCVV('123')).toBe(true);
    });

    test('принимает 3 нуля', () => {
      expect(validateCVV('000')).toBe(true);
    });
  });

  describe('должна отклонять 1-2 символа', () => {
    test('отклоняет 1 цифру', () => {
      expect(validateCVV('1')).toBe(false);
    });

    test('отклоняет 2 цифры', () => {
      expect(validateCVV('12')).toBe(false);
    });
  });

  describe('должна отклонять больше 3 символов', () => {
    test('отклоняет 4 цифры', () => {
      expect(validateCVV('1234')).toBe(false);
    });

    test('отклоняет 5 цифр', () => {
      expect(validateCVV('12345')).toBe(false);
    });
  });

  describe('должна отклонять нецифровые символы - латиница', () => {
    test('отклоняет латинские буквы', () => {
      expect(validateCVV('abc')).toBe(false);
    });

    test('отклоняет смесь цифр и латиницы', () => {
      expect(validateCVV('12a')).toBe(false);
    });
  });

  describe('должна отклонять нецифровые символы - кириллица', () => {
    test('отклоняет кириллицу', () => {
      expect(validateCVV('абв')).toBe(false);
    });

    test('отклоняет смесь цифр и кириллицы', () => {
      expect(validateCVV('12а')).toBe(false);
    });
  });

  describe('должна отклонять нецифровые символы - знаки препинания', () => {
    test('отклоняет специальные символы', () => {
      expect(validateCVV('12*')).toBe(false);
    });

    test('отклоняет дефисы', () => {
      expect(validateCVV('1-2')).toBe(false);
    });

    test('отклоняет точки', () => {
      expect(validateCVV('1.2')).toBe(false);
    });
  });

  describe('граничные случаи', () => {
    test('отклоняет пустую строку', () => {
      expect(validateCVV('')).toBe(false);
    });

    test('отклоняет null', () => {
      expect(validateCVV(null)).toBe(false);
    });

    test('отклоняет undefined', () => {
      expect(validateCVV(undefined)).toBe(false);
    });
  });
});

describe('validateCardDate', () => {
  test('принимает валидную дату', () => {
    expect(validateCardDate('12/25')).toBe(true);
  });

  test('принимает январь', () => {
    expect(validateCardDate('01/25')).toBe(true);
  });

  test('отклоняет невалидный месяц 13', () => {
    expect(validateCardDate('13/25')).toBe(false);
  });

  test('отклоняет невалидный месяц 00', () => {
    expect(validateCardDate('00/25')).toBe(false);
  });

  test('отклоняет неправильный формат', () => {
    expect(validateCardDate('1225')).toBe(false);
  });
});

describe('validateForm', () => {
  test('возвращает true для всех валидных полей', () => {
    const result = validateForm('John Doe', '1234 5678 9012 3456', '12/25', '123');
    expect(result.isValid()).toBe(true);
  });

  test('возвращает false если cardHolder невалиден', () => {
    const result = validateForm('John', '1234 5678 9012 3456', '12/25', '123');
    expect(result.isValid()).toBe(false);
    expect(result.cardHolder).toBe(false);
  });

  test('возвращает false если cardNumber невалиден', () => {
    const result = validateForm('John Doe', '1234', '12/25', '123');
    expect(result.isValid()).toBe(false);
    expect(result.cardNumber).toBe(false);
  });

  test('возвращает false если cvv невалиден', () => {
    const result = validateForm('John Doe', '1234 5678 9012 3456', '12/25', '12');
    expect(result.isValid()).toBe(false);
    expect(result.cvv).toBe(false);
  });
});
