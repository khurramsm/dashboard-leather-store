import { db } from "./firebase";
import { useEffect, useState } from "react";

const OrderCard = () => {
  const [jacketOrderDetails, setJacketOrderDetails] = useState([]);
  const getOrderDetails = db.collection("orders");

  useEffect(() => {
    getOrderDetails.orderBy("orderTime", "inc").onSnapshot((snapshot) =>
      setJacketOrderDetails(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="container bg-light">
      <h2 className="pt-4">In Process Order</h2>
      <div className="row py-3">
        {jacketOrderDetails.map((order, ind) => {
          const { data } = order;
          const { orderDetails } = data;
          return (
            <>
              {!data.completeOrder && (
                <>
                  <div className="col-md-6 py-4 p-3">
                    <h2>Order Details</h2>

                    {orderDetails.map((orderItem) => {
                      const cSize = orderItem.customSizing;
                      return (
                        <div className="order-details-div">
                          <p>
                            Order Image:{" "}
                            <img
                              width="200px"
                              height="200px"
                              src={orderItem.imageForFirebase}
                              alt="orderProduct"
                            />
                          </p>
                          <p>
                            Leather Color:{" "}
                            <strong>{orderItem.leatherColor}</strong>
                          </p>

                          <p>
                            Leather Type:{" "}
                            <strong>{orderItem.leatherType}</strong>
                          </p>
                          <p>
                            Lining Color:{" "}
                            <strong>{orderItem.liningColor}</strong>
                          </p>
                          <p>
                            Hardware Color:{" "}
                            <strong>{orderItem.hardwareColor}</strong>
                          </p>
                          <p>
                            Studs Type: <strong>{orderItem.studsType}</strong>
                          </p>

                          <p>
                            Size: <strong>{orderItem.size}</strong>
                          </p>
                          {cSize.length > 0 && (
                            <p>
                              Customize Sizing Details:{" "}
                              <strong>
                                <ul>
                                  {cSize.map((item, ind) => (
                                    <li key={ind}>{item}</li>
                                  ))}
                                </ul>
                              </strong>
                            </p>
                          )}
                          <p>
                            Gender: <strong>{orderItem.gender}</strong>
                          </p>
                          <p>
                            Product Prize:{" "}
                            <strong>$ {orderItem.productPrice}</strong>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-md-6 py-4 p-3">
                    <h2>Address</h2>
                    <div className="address-details-div">
                      <p>
                        Name: <strong>{data.name}</strong>
                      </p>
                      <p>
                        Email: <strong>{data.email}</strong>
                      </p>
                      <p>
                        Address:
                        <strong className="ml-2">{data.address}</strong>
                      </p>
                      <p>
                        City: <strong>{data.city}</strong>
                      </p>
                      <p>
                        Country: <strong>{data.country}</strong>
                      </p>
                      <p>
                        Postal Code: <strong>{data.postalCode}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12 text-center">
                    <h5>
                      Order Total Price:{" "}
                      <strong className="total">{data.totalPrice}</strong>
                    </h5>
                  </div>
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default OrderCard;
