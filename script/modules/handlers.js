import {cardName, cardNumber, cardDate} from './card.js';
import {validateForm} from './validation.js';
import {validationMessage} from './createElement.js';

export function handleNameInput(event) {
  const value = event.target.value;
  const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
  const words = sanitizedValue.split(' ');
  const trimmedWords = words.map((word) => word.slice(0, 20));
  const limitedWords = trimmedWords.slice(0, 2);
  const limitedValue = limitedWords.join(' ');
  cardName.textContent = limitedValue || 'John Doe';
  event.target.value = limitedValue;
}

export function handleCardNumberInput(event) {
  let value = event.target.value.replace(/\D/g, '');
  value = value.slice(0, 16);
  event.target.value = value.replace(/(\d{4})/g, '$1 ').trim();
  cardNumber.textContent = event.target.value || 'xxxx xxxx xxxx xxxx';
}

export function handleDateInput(event) {
  let value = event.target.value.replace(/\D/g, '');
  value = value.slice(0, 4);
  if (value.length >= 3) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }
  event.target.value = value;
  cardDate.textContent = value || 'MM/YY';
}

export function handleCvvInput(event) {
  const value = event.target.value.replace(/\D/g, '');
  event.target.value = value.slice(0, 3);
}

export function handleFormSubmit(event) {
  event.preventDefault();

  // Получаем значения полей
  const cardHolderInput = document.getElementById('cardHolder');
  const cardNumberInput = document.getElementById('cardNumber');
  const cardDateInput = document.getElementById('cardDate');
  const cvvInput = document.getElementById('cvv');

  const cardHolderValue = cardHolderInput.value;
  const cardNumberValue = cardNumberInput.value;
  const cardDateValue = cardDateInput.value;
  const cvvValue = cvvInput.value;

  // Валидация
  const validation = validateForm(cardHolderValue, cardNumberValue, cardDateValue, cvvValue);

  // Показываем сообщение
  if (validation.isValid()) {
    validationMessage.textContent = 'Данные валидны ✓';
    validationMessage.style.color = '#4CAF50';
  } else {
    validationMessage.textContent = 'Данные не валидны ✗';
    validationMessage.style.color = '#f44336';
  }

  validationMessage.style.display = 'block';

  // Скрываем сообщение через 2 секунды
  setTimeout(() => {
    validationMessage.style.display = 'none';
  }, 2000);
}
