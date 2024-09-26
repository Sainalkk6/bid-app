import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { NotificationContext, UserContext } from "../../App";

function NotificationContent() {
  const { persistingNotification,setPersistingNotification } = useContext(NotificationContext);
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const notifications = []
  notifications.push(persistingNotification)
  const [userNotifications , setUserNotifications] = useState<any>([])
  

  useEffect(()=>{
    setUserNotifications(persistingNotification.filter((noti:{user:string})=>noti.user !== user))
  },[persistingNotification,setPersistingNotification])


  const handleDelete = (id:number)=> setUserNotifications(userNotifications.filter((noti:{id:number,user:string})=> noti.id!== id))

  return (
    <div className="w-full flex-col gap-8 h-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
      <div className="flex flex-col gap-4 mt-5 items-center  backdrop-blur-xl pt-4 px-3 scrollbar-hide overflow-y-scroll  bg-white/10 h-[400px] w-8/12">
        {userNotifications.length > 0 ? userNotifications.map((noti:{user:string,amount:number,item:string,id:number},index:number)=>(
          <div  key={index}  className="h-fit w-full flex pb-6 items-center border-b justify-between">
            <h1 className="font-medium text-xl">{noti.user} has bidded {noti.amount} on {noti.item}</h1>
            <FaTrashCan className="cursor-pointer hover:text-red-800 text-xl" onClick={()=> handleDelete(noti.id)}/>
          </div>
        )) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="font-medium text-3xl">No New Notification!</h1>
          </div>
        )}
      </div>
      <button className="flex items-center justify-center bg-black text-white p-3 rounded-lg hover:scale-105 hover:bg-red-700 hover:text-black hover:font-medium text-lg w-[150px] duration-300" onClick={()=> navigate(-1)}>Back</button>
    </div>
  );
}

export default NotificationContent;
