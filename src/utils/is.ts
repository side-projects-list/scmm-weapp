/** 是否是手机号格式 */
export function isPhone(phone: string) {
  const phoneRex = /^[1]([3-9])[0-9]{9}$/
  return phoneRex.test(phone)
}
