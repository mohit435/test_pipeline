"use client";
import InputBox from "@/common-components/InputBox";
const UpdatePayment = ({ data, setModalStates }) => {
  return (
    <>
      <div className="main_detail_wrapper">
        <div className="payment_view_wrapper">
          <div className="view_wrapper_header">
            <div className="d-flex align-items-center justify-content-center gap-2">
         
              <strong>Order Id: </strong>
              <span className="text-secondary fw-medium">
                {/* #{data?.indentId} */}
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span
                className="px-2 cursor_pointer"
                title="close"
                onClick={() => {
                  setModalStates((prev) => ({ ...prev, viewPayment: false }));
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
                      Richard Martin
                    </li>
                  </>
                </ol>
              </div>
              <div className="fw-medium">
                <strong>Email:</strong> richard.martin@gmail.com
                <ol className="list-group" type="1">
                  <>
                    <li className=" small text-secondary fw-light text-capitalize">
                      <span>
                        <strong>Contact:</strong>9876543210{" "}
                      </span>
                    </li>
                  </>
                </ol>
              </div>
              <div className="fw-medium">
                <storng>POC Name:</storng>
                <small>John Doe</small>
                <ol className="list-group" type="1">
                  <>
                    <li className="small text-secondary fw-light text-capitalize">
                      {/* <span>1</span> */}
                      <strong>POC Contact:</strong> 9876543210
                    </li>
                  </>
                </ol>
              </div>
            </div>
            {/* product data table  */}
            <div className="form_list_layout_wrapper my-3">
              {/* <div className="d-flex align-items-center justify-content-between">
                <p>Product List</p>
                {data?.unlimitedQty && (
                  <small>
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 7 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="3.5" cy="3.5" r="3.5" fill="#198754" />
                    </svg>
                    <span className="px-1"> Unlimited Qty.</span>
                  </small>
                )}
              </div> */}
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
                    {/* {data?.productInfo?.map((product, index) => {
                      return ( */}
                    <div className="table_data">
                      <div className="col_15p">
                        {/* <h6>{index + 1}</h6> */}
                        <h6>1</h6>
                      </div>
                      <div className="col_20p">
                        {/* <h6>{product?.categoryId?.name}</h6> */}
                        <h6>Grocery</h6>
                      </div>
                      <div className="col_15p">
                        {/* <h6>{product?.productId?.name}</h6> */}
                        <h6>Maggie</h6>
                      </div>
                      <div className="col_15p text-lowercase">
                        {/* <h6>{product?.unitId?.shortName}</h6> */}
                        <h6>4 Pkt</h6>
                      </div>
                      <div className="col_15p">
                        {/*
                            <h6 className="action_wrraper">
                               {product?.quantity} 
                            </h6>
                              */}
                        <h6>12 p/c</h6>
                      </div>
                      <div className="col_15p">
                        {/* <h6>{product?.unitId?.shortName}</h6> */}
                        <h6>3%</h6>
                      </div>
                      <div className="col_15p">
                        {/* <h6>{product?.unitId?.shortName}</h6> */}
                        <h6>4 Pkt</h6>
                      </div>
                      <div className="col_15p text-lowercase">
                        {/* <h6>{product?.unitId?.shortName}</h6> */}
                        <h6>1 Pkt</h6>
                      </div>
                      <div className="col_15p text-lowercase">
                        {/* <h6>{product?.unitId?.shortName}</h6> */}
                        <h6>64.00</h6>
                      </div>
                    </div>
                    {/* );
                    })} */}
                  </div>
                </div>
              </div>
              {/* <div className="">
                <small className="fw-medium text-secondary">
                  Note: &nbsp;
                  <span className="fw-light">{data?.note}</span>
                </small>
              </div> */}
            </div>

            <div className="form_list_layout_wrapper my-3">
              <div className="table_wrapper my-3">
                <div className="table_main">
                  <div className="row_payment_wrapper">
                    {/* first box */}
                    <div className="inner_payment_wrapper">
                      <div className="inner_text">
                        <p>Deliver Charges</p>
                        <span>400/-</span>
                      </div>
                    </div>
                    {/* second box */}
                    <div className="inner_payment_wrapper">
                      <div className="inner_text">
                        <p>Discount</p>
                        <span>10%</span>
                      </div>
                    </div>
                    {/* third box */}
                    <div className="inner_payment_wrapper">
                      <div className="inner_text">
                        <p>Delivery By</p>
                        <span>10/02/2024</span>
                      </div>
                    </div>
                    {/* fourth box */}
                    <div className="inner_payment_wrapper">
                      <div className="inner_text">
                        <p>Total Amount</p>
                        <span>
                          <InputBox
                            register={{}}
                            type={""}
                            placeholder={""}
                            disable={true}
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
                          register={{}}
                          type={""}
                          placeholder={""}
                          disable={true}
                        />
                      </div>
                    </div>
                    <div className="inner_second_pay_wrapper">
                      <div className="inner_text_pay">
                        <p className=""> Pay </p>
                        <InputBox
                          register={{}}
                          type={""}
                          placeholder={""}
                          disable={true}
                        />
                      </div>

                      <div className="py-2 d-flex align-items-center justify-content-start gap-4">
                        <div>
                          <input
                            type="radio"
                            id="cash-check"
                            value={""}
                            checked={"cash"}
                            onChange={() => {
                              ("");
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
                            checked={"online"}
                            onChange={() => {
                              ("");
                            }}
                            className="form-check-input"
                            name="paymentMode"
                          />
                          <label htmlFor="online-check" className="mx-2">
                            Online
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form_list_layout_wrapper my-3">
              <div className="payment_history">
                <p>Payment History</p>
                <p>
                  <strong>Remark: </strong>Lorem ipsum
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
                    <div className="table_data">
                      <div className="col_20p"></div>
                      <div className="col_20p">
                        <h6>10/02/2024</h6>
                      </div>
                      <div className="col_20p">
                        <h6>12:30</h6>
                      </div>
                      <div className="col_20p">
                        <h6>12000/-</h6>
                      </div>
                      <div className="col_20p">
                        <h6>Cash</h6>
                      </div>
                      <div className="col_20p"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p><strong>Remark:</strong> Lorem ipsum</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePayment;
