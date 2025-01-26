export const emailRegex = /^(?=[a-z0-9]{1,64}@[a-z]+\.[a-z]{1,255}$).{1,320}$/;
export const lettersNumAndCharacters = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s!@#$%^&*()-_=+[\]{}|;:'",.<>/?\\]{1,}$/;
export const positiveIntegers = /^[0-9]\d*$/;
export const linkRegex = /((http|https):\/\/)(www\.)?([a-zA-Z0-9.-]+|\d{1,3}(\.\d{1,3}){3})(:[0-9]+)?(\/[-a-zA-Z0-9@:%._\\+~#?&//=]*)?/;