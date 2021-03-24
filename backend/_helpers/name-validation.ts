const badWordsArray = ['badword'];

const validName = new RegExp(/^[a-åA-Å]{2,}(?: [a-åA-Å]+){0,2}$/);

export const badNames = (string: string) => {
  if (string) {
    if (!validName.test(string) || badWordsArray.filter((w) => string.toLowerCase().includes(w)).length > 0) return true;
  }
  return false;
};

export const nameLength = (string: string, length: number) => {
  if (string) {
    if (string.length > length) return true;
  }
  return false;
};

export const mediumPassword = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
