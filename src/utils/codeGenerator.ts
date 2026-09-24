import crypto from 'node:crypto';

const BASE62_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateCode = (length = 7): string => {
  const randomBytes = crypto.randomBytes(length);
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % BASE62_ALPHABET.length;
    code += BASE62_ALPHABET[randomIndex];
  }
  return code;
};
