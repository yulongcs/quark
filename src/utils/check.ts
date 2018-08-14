// 手机号码验证regx
export const validPhoneRegx = /^1[0-9]{10}$/;

// 英文字母、汉字或二者混合
export const validENCNCharacterRegx = /^[a-zA-Z\u4e00-\u9fa5]+$/;

// 英文字母
export const validENCharacterRegx = /^[a-zA-Z]+$/;

// 非负整数
export const nonnegativeIntegerRegx = /^\d+$/;

// url
export const urlRegx = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;

// 邮箱
export const validEmailRegx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// ipv4及ipv4段正则
export const vaildIPv4Regx = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)(~(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d))?$/;
