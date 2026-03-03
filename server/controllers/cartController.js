import user from "../models/user.js"

// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body
        await user.findByIdAndUpdate(userId, { cartData: cartItems })
         res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Get User Cart Data
export const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await user.findById(userId)
        let cartData = await userData.cartData

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}