// china mobile phone number regx
export const validPhoneRegx = /^1[0-9]{10}$/;

// EN and CN Character
export const validENCNCharacterRegx = /^[a-zA-Z\u4e00-\u9fa5]+$/;

// Only EN
export const validENCharacterRegx = /^[a-zA-Z]+$/;

// nonnegative integer
export const nonnegativeIntegerRegx = /^\d+$/;

// url
export const urlRegx = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;

// email
export const validEmailRegx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// china IDCard number
export const validIDCardNumRegx = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;

// get file stuffix
export const fileSuffixMatchRegx = /\.[^\.]+$/;
