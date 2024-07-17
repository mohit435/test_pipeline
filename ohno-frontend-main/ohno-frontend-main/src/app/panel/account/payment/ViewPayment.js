"use client";
import InputBox from "@/common-components/InputBox";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { communication } from "@/services/communication";
import { toast } from "react-toastify";
import CustomBtn from "@/common-components/CustomBtn";
import Loader from "@/common-components/Loader";
import { useForm } from "react-hook-form";
import CustomTextArea from "@/common-components/CustomTextArea";

const ViewPayment = ({ modalState, setModalStates }) => {
  const [orderData, setOrderData] = useState({});
  const [allProductInfo, setAllProductInfo] = useState([]);
  const [quotationId, setQuotationId] = useState();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [vendorId, setVendorId] = useState();
  const [loader, setLoader] = useState(false);
  const [modeData, setModeData] = useState({
    paymentMode: "",
    validation: false,
  });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  // get particular payment details on click on order Id
  const getAccountOrderById = async () => {
    try {
      const serverResponse = await communication.fetchAccountOrderById(
        modalState?.orderId
      );
      if (serverResponse?.data?.status === "SUCCESS") {
        setOrderData(serverResponse?.data?.order);
        setPaymentHistory(serverResponse?.data?.paymentHistory);
        setLoader(false);
      } else if (serverResponse?.data?.status === "JWT_INVALID") {
        toast.info(serverResponse?.data?.message);
        router.push("/");
      } else {
        setOrderData({});
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  // change the status
  const onSubmit = async (data) => {
    try {
      if (modeData?.paymentMode === "") {
        setModeData((prev) => ({ ...prev, validation: true }));
        return false;
      }
      const dataToSend = {
        ...data,
        paymentMode: modeData?.paymentMode,
        orderId: modalState?.orderId,
      };
      setLoader(true);
      const serverResponse = await communication.changePaymentMode(dataToSend);
      if (serverResponse?.data?.status === "SUCCESS") {
        setLoader(false);
        toast.success(serverResponse?.data?.message);
        setValue("paidAmount", "");
        setValue("remark", "");
        // setModalStates((prev) => ({ ...prev, viewPayment: false, orderId: "" }));
        getAccountOrderById();
      } else if (serverResponse?.data?.status === "JWT_INVALID") {
        toast.info(serverResponse?.data?.message);
        router.push("/");
      } else {
        setLoader(false);
        toast.warning(serverResponse?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    getAccountOrderById();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="main_detail_wrapper">
        <div className="payment_view_wrapper" style={{ width: "80%" }}>
          <div className="view_wrapper_header">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <strong>Order Id:{orderData?.orderId} </strong>
              <span className="text-secondary fw-medium"></span>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span
                className="px-2 cursor_pointer"
                title="close"
                onClick={() => {
                  setModalStates((prev) => ({
                    ...prev,
                    viewPayment: false,
                    orderId: "",
                    type: ""
                  }));
                }}
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
                    stroke="#198754"
                    stroke-width="2.5"
                  />
                  <path
                    d="M21.75 14.25L14.25 21.75M14.25 14.25L21.75 21.75"
                    stroke="#198754"
                    stroke-width="2.5"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="view_wrapper_body">
            <div className="d-flex align-items-start justify-content-start gap-5 all_category_vendors_wrapper">
              <div className="fw-medium">
                <storng>Vendor Name</storng>
                <ol className="list-group" type="1">
                  <>
                    <li className="small text-secondary fw-light text-capitalize">
                      {/* <span>1</span> */}
                      {orderData?.vendorId?.companyName ?? "--"}
                    </li>
                  </>
                </ol>
              </div>
              <div className="fw-medium">
                <strong>Email:</strong> {orderData?.vendorId?.email ?? "--"}
                <ol className="list-group" type="1">
                  <>
                    <li className=" small text-secondary fw-light text-capitalize">
                      <span>
                        <strong>Contact:</strong>
                        {orderData?.vendorId?.mobile ?? "--"}
                      </span>
                    </li>
                  </>
                </ol>
              </div>
              <div className="fw-medium">
                <storng>POC Name:</storng>
                {orderData?.vendorId?.pointOfContactName ?? "--"}
                <small>John Doe</small>
                {/* {orderData?.vendorId?.pointOfContactNumber ?? "--"} */}
                <ol className="list-group" type="1">
                  <>
                    <li className="small text-secondary fw-light text-capitalize">
                      {/* <span>1</span> */}
                      <strong>POC Contact:</strong>
                      {orderData?.vendorId?.pointOfContactNumber ?? "--"}
                    </li>
                  </>
                </ol>
              </div>
            </div>
            {/* product data table  */}
            <div className="form_list_layout_wrapper my-3">
              {/* table  */}
              <div className="table_wrapper my-3">
                <div className="table_main">
                  {/* Rename the class name "pi_view_product_table" to your desired class name and specify its width in pixels. Adjust the width according to each column if needed. */}
                  <div className="table_section pi_view_product_table">
                    <div className="table_header">
                      <div className="col_15p">
                        <h5>Sr. No.</h5>
                      </div>
                      <div className="col_20p">
                        <h5>Product Category</h5>
                      </div>

                      <div className="col_20p">
                        <h5>Product Items</h5>
                      </div>

                      <div className="col_15p">
                        <h5>Order Qty</h5>
                      </div>
                      <div className="col_15p">
                        <h5>Unit Rate</h5>
                      </div>
                      <div className="col_15p text-lowercase">
                        <h5>GST</h5>
                      </div>
                      <div className="col_15p">
                        <h5>Received Qty</h5>
                      </div>
                      <div className="col_15p">
                        <h5>Remaining Qty</h5>
                      </div>
                      <div className="col_20p">
                        <h5>Total</h5>
                      </div>
                    </div>
                    {orderData?.productInfo?.map((product, index) => (
                      <div className="table_data" key={index}>
                        <div className="col_15p">
                          <h6>{index + 1}</h6>
                        </div>
                        <div className="col_20p">
                          <h6>{product?.categoryId?.name}</h6>
                        </div>
                        <div className="col_15p">
                          <h6>{product?.productId?.name}</h6>
                        </div>
                        <div className="col_15p text-lowercase">
                          <h6>{product?.quantity}</h6>
                        </div>
                        <div className="col_15p">
                          <h6>{product?.unitId?.shortName} </h6>
                        </div>
                        <div className="col_15p">
                          <h6>{product?.gst}</h6>
                        </div>
                        <div className="col_15p">
                          <h6>{product?.receivedQuantity}</h6>
                        </div>
                        <div className="col_15p text-lowercase">
                          <h6>{product?.remainingQuantity}</h6>
                        </div>
                        <div className="col_15p text-lowercase">
                          <h6>{product?.total}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="table_wrapper my-3">
              <div className="form_list_layout_wrapper my-3">
                <div className="table_main">
                  <div className="row_payment_wrapper">
                    {/* first box */}
                    <div className="inner_payment_wrapper">
                      <div className="inner_text">
                        <p>Deliver Charges</p>
                        <span>
                          {orderData?.quotationId?.deliveryCharges
                            ? `${orderData?.quotationId?.deliveryCharges}.00`
                            : "0.00"}
                        </span>
                      </div>
                    </div>
                    {/* second box */}
                    <div className="inner_payment_wrapper">
                      <div className="inner_text">
                        <p>Discount</p>
                        <span>
                          {orderData?.quotationId?.discount
                            ? `${orderData?.quotationId?.discount}.00`
                            : "0.00"}
                        </span>
                      </div>
                    </div>
                    {/* third box */}
                    <div className="inner_payment_wrapper">
                      <div className="inner_text">
                        <p>Delivery By</p>
                        <span>
                          {orderData?.quotationId?.expectedDeliveryDate
                            ? new Date(
                              orderData?.quotationId?.expectedDeliveryDate
                            )?.toLocaleDateString("hi")
                            : "--"}
                        </span>
                      </div>
                    </div>
                    {/* fourth box */}
                    <div className="inner_payment_wrapper">
                      <div className="inner_text">
                        <p>Total Amount</p>
                        <span>
                          <InputBox
                            disable={true}
                            value={
                              orderData?.quotationId?.finalAmount
                                ? `${orderData?.quotationId?.finalAmount}.00`
                                : "0.00"
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form_list_layout_wrapper my-3">
              <div className="table_wrapper my-3">
                <div className="table_main">
                  <div className="row_payment_wrapper">
                    <div className="inner_payment_wrapper">
                      <div className="inner_second_payment_wrapper">
                        <p> Remaining Amount:</p>{" "}
                        <InputBox
                          value={
                            orderData?.remainingAmount
                              ? `${orderData?.remainingAmount}.00`
                              : "0.00"
                          }
                          disable={true}
                        />
                      </div>
                    </div>
                    <div className="inner_second_pay_wrapper">
                      <div className="inner_text_pay">
                        <p className=""> Pay </p>
                        <InputBox
                          register={{
                            ...register("paidAmount", {
                              required: "Amount is required",
                              valueAsNumber: true,
                            }),
                          }}
                          type={"number"}
                          disable={
                            Number(orderData?.remainingAmount) === 0
                              ? true
                              : false
                          }
                          errors={errors?.paidAmount}
                        />
                      </div>

                      <div className="py-2 d-flex align-items-center justify-content-start gap-4">
                        <div>
                          <input
                            type="radio"
                            id="cash-check"
                            value={"cash"}
                            checked={modeData?.paymentMode === "cash"}
                            onChange={(e) => {
                              setModeData(() => ({
                                ...modeData,
                                paymentMode: e.target.value,
                                validation:
                                  e.target.value !== "" ? false : true,
                              }));
                            }}
                            className="form-check-input"
                            name="paymentMode"
                          />
                          <label htmlFor="cash-check" className="mx-2">
                            Cash
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="online-check"
                            value={"online"}
                            checked={modeData?.paymentMode === "online"}
                            onChange={(e) => {
                              setModeData(() => ({
                                ...modeData,
                                paymentMode: e.target.value,
                                validation:
                                  e.target.value !== "" ? false : true,
                              }));
                            }}
                            className="form-check-input"
                            name="paymentMode"
                          />
                          <label htmlFor="online-check" className="mx-2">
                            Online
                          </label>
                        </div>
                      </div>
                      {modeData?.validation && (
                        <p className="validation_message">
                          Payment mode is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form_list_layout_wrapper my-3">
              <div className="payment_history">
                <p>Payment History</p>
                <p>
                  <strong>Remark: </strong>
                  {![undefined, null, ""]?.includes(
                    paymentHistory[paymentHistory?.length - 1]?.remark
                  )
                    ? paymentHistory[paymentHistory?.length - 1]?.remark
                    : "--"}
                </p>
              </div>
              <div className="table_wrapper my-3">
                <div className="table_main">
                  <div className="table_section align-items-center">
                    <div className="table_header">
                      <div className="col_20p"></div>
                      <div className="col_20p">
                        <h5>Date</h5>
                      </div>
                      <div className="col_20p">
                        <h5>Time</h5>
                      </div>
                      <div className="col_20p">
                        <h5>Paid</h5>
                      </div>
                      <div className="col_20p">
                        <h5>Paid Mode</h5>
                      </div>
                      <div className="col_20p"></div>
                    </div>
                    {paymentHistory?.map((item, index) => (
                      <div className="table_data" key={index}>
                        <div className="col_20p"></div>
                        <div className="col_20p">
                          <h6>
                            {item?.createdAt
                              ? new Date(item?.createdAt)?.toLocaleDateString(
                                "hi"
                              )
                              : "--"}
                          </h6>
                        </div>
                        <div className="col_20p">
                          <h6>
                            {item?.createdAt
                              ? new Date(item?.createdAt)?.toLocaleTimeString()
                              : "--"}
                          </h6>
                        </div>
                        <div className="col_20p">
                          <h6>
                            {item?.paidAmount
                              ? `${item?.paidAmount}.00`
                              : "0.00"}
                          </h6>
                        </div>
                        <div className="col_20p">
                          <h6>{item?.paymentMode}</h6>
                        </div>
                        <div className="col_20p"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p>
                <div className="" style={{ width: "50%" }}>
                  <label>Remark</label>
                  <CustomTextArea register={{ ...register("remark") }} />
                </div>
              </p>
            </div>
          </div>
          {
            modalState?.type == "view" &&
            <>
              {
                orderData?.isPaid ? <></>
                  :
                  <div className="btn_wrapper d-flex justify-content-center gap-3">
                    <div className="my-3">
                      <CustomBtn
                        name="Pay Now"
                        className="btn btn-primary"
                        onClick={handleSubmit(onSubmit)}
                      />
                    </div>
                  </div>
              }
            </>
          }
        </div>
      </div>
    </>
  );
};

export default ViewPayment;
