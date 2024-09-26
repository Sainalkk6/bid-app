import { useContext, useEffect, useState } from "react"
import { NotificationContext } from "../../App"
import { useNavigate } from "react-router-dom"

function CurrentHighest() {
  const {persistingNotification} = useContext(NotificationContext)
  console.log(persistingNotification)
  const [currentHighest,setCurrentHighest] = useState<any[]>([])
  useEffect(() => {
    const highestBids = persistingNotification.reduce((acc: any, currentBid: any) => {
      const existingBid = acc.find((bid: any) => bid.item === currentBid.item);
      if (!existingBid || currentBid.amount > existingBid.amount) {
        return acc.filter((bid: any) => bid.item !== currentBid.item).concat(currentBid);
      }
      return acc;
    }, []);
  
    setCurrentHighest(highestBids);
  }, [persistingNotification]);
  
  const navigate = useNavigate()
  return (
    
    <div className="w-full flex-col gap-8 h-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
      <div className="flex gap-7 flex-col items-center min-h-[530px] pt-5 bg-white/20 backdrop-blur-2xl h-fit w-[600px]">
      <h1 className="font-medium underline text-3xl">Current Highest Bids</h1>
        {currentHighest.map((bid)=>(
          <div key={bid.id} className="border-b text-2xl border-black pl-5 flex flex-col py-4 w-full">
            <span>User : {bid.user}</span>
            <span>Item : {bid.item}</span>
            <span>Amount : ${bid.amount}</span>
          </div>
        ))}
      </div> 
      <button onClick={()=> navigate(-1)} className="bg-black text-white hover:scale-105 hover:bg-red-800 transition duration-200 hover:text-black px-3 py-2 w-[150px] rounded-lg">Back</button>
    </div>
  )
}

export default CurrentHighest
