import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, NotificationContext, UserContext } from "../../App";
import bidItems from "../../data/db.json";

function Items() {
  const navigate = useNavigate();
  const { setPersistingNotification, setNotification, setHighestBid, highestBid } = useContext(NotificationContext);
  const { itemAmount, setItemAmount } = useContext(DataContext);
  const { id } = useParams();
  const { user, setCurrentBidder } = useContext(UserContext);
  const [message, setMessage] = useState(false);
  const [value, setValue] = useState(0);
  const [initialBid, setInitialBid] = useState(0);
  const [highestUser,setHighestUser] = useState<string>("")

  const item = bidItems.bidItems.find((s) => s.id === Number(id));
  

  useEffect(() => {
    const currentItem = itemAmount.find((i: { id: number }) => i.id === item?.id) || item;
    if (currentItem) {
      setInitialBid(currentItem.amount);
      setValue(currentItem.amount);
    }

    const currentBid = highestBid.find((bid: { item: string }) => bid.item === item?.name);
    if (currentBid) {
      setCurrentBidder(currentBid);
    }
  }, [item, itemAmount, highestBid, setCurrentBidder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    if (newVal >= initialBid) {
      setValue(newVal);
    }
  };
  const [final,setFinal] = useState(0)
  useEffect(()=>{
    itemAmount.forEach((i:{title:string,amount:number})=>{
      if(i.title === item?.name){

        setFinal(i.amount)
      }

    })
  },[itemAmount,highestBid,value])

useEffect(()=>{
  highestBid.forEach((bid:{item:string,user:string})=>{
    if(bid.item === item?.name){
      setHighestUser(bid.user)
    }
  })

},[highestBid,itemAmount])



  const handleClick = () => {
    setItemAmount((prev: any) =>
      prev.map((itm: { id: number }) => (itm.id === Number(id) ? { ...itm, amount: value } : itm))
    );
    setPersistingNotification((prev: any) => [
      ...prev,
      { item: item?.name, id: Date.now(), amount: value, user },
    ]);
    setNotification({ show: true, item: item?.name, amount: value });
    setMessage(true);

    if (value > 0) {
      const newBid = { item: item?.name, amount: value, user, id: Date.now() };
      setHighestBid((prev: { item: string; amount: number; user: string; id: number }[]) => {
        const existingBid = prev.find((bid) => bid.item === newBid.item );

        if (existingBid) {
          return prev.map((bid) => (bid.item === newBid.item && newBid.amount > existingBid.amount ? newBid : bid));
        } else {
          return [...prev, newBid];
        }
      });
    }
  };

  let inputter:number | undefined = 0
  if(value > 0 ){
      inputter = value
  } else{
    inputter = item?.amount
  }

  return (
    <div className="flex flex-col pt-16 items-center px-10 w-full min-h-screen h-full bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
      <div className="w-full bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8] gap-11 flex h-full border-r">
        <div className="border-r bg-white h-[500px] items-end justify-end flex">
          <img src={item?.image} className="w-[410px] h-[300px]" alt={item?.name} />
        </div>
        <div className="flex items-center justify-center h-[450px] mt-11 w-1/2 backdrop-blur-xl bg-white/30 rounded-xl hover:text-white hover:bg-[#a8c1b3] transition duration-200">
          <div className="flex flex-col items-center justify-between h-full py-9">
            <span className="text-3xl font-medium">{item?.name}</span>
            <span className="text-2xl">Current Bid Amount: ${final}</span>
            {highestUser && (
              <span className="text-lg text-green-900">
                Current Highest Bidder is {highestUser}
              </span>
            )}
            <input
              type="number"
              value={inputter}
              onChange={handleChange}
              placeholder="Enter your bid amount"
              className="focus:outline-none px-3 py-2 rounded text-black"
            />
            <button
              className="bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all duration-200 px-3 py-2 w-[150px] rounded"
              onClick={handleClick}
            >
              Set Bid
            </button>
            <button
              className="bg-black text-white hover:bg-red-900 hover:text-black hover:scale-105 transition-all duration-200 px-3 py-2 w-[150px] rounded"
              onClick={() => {
                navigate(-1);
                setMessage(false);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
      {message && (
        <div className="ml-32 mt-5 text-2xl font-medium">
          You have successfully set a bid of ${value}
        </div>
      )}
    </div>
  );
}

export default Items;
