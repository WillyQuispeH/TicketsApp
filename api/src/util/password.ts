import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const salt = 18;
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const passwordCompare = async (password: string, hash: string) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

const generatePassword = () => {
  let password = "";
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!$_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var i = 0; i < 8; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password = chars.substring(randomNumber, randomNumber + i);
  }
  return password;
};

export { hashPassword, passwordCompare, generatePassword };
