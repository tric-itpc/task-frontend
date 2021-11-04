export const validateEmail = (email: string): boolean => {
  if (email === "") return false;
  let parts = email.split("@");
  if (parts.length !== 2) return false;
  if (parts[0].length === 0) return false;
  if (
    parts[1].length === 0 ||
    parts[1].indexOf(".") <= 0 ||
    parts[1].indexOf(".") === parts[1].length - 1
  )
    return false;
  return true;
};

export const validateName = (name: string): boolean => {
  if (name === "") return false;
  let words = name.trim().split(" ");
  if (words.length < 1) return false;
  for (let i = 0; i < words.length; i++) {
    if (words[i] === "") return false;
    if (i < 2 && !/[A-Z-А-Я-]/.test(words[i][0])) return false;
    if (i >= 1 && !/[a-zA-Zа-яА-Я]/.test(words[i][0])) return false;
    if (/[^a-z-а-я-]/.test(words[i].slice(1))) return false;
  }
  return true;
};

export const validateMsg = (msg: string): boolean => {
  return msg.length >= 10 && !/[^-а-яА-Яa-zA-Z0-9№.,/ ()"]/.test(msg);
};

export const validateFileSize = (file: File | null): boolean => {
  if (!file) return false;
  if (file.size > 2097152) return false;
  return true;
};
