/**商品对象 */
export interface ProductObj {
  /**商品id */
  "id": number 
  /**商品名称 */
	"name": string 
  /**描述 */
	"description": string 
  /**列表封面图 */
	"cover": string 
  /**轮播图 */
	"images": string[] 
  /**富文本内容 */
	"content": string 
  /**价格 (单位:元) */
	"price": number 
  /**原价 (单位:元) */
	"originPrice": number 
  /**库存 */
	"stock": number 
  /**最大可购买数量 */
	"maxPurchaseQuantity": number 
  /**商品分类 */
  "category": string
}