const validateColor = (color) => {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(color);
};

const validatePadding = (padding) => {
  return Number.isInteger(padding) && padding >= 0 && padding <= 100;
};

const validateBoxType = (type) => {
  const validTypes = ['vertical', 'horizontal', 'baseline'];
  return validTypes.includes(type);
};

const validateContentType = (type) => {
  const validTypes = ['text', 'image', 'button', 'separator', 'spacer'];
  return validTypes.includes(type);
};

const validateTextContent = (content) => {
  if (!content.text || typeof content.text !== 'string') {
    return { isValid: false, error: 'テキストは必須です' };
  }

  if (content.text.length > 120) {
    return { isValid: false, error: 'テキストは120文字以内である必要があります' };
  }

  return { isValid: true };
};

const validateImageContent = (content) => {
  if (!content.url || typeof content.url !== 'string') {
    return { isValid: false, error: '画像URLは必須です' };
  }

  try {
    new URL(content.url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: '無効なURLです' };
  }
};

export {
  validateColor,
  validatePadding,
  validateBoxType,
  validateContentType,
  validateTextContent,
  validateImageContent,
}; 