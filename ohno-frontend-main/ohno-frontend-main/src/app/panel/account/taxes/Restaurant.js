"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "@/common-components/Loader";
import Button from "@/common-components/Button";
import Search from "@/common-components/Search";
import Pagination from "@/common-components/Pagination";
import CustomBtn from "@/common-components/CustomBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { communication } from "@/services/communication";
import currencyFormatter from "@/helper/currencyFormatter";

const RestaurantTaxList = ({ data }) => {
  const { searchString, setTaxData, startDate, endDate } = data;
  const [loader, setLoader] = useState(false);
  const [restaurantTaxList, setRestaurantTaxList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [isPageUpdated, setIsPageUpdated] = useState(false);
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState([]);
  const [taxesStatus, setTaxesStatus] = useState([]);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  };


  const handleMarkAsPaid = () => {
    setTaxesStatus((prevStatus) =>
      prevStatus?.map((item) =>
        checkedItems.includes(item.saleIds._id)
          ? { ...item, status: "PAID" }
          : item
      )
    );
    setCheckedItems([]);
  };

  const getRestaurantStatusById = async (saleIds) => {
    try {
      const serverResponse = await communication.fetchRestaurantStatusById(
        saleIds);
      if (serverResponse?.data?.status === "SUCCESS") {
        setTaxesStatus(serverResponse?.data);
      } else if (serverResponse?.data?.status === "JWT_INVALID") {
        router.push("/");
      } else {
        setTaxesStatus({});
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRestaurantStatusById(checkedItems);
      setTaxesStatus(response);
    };
    fetchData();
  }, []);


  const fetchRestaurantTaxList = async (searchString, controller, startDate, endDate) => {
    try {
      setLoader(true);
      const serverResponse = await communication.getRestaurantTaxList(
        searchString,
        controller,
        startDate,
        endDate
      );
      if (serverResponse?.data?.status === "SUCCESS") {
        setRestaurantTaxList(serverResponse?.data?.restaurant);
        setTaxData((prev) => ({
          ...prev,
          payTax: serverResponse?.data?.paidTax,
          payableTax: serverResponse?.data?.payableTax,
        }));
        setLoader(false);
      } else if (serverResponse?.data?.status === "JWT_INVALID") {
        toast.info(serverResponse?.data?.message);
        router.push("/");
        setLoader(false);
      } else {
        setRestaurantTaxList([]);
        setTaxData((prev) => ({
          ...prev,
          payTax: "",
          payableTax: "",
        }));
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
    const controller = new AbortController();
    let searchTimer;

    if (searchString) {
      searchTimer = setTimeout(() => {
        fetchRestaurantTaxList(searchString, controller, startDate, endDate);
      }, 1000);
    } else {
      fetchRestaurantTaxList(searchString, controller, startDate, endDate);
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
          <div className="table_section approve_quotation_table table_tax_list">
            <div className="table_header mb-0">
              <div className="col_10p">
              </div>
              <div className="col_20p">
                <h5>Sr. No.</h5>
              </div>

              <div className="col_20p">
                <h5>Day</h5>
              </div>

              <div className="col_20p">
                <h5>Net Amount</h5>
              </div>

              <div className="col_20p">
                <h5>Total Sale</h5>
              </div>
              <div className="col_20p">
                <h5>Total Tax</h5>
              </div>
              <div className="col_20p">
                <h5>Status</h5>
              </div>
            </div>
            {restaurantTaxList?.length > 0 ? (
              restaurantTaxList?.map((data, index) => {
                return (
                  <>
                    <div key={index} className="table_data mb-0 p-2">
                      <div className="col_10p">
                        <h6>
                          {data.status === "new" && (
                            <input
                              type="checkbox"
                              className="form-check-input m-0"
                              value={data?.saleIds?._id}
                              id={data?.saleIds?._id}
                              onChange={() => handleCheckboxChange(data.saleIds._id)}
                              checked={checkedItems.includes(data?.saleIds?._id)}
                            />
                          )}
                        </h6>
                      </div>
                      <div className="col_20p">
                        <h6>{index + 1}</h6>
                      </div>

                      <div className="col_20p">
                        <h6>{data?.createdAt
                          ? new Date(data?.createdAt).toLocaleDateString("hi")
                          : "--"}</h6>
                      </div>
                      <div className="col_20p">
                        <h6>{currencyFormatter(data?.netAmount) ?? "--"}</h6>
                      </div>
                      <div className="col_20p">
                        <h6>{currencyFormatter(data?.totalSale) ?? "--"}</h6>
                      </div>
                      <div className="col_20p">
                        <h6>{currencyFormatter(data?.totalTax) ?? "--"}</h6>
                      </div>
                      <div className="col_20p">
                        <h6>{data?.status ?? "--"}</h6>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p className="  no_data">
                Data Not Available
              </p>
            )}
          </div>
        </div>
      </div>
      {checkedItems.length > 0 && (
        <div className="available_stock_button_wrapper">
          <Button onClick={handleMarkAsPaid} name="Mark As Paid" />
        </div>
      )}
    </>
  );
};

export default RestaurantTaxList;
