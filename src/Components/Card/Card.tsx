import { useContext } from "react"
import { CardType } from "../../Types/Type"
import { DataContext } from "../../App"
import { useNavigate } from "react-router-dom"


function Card({item,id,image,amount}:CardType) {
  const {itemAmount} = useContext(DataContext)

  
  const navigate = useNavigate()
  const currentItem = itemAmount.find((i:{id:number}) => i.id === id);
  const currentAmount = currentItem?.amount > 0   ? currentItem.amount : amount;



  return (
    <div className="bg-white z-10 hover:bg-[#dcee86] hover:z-30 hover:text-green-900 rounded-lg min-h-[412px] w-[350px] hover:scale-105  h-fit pb-5 shadow-lg  duration-200 mt-9 flex flex-col ">
        <div className="rounded-lg items-center w-fit justify-center mx-auto">
            <img src={image} alt="" className="object-cover object-center h-[196px]" />
        </div>
        <div className="flex border-t items-center pt-5  gap-4 justify-center  flex-col font-medium">
            <span className="text-4xl">{item}</span>
            <span className="text-xl">Current Bid Amount : <span className="text-2xl">{currentAmount}</span></span>
        </div>
        <button className="mt-3 px-5 text-nowrap hover:bg-[#ececec] w-fit shadow-lg rounded-md text-green-900  bg-[#dcee86] font-medium mx-auto hover:text-black py-2" onClick={()=>navigate(`/${id}`)}>Start bidding</button>
    </div>
  )
}

export default Card
