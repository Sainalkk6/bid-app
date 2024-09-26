import { useContext } from "react"
import { NotificationContext, UserContext } from "../../App"




function Notification() {
  const {notification,setNotification} = useContext(NotificationContext)
  setTimeout(()=> setNotification({show:false,item:"",amount:0}),3000)
  const {user} = useContext(UserContext)
  return (
    <div className="bg-red-800 text-nowrap w-fit z-50 flex items-center justify-center rounded-lg transition-all duration-200 h-fit px-4 py-3 absolute right-4 top-[550px]">
      <h1>{user} has bidded on {notification.item}  for {notification.amount}</h1>

    </div>
  )
}

export default Notification
