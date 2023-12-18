export const textToHex = (inputText: string) => {
  let hexString = '';
  for (let i = 0; i < inputText.length; i++) {
    const hex = inputText.charCodeAt(i).toString(16);
    hexString += hex.padStart(2, '0'); // Ensure each byte is represented by two hexadecimal digits
  }
  return hexString;
};
