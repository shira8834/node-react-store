const express= require("express")
const router = express.Router()
const bagController=require("../controller/bagController")
const verifyJWT=require("../middleware/verifyJWT")

router.get("/",bagController.getAllBag)//1- כל הסל
router.get("/bag",verifyJWT,bagController.getAllBagId)//1- כל הסל

router.delete("/:id",verifyJWT,bagController.deleteBag)//2-מהסל מחיקת מוצר
router.post("/",verifyJWT,bagController.addToBag)//3 -מוצר חדש
router.put("/",verifyJWT,bagController.updateBag )//4 -עריכת מוצר

module.exports=router