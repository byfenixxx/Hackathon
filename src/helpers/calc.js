export const calcSubPriceOfProduct = (item) => {
    return item.count * item.product.price
}
export const calcTotalPriceOfProduct = (products) => {
    let totalPrice = 0
    products.forEach((item) => {
        totalPrice += item.subPrice
    })
    return totalPrice
}