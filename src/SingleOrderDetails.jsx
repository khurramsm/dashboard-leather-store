import { db } from "./firebase";
import { useEffect, useState } from "react";
import SingleOrderAcc from "./SingleOrderAcc";
import CompletedOrder from "./CompletedOrder";

const SingleOrderDetails = () => {
  const [jacketOrderDetails, setJacketOrderDetails] = useState([]);
  const getOrderDetails = db.collection("orders");

  useEffect(() => {
    getOrderDetails.orderBy("orderTime", "desc").onSnapshot((snapshot) =>
      setJacketOrderDetails(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="container ">
      <h2 className="pt-4">In Process Orders</h2>
      {jacketOrderDetails.map((order, ind) => {
        const { data } = order;
        const { orderDetails } = data;
        return (
          <>
            {!data.completeOrder && (
              <>
                <SingleOrderAcc orderDetails={orderDetails} data={data} />
              </>
            )}
           
          </>
        );
      })}
      <h2 className="pt-4">Completed Orders</h2>
      {jacketOrderDetails.map((order, ind) => {
        const { data } = order;
        const { orderDetails } = data;
        return (
          <>
            
            {data.completeOrder && (
              <>
                <CompletedOrder orderDetails={orderDetails} data={data} />
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export default SingleOrderDetails;
