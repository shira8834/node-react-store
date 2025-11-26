const Prod= require("../models/prod")
const router= require("../routes/prodRoute")

//1
const getAllProd=async(req, res)=>{
    const prod = await Prod.find()
    res.json(prod)
}

//2
const deleteProd=async(req,res)=>{
    const {id}=req.params
    const prod = await Prod.findById(id)
    if(!prod)
       return res.status(400).json({message:"no prod"})
    await prod.deleteOne()
        
    // res.json({message:`Prod whith id  ${id} deleted`})
    res.json({message:`Prod is deleted`})
}
//3
const createNewProd=async(req,res)=>{
    const{name, price, code,img}=req.body
    if(!name || !price ||!code || !img)
        return res.status(400).send("name, price, code, img are required")

    const duplicate = await Prod.findOne({code:code}).lean()
    if(duplicate)
        return res.status(409).json({message:"Duplicate code"})

    const prod= await Prod.create({name, price, code, img})
    if(prod)
        return res.status(200).json({message:"new prod created"})
    else 
    return res.status(500).json({message:"Invalid prod"})
}   

//4
const updateProd=async(req, res)=>{
    console.log("ss");
    const {name, price, code,img, _id}=req.body
    if(!_id)
        return res.status(500).json({message:"id -required!"})

    const prod = await Prod.findById(_id)
    if(name)
        prod.name=name
    if(price)
        prod.price=price
    if(code)
        prod.code=code
    if(img)
        prod.img=img

    const update=await prod.save()
    res.json(`Prod ${update} update`)
}

//5
const getByName =async(req, res)=>{
    const {name}=req.params
    const allProd = await Prod.find()

    const mapProd=allProd.filter(p=>{
        if(p.name.includes(name))
        return p
    })
    res.json(mapProd)
}

//6
const getById= async(req,res)=>{
    const {id}=req.params
    const prod = await Prod.findById(id)
    console.log(prod);
    res.json(prod)
}

module.exports={createNewProd,getAllProd,deleteProd,updateProd,getByName,getById}

