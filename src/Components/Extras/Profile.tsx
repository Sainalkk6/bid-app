import { useContext } from "react";
import { NotificationContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";

function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setHighestBid,highestBid, setPersistingNotification } = useContext(NotificationContext);


  let userInfo:{id:number,item:string,amount:number,user:string}[] = []

  highestBid.forEach((bid:{user:string,item:string,amount:number,id:number})=>{
    if(bid.user === user){
      userInfo.push(bid)
    }
  })
  console.log(userInfo)



  const handleDelete = (id: number) => {
    setPersistingNotification((prev:any) => prev.filter((noti: { id: number }) => noti.id !== id));
    setHighestBid((prev:any) => prev.filter((bid: { id: number, user: string }) => bid.id !== id && user === bid.user));
  };
  console.log(userInfo)

  return (
    <div className="w-full flex flex-col items-center justify-center h-full min-h-screen pb-8 bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
      <div className="flex flex-col gap-5 pt-20 backdrop-blur-2xl rounded-lg bg-white/30 h-[600px] w-[500px]">
        <div className="w-[120px] mx-auto">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
        </div>
        <span className="mx-auto font-medium text-2xl">{user}</span>
        <div className="w-full font-medium text-xl text-green-900">
          <div className="w-full border-b border-black pb-3 mb-8">
            <span className="ml-4">My Biddings</span>
          </div>
          {userInfo.length > 0 && (
            <div className="flex justify-between mb-5 px-4">
              <span>Item</span>
              <span>Amount</span>
              <span>Delete</span>
            </div>
          )}
          {userInfo.map((bid:{id:number,item:string,amount:number}) => (
            <div key={bid.id} className="border-b border-neutral-400 pb-3 flex px-4 justify-between mb-5">
              <span>{bid.item}</span>
              <span className="pl-6">{bid.amount}</span>
              <span
                className="inline-block pl-10 cursor-pointer hover:text-red-600"
                onClick={() => handleDelete(bid.id)}
              >
                <IoMdTrash />
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="relative top-6 bg-black text-white px-3 py-2 w-[200px] rounded-lg hover:bg-red-900 hover:text-black transition duration-200"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

export default Profile;
