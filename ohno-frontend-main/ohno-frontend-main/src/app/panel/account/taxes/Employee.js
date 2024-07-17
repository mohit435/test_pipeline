"use client";
import React, { useState, useEffect } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import currencyFormatter from "@/helper/currencyFormatter";
import { formatDate } from "@/helper/formatDate";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Loader from "@/common-components/Loader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { communication } from "@/services/communication";

const Employee = ({ data}) => {
  const { searchString, setTaxData, startDate, endDate} = data;
  const pageLimit = process.env.NEXT_PUBLIC_LIMIT;
  //   const { setModalStates, employeeData, page } = data;
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [employeeTaxes, setEmployeeTaxes] = useState([]);
  const [loader, setLoader] = useState(false);
  // pagination states
  const [isPageUpdated, setIsPageUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const fetchEmployeeTaxList = async (searchString, controller,startDate, endDate) => {
    try {
      setLoader(true);
      const serverResponse = await communication.geEmployeeTaxList(
        searchString,
        controller,
        startDate,
        endDate
      );
      if (serverResponse?.data?.status === "SUCCESS") {
        setEmployeeTaxes(serverResponse?.data?.employeeTax);
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
        setEmployeeTaxes([]);
        setTaxData((prev) => ({
            ...prev,
            payTax: serverResponse?.data?.paidTaxAmount,
            payableTax: serverResponse?.data?.unPaidTaxAmount,
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
        fetchEmployeeTaxList(searchString, controller,startDate, endDate);
      }, 1000);
    } else {
      fetchEmployeeTaxList(searchString, controller,startDate, endDate);
    }

    return () => {
      clearTimeout(searchTimer);
      controller.abort();
    };
  }, [searchString, currentPage, isPageUpdated,startDate, endDate]);

  return (
    <>
      {loader && <Loader text={"Fetching Data..."} />}
      <div className="table_wrapper">
        <div className="table_main" id="stock-table-anim">
          {/* Rename the class name "store_item_table" to your desired class name and specify its width in pixels. Adjust the width according to each column if needed. */}
          <div className="table_section store_item_table table_tax_list">
            <div className="table_header tax_list_header">
              <div className="col_10p">
                <h5>Sr. No.</h5>
              </div>

              <div className="col_15p">
                <h5>Month</h5>
              </div>

              <div className="col_25p">
                <h5>Net Monthly Cash Payable</h5>
              </div>

              <div className="col_25p">
                <h5>Net Monthly Bank Account Payable </h5>
              </div>

              <div className="col_25p">
                <h5>Monthly PF Employee Contributions</h5>
              </div>

              <div className="col_25p">
                <h5>Monthly PT Payable</h5>
              </div>
              <div className="col_25p">
                <h5>Monthly ESIC Employee Contributions Payable</h5>
              </div>

              <div className="col_25p">
                <h5>Monthly TDS Payable</h5>
              </div>

              <div className="col_25p">
                <h5>Monthly ESIC Employer Contributions Payable</h5>
              </div>

              <div className="col_25p">
                <h5>Monthly PF Employer Contributions</h5>
              </div>
            </div>
            {employeeTaxes?.length > 0 ? (
              employeeTaxes?.map((data, index) => {
                return (
                  <>
                    <div key={index} className="table_data mb-0 p-2">
                      <div className="col_10p">
                        <h6>{index + 1}</h6>
                      </div>

                      <div className="col_15p">
                        <h6>{data?.month || data?.year}</h6>
                      </div>

                      <div className="col_25p">
                        <h6>{data?.netMonthlyCashPayable}</h6>
                      </div>

                      <div className="col_25p">
                        <h6>{data?.netMonthlyBankAccountPayable}</h6>
                      </div>

                      <div className="col_25p">
                        <h6>{data?.monthlyPFEmployeeContributionPayable}</h6>
                      </div>

                      <div className="col_25p">
                        <h6>{data?.monthlyPTPayable}</h6>
                      </div>

                      <div className="col_25p">
                        <h6>{data?.monthlyESICEmployeeContributionPayable}</h6>
                      </div>

                      <div className="col_25p">
                        <h6>{data?.monthlyTDSPayable}%</h6>
                      </div>

                      <div className="col_25p">
                        <h6>{data?.monthlyPFEmployerContributionPayable}</h6>
                      </div>
                      <div className="col_25p">
                        <h6>{data?.monthlyESICEmployerContributionPayable}</h6>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p className="no_data">
                Data Not Available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
