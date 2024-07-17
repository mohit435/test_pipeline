"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "@/common-components/Loader";
import Button from "@/common-components/Button";
import { communication } from "@/services/communication";

const Vendor = ({ data }) => {
  const { searchString, setTaxData, startDate, endDate } = data;
  const [loader, setLoader] = useState(false);
  const [vendorTaxList, setVendorTaxList] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const router = useRouter();
  // pagination states
  const [isPageUpdated, setIsPageUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const fetchVendorTaxList = async (searchString, controller, startDate, endDate) => {
    try {
      setLoader(true);
      const serverResponse = await communication.getVendorTaxList(
        searchString,
        controller, startDate, endDate
      );
      if (serverResponse?.data?.status === "SUCCESS") {
        setVendorTaxList(serverResponse?.data?.vendorTax);
        setTaxData((prev) => ({
          ...prev,
          payTax: serverResponse?.data?.paidTaxAmount,
          payableTax: serverResponse?.data?.unPaidTaxAmount,
        }));
        setLoader(false);
      } else if (serverResponse?.data?.status === "JWT_INVALID") {
        toast.info(serverResponse?.data?.message);
        router.push("/");
        setLoader(false);
      } else {
        setVendorTaxList([]);
        setTaxData((prev) => ({ ...prev, payTax: 0, payableTax: 0 }));
        setLoader(false);
      }
    } catch (error) {
      if (error.name === "CanceledError") {
        // Api cancelled
      } else {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    let searchTimer;
    const controller = new AbortController();
    if (searchString) {
      searchTimer = setTimeout(() => {
        fetchVendorTaxList(searchString, controller, startDate, endDate);
      }, 1000);
    } else {
      fetchVendorTaxList(searchString, controller, startDate, endDate);
    }
    return () => {
      clearTimeout(searchTimer);
      controller.abort();
    };
  }, [searchString, currentPage, isPageUpdated, startDate, endDate]);

  return (
    <>
      {loader && <Loader text={"Fetching Data..."} />}
      <div className="table_wrapper">
        <div className="table_main">
          {/* Rename the class name "approve_quotation_table" to your desired class name and specify its width in pixels. Adjust the width according to each column if needed. */}
          <div className="table_section approve_quotation_table table_tax_list">
            <div className="table_header mb-0">
              <div className="col_20p">
                <h5>Sr. No.</h5>
              </div>

              <div className="col_20p">
                <h5>Month</h5>
              </div>

              <div className="col_20p">
                <h5>Tax Amount (SGST) </h5>
              </div>

              <div className="col_20p">
                <h5>Per(%)</h5>
              </div>
              {/* <div className="col_20p">
                                <h5>Total Tax</h5>
                            </div> */}
              <div className="col_20p">
                <h5>Status</h5>
              </div>
            </div>
            {vendorTaxList?.length > 0 ?
              vendorTaxList?.map((data, index) => {
                return (
                  <>
                    <div className="table_data" key={index}>
                      <div className="col_20p">
                        <h6>{index + 1}</h6>
                      </div>
                      <div className="col_20p">
                        <h6>{data?.month}</h6>
                      </div>
                      <div className="col_20p">
                        <h6>{data?.taxAmountSGST}</h6>
                      </div>
                      <div className="col_20p">
                        <h6>{data?.sgstPercent}</h6>
                      </div>
                      {/* <div className="col_20p">
                  <h6>{data?.totalTax}</h6>
                </div> */}
                      <div className="col_20p">
                        <h6>{data?.status}</h6>
                      </div>
                    </div>
                  </>
                );
              }) : (
                <p className="no_data">
                  Data Not Available
                </p>
              )}
          </div>
        </div>
      </div>
      {isCheckboxChecked && (
        <div className="available_stock_button_wrapper">
          <Button
            onClick={() => {
              ("");
            }}
            name="Mark As Paid"
          />
        </div>
      )}
    </>
  );
};

export default Vendor;
