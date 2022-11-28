/**获取手机号接口返回类型 */
export interface GetPhoneNumberRes {
  code: string
  encryptedData: string
  errMsg: string
  iv: string
}

/**微信小程序 chooseavatar 接口返回类型 */
export interface ChooseAvatarRes {
  avatarUrl: string
}