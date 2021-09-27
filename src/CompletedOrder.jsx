import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { db } from "./firebase";

const CompletedOrder = ({ orderDetails, data, id }) => {
  const updateState = (docId) => {
    const getOrder = db.collection("orders").doc(docId);
    getOrder.update({
      completeOrder: false,
    });
  };
  const onDelete = (docId) => {
    db.collection("orders").doc(docId).delete();
  };

  return (
    <Accordion className="customizeProductButton bg-light">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="text-light" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="accordionHeader"
      >
        <Typography className="text-light">
          Order <span className="text-success ml-3"> (COMPLETED)</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="bg-light">
        <div className="container">
          <div className="row py-3 bg-light">
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
                      Leather Color: <strong>{orderItem.leatherColor}</strong>
                    </p>

                    <p>
                      Leather Type: <strong>{orderItem.leatherType}</strong>
                    </p>
                    <p>
                      Lining Color: <strong>{orderItem.liningColor}</strong>
                    </p>
                    <p>
                      Hardware Color: <strong>{orderItem.hardwareColor}</strong>
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
                      Product Prize: <strong>$ {orderItem.productPrice}</strong>
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
          </div>
          <button className="orderActiveBtn" onClick={() => updateState(id)}>
            Undo Complete
          </button>
          <button className="orderDeleteBtn mt-3" onClick={() => onDelete(id)}>
            Delete Order
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CompletedOrder;
