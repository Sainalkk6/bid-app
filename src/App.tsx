import { createContext, useEffect, useState } from "react"
import bidItems from "../src/data/db.json"

import HomePage from "./Components/Home/HomePage"
import Items from "./Components/BiddingPage/Items"
import NotificationContent from "./Components/Extras/NotificationContent"
import CurrentHighest from "./Components/Extras/CurrentHighest"
import Profile from "./Components/Extras/Profile"
import { Route, Routes } from "react-router-dom"


export const DataContext = createContext<any>(null)
export const UserContext = createContext<any>(null)
export const NotificationContext = createContext<any>(null)


function App() {
  const [user,setUser] = useState("Jacob")
  const items = bidItems.bidItems
  const [itemAmount,setItemAmount] = useState<any[]>([])
  const [notification,setNotification] = useState<{show:boolean,item:string,amount:number}>({show:false,item:"",amount:0})
  const [persistingNotification,setPersistingNotification] = useState<{item:string,user:string,amount:number,id:number}[]>([])
  const [highestBid,setHighestBid] = useState<{item:string,user:string,amount:number,id:number}[]>([])
  const [currentBidder ,setCurrentBidder] = useState<any>(null)

  useEffect(()=>{
    setItemAmount(items.map(item=>({
      id:item.id,
      user:user,
      title:item.name,
      amount:item.amount

    })))
  },[items])

  useEffect(()=>{
    const items = JSON.parse(localStorage.getItem("items")!)
    const bidder = JSON.parse(localStorage.getItem("highestBidder")!)
    const highestBid = JSON.parse(localStorage.getItem("highestBid")!)
    const user = JSON.parse(localStorage.getItem("user")!)
    const message = JSON.parse(localStorage.getItem("messages")!)
    if(items){
      setItemAmount(items)
    }
    if(bidder){
      setCurrentBidder(bidder)
    }

    if(highestBid){
      setHighestBid(highestBid)
    }

    if(user){
      setUser(user)
    }
    if(message){
      setPersistingNotification(message)
    }
  },[])

  useEffect(()=>{
    if(itemAmount.length > 1){
      localStorage.setItem("items",JSON.stringify(itemAmount))
      localStorage.setItem("highestBidder",JSON.stringify(currentBidder))
      localStorage.setItem("highestBid",JSON.stringify(highestBid))
      localStorage.setItem("user",JSON.stringify(user))
      localStorage.setItem("messages",JSON.stringify(persistingNotification))
    }
  },[itemAmount,currentBidder,highestBid,user])

  return (

    <>
      <UserContext.Provider value={{user,setUser,currentBidder,setCurrentBidder}}>
        <DataContext.Provider value={{items,itemAmount,setItemAmount}}>
          <NotificationContext.Provider value={{notification,setNotification,persistingNotification,setPersistingNotification,highestBid,setHighestBid}}>
            <Routes>
              <Route path="/" element = {<HomePage/>}/>
              <Route path="/:id" element = {<Items/>}/>
              <Route path="/notification" element = {<NotificationContent/>}/>
              <Route path="/currentHighest" element = {<CurrentHighest/>}/>
              <Route path="/profile" element = {<Profile/>}  /> 
            </Routes>
          </NotificationContext.Provider>
        </DataContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
