import {el} from 'redom';
import {
  handleNameInput,
  handleCardNumberInput,
  handleDateInput,
  handleCvvInput,
  handleFormSubmit,
} from './handlers.js';

export function createInputField({
  type = 'text',
  id = '',
  className = '',
  placeholder = '',
  maxLength = '',
  onInput = null,
}) {
  return el('input', {
    type,
    id,
    class: className,
    placeholder,
    maxlength: maxLength,
    oninput: onInput,
  });
}

// Сообщение о валидации (скрыто по умолчанию)
export const validationMessage = el('h2.validation-message', {
  style: 'display: none; margin-top: 20px; text-align: center;',
});

export const form = el(
  'form.form#form',
  {
    onsubmit: handleFormSubmit,
  },
  el(
    'div.form__input-wrap.form__input-wrap_holder',
    el('label.form__label.form__holder-label', 'Card Holder'),
    createInputField({
      id: 'cardHolder',
      className: 'input input__holder',
      placeholder: 'Enter card holder name',
      onInput: handleNameInput,
    })
  ),
  el(
    'div.form__input-wrap.form__input-wrap_number',
    el('label.form__label.form__number-label', 'Card Number'),
    createInputField({
      id: 'cardNumber',
      className: 'input input__number',
      placeholder: 'xxxx xxxx xxxx xxxx',
      maxLength: 19,
      onInput: handleCardNumberInput,
    })
  ),
  el(
    'div.form__input-wrap.form__input-wrap_date',
    el('label.form__label.form__date-label', 'Card Expiry'),
    createInputField({
      id: 'cardDate',
      className: 'input input__date',
      placeholder: 'MM/YY',
      maxLength: 5,
      onInput: handleDateInput,
    })
  ),
  el(
    'div.form__input-wrap.form__input-wrap_cvv',
    el('label.form__label.form__cvv-label', 'CVV'),
    createInputField({
      id: 'cvv',
      className: 'input input__cvv',
      placeholder: '***',
      maxLength: 3,
      onInput: handleCvvInput,
    })
  ),
  el('button.form__button', {type: 'submit'}, 'ОТПРАВИТЬ'),
  validationMessage
);
