import { Outlet } from "react-router-dom"
import Header from "./Header"




function Layot() {
  return (
    <>
       {/* <div>Layot</div> */}
           <Header />
       <Outlet/>
    </>
 

  )
}

export default Layot