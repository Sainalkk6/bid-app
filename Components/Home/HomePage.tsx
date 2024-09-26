import { useContext } from "react";
import { DataContext } from "../../App";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Items from "../BiddingPage/Items";


function HomePage() {

    const { items } = useContext(DataContext);


  
    const show = false;
  return (
    <div className="w-full h-full min-h-screen pb-8  bg-gradient-to-tr from-[#a8c1b3] to-[#e8e8e8]">
      <Navbar />
      <div className="px-12 justify-center items-center grid lg:grid-cols-3 ">
        {items &&
          items.map(
            (item: {
              id: number;
              amount: number;
              image: string;
              name: string;
            }) => (
              <Card
                amount={item.amount}
                key={item.id}
                id={item.id}
                image={item.image}
                item={item.name}
              />
            )
          )}
      </div>
      {show && <Items/>}
      {/* { notification.show && <Notification/>} */}
    </div>
  )
}

export default HomePage
