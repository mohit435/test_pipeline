"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomBtn from "@/common-components/CustomBtn";
import Search from "@/common-components/Search";
import CustomDateInput from "@/common-components/CustomDateInput";
import Employee from "./Employee";
import Vendor from "./Vendor";
import Restaurant from "./Restaurant";
import Pagination from "@/common-components/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
  const pageLimit = process.env.NEXT_PUBLIC_LIMIT;
  const [searchString, setSearchString] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [activeTab, setActiveTab] = useState("employee");
  const [taxData, setTaxData] = useState({
    payTax: 0,
    payableTax: 0, 
  });
  // pagination states
  const [isPageUpdated, setIsPageUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div>
      {/* top header  */}
      <div className="top_header">
        <div className="tab_title">Tax Payment</div>
      </div>
      {/* search bar */}
      <div className="search_btn_wrapper justify-content-start">
        <Search
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          placeholder={"Search"}
        />
        <div className="buttons_wrapper" style={{ zIndex: 2 }}>
          <div className="input_wrapper">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="custom_input form-control"
              placeholderText="Start Date"
              isClearable
              dateFormat="d MMMM, yyyy"
              maxDate={new Date()}
            />
          </div>
          <div className="input_wrapper">
            <DatePicker
             selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="custom_input form-control"
              placeholderText="End Date"
              isClearable
              dateFormat="d MMMM, yyyy"
              minDate={startDate}
            />
          </div>
        </div>
      </div>
      <div className="search_btn_wrapper">
        {/* tab wrapper */}
        <div className="my-3 d-flex justify-content-start align-items-start gap-3">
          <div
            className="tab_btn"
            onClick={() => {
              setActiveTab("employee");
              setTaxData((prev) => ({ ...prev, payTax: 0, payableTax: 0 }));
            }}
            style={{
              backgroundColor: activeTab == "employee" ? "#198754" : "#D0D3D9",
            }}
          >
            Employee
          </div>
          <div
            className="tab_btn"
            onClick={() => {
              setActiveTab("vendor");
              setTaxData((prev) => ({ ...prev, payTax: 0, payableTax: 0 }));
            }}
            style={{
              backgroundColor: activeTab == "vendor" ? "#198754" : "#D0D3D9",
            }}
          >
            Vendor
          </div>
          <div
            className="tab_btn"
            onClick={() => {
              setActiveTab("restaurant");
              setTaxData((prev) => ({ ...prev, payTax: 0, payableTax: 0 }));
            }}
            style={{
              backgroundColor:
                activeTab == "restaurant" ? "#198754" : "#D0D3D9",
            }}
          >
            Restaurant
          </div>
        </div>
        <div className="expired_head_wrapper">
          <div className="expired_total_items_main">
            <h6>Paid Tax : {taxData?.payTax}</h6>
          </div>
          <div className="expired_total_amount_main">
            <h6>Payable Tax : {taxData?.payableTax}</h6>
          </div>
        </div>
      </div>

      {/* employee table*/}
      {activeTab === "employee" && (
        <>
          <Employee data={{searchString, setTaxData }} />
        </>
      )}
      {/* Vendor table  */}
      {activeTab === "vendor" && (
        <>
          <Vendor data={{ searchString, setTaxData }} />
        </>
      )}
      {/* Restaurant table  */}
      {activeTab === "restaurant" && (
        <>
          <Restaurant
            data={{searchString, setTaxData }}
          />
        </>
      )}

      <div className="pagination_wrapper">
        <Pagination
          isPageUpdated={isPageUpdated}
          setIsPageUpdated={setIsPageUpdated}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default Page;
