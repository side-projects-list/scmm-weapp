/**
 * 处理敏感字符串，如隐藏手机号中间几位数字，姓名脱敏处理等
 * @param {String} data 要脱敏的数据
 * @param {Number} left 左边保留几位
 * @param {Number} right 右边保留几位
 */
export function hideSensitive(data: string, left = 3, right = 4) {
  const sLength = data.length || 0
  if (!data || sLength === 0)
    return ''

  if (sLength === 1)
    return data[0] + '*'.repeat(sLength)

  if (sLength <= left)
    return data[0] + '*'.repeat(sLength - 1)

  if (sLength <= left + right)
    return data[0] + '*'.repeat(sLength - 2) + data[sLength - 1]

  return data.slice(0, left) + '*'.repeat(sLength - right - left) + data.slice(sLength - right)
}
