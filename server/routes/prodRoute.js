const express= require("express")
const router = express.Router()
const prodController=require("../controller/prodController")

const verifyJWT=require('../middleware/verifyJWT')

const verifyAdmin=require('../middleware/verifyAdmin')
router.get("/",prodController.getAllProd)//1- כל הרשימה
router.get("/:name",prodController.getByName)//5 -  מציאת מוצר
router.get("/id/:id",prodController.getById)//6 מציאה בעזרת id 

router.use(verifyJWT)
router.use(verifyAdmin)
router.delete("/:id",prodController.deleteProd)//2- מחיקת מוצר
router.post("/",prodController.createNewProd)//3 -מוצר חדש
router.put("/",prodController.updateProd)//4 -עריכת מוצר


module.exports=router