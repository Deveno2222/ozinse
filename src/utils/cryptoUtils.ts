import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

export const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

export const decryptToken = (cipher: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.error("Ошибка при расшифровке токена:", e);
    return null;
  }
};
