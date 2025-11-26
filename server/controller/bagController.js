const Bag = require("../models/bag")

//1
const getAllBag = async (req, res) => {
    const bag = await Bag.find()
    res.json(bag)
}

const getAllBagId = async (req, res) => {
    const { _id } = req.user
    // const bag = await Bag.find({ userName:_id }).populate("code").lean()
    // const bag = await Bag.find().populate("code").lean()
    const bag = await Bag.find({ userName: _id }).populate('code').lean()

    console.log(bag);
    // const bag = await Bag.find({userName:userId}).populate("userName").populate("aa").populate("code").lean()
    res.json(bag)
}

//2
const deleteBag = async (req, res) => {
    const { id } = req.params
    const bag = await Bag.findById(id)
    if (!bag)
        return res.status(400).json({ message: "no bag" })
    await bag.deleteOne()
    res.json({ message: `Prod is deleted` })
}

//3
const addToBag = async (req, res) => {
    const userName = req.user._id
    const { code, count } = req.body
    if (!userName || !code)
        return res.status(400).json({ message: "userName, code are required" })

    // const product = await ShoppingCart.findOne({ userId: idOfUser, productId: id })

    // if (product) {
    //    product.qty = product.qty + 1
    //    const product2 = await product.save()
    //    return res.status(200).json("new product added")
    // }



    const findProd = await Bag.findOne({ userName, code })
    if (findProd) {
        findProd.count=Number(findProd.count)+1
        const findProd2 = await findProd.save()
        if(findProd2)
         console.log("findProd update");
        return res.status(200).json({ message: "findProd" })
    }

    const bag = await Bag.create({ userName, code, count })
    if (bag)
        return res.status(200).json({ message: "add prod to bag" })
    else
        return res.status(500).json({ message: "Invalid prod" })
}

//4
const updateBag = async (req, res) => {
    const { count, _id } = req.body
    if (!_id)
        return res.status(500).json({ message: "id -required!" })

    const bag = await Bag.findById(_id)

    if (count)
        bag.count = count

    const update = await bag.save()
    res.json({ message: `Prod ${update} update` })
}


module.exports = { addToBag, getAllBag, deleteBag, updateBag, getAllBagId }