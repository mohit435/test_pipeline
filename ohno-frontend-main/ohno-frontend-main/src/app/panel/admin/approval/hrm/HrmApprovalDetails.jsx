"use client";

import currencyFormatter from "@/helper/currencyFormatter";
import { formatDate } from "@/helper/formatDate";
import { communication } from "@/services/communication";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const HrmApprovalDetail = ({
  data,
  settoggleApprovalView,
  setIsPromotionApproved,
}) => {
  const router = useRouter();
  const ApprovalData = [
    {
      id: 1,
      key: "Employee ID",
      value: data?.employeeId?.empId ?? "--",
    },
    {
      id: 2,
      key: "Name",
      value: data?.employeeId?.fullName ?? "--",
    },
    {
      id: 3,
      key: "Department",
      value: data?.employeeId?.department ?? "--",
    },
    {
      id: 4,
      key: "Designation",
      value: data?.employeeId?.designation ?? "--",
    },
    {
      id: 5,
      key: "Promoted To",
      value: data?.promotedToDesignation ?? "--",
    },
    {
      id: 6,
      key: "Salary",
      value: currencyFormatter(Number(data?.employeeId?.salary)) ?? "--",
    },
    {
      id: 7,
      key: "Promoted Salary",
      value: currencyFormatter(Number(data?.promotionSalary)) ?? "--",
    },
    {
      id: 8,
      key: "Shift",
      value: data?.employeeId?.shiftType ?? "--",
    },
    {
      id: 9,
      key: "Joining Date",
      value: formatDate(data?.employeeId?.joiningDate) ?? "--",
    },
  ];

  // approve promotion by id
  const approvePromotion = async (id) => {
    try {
      const serverResponse = await communication.approvePromotionById(id);
      if (serverResponse?.data?.status === "SUCCESS") {
        toast.success(serverResponse?.data?.message);
        settoggleApprovalView(false);
        setIsPromotionApproved((prev) => !prev);
      } else if (serverResponse?.data?.status === "JWT_INVALID") {
        router.push("/");
        toast.info(serverResponse?.data?.message);
      } else {
        toast.info(serverResponse?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="main_detail_wrapper">
      <div className="detail_box rounded">
        <div className="detail_box_header">
          <p>Promotion</p>
          <div
            className=""
            onClick={() => {
              settoggleApprovalView(false);
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
                stroke="#198754"
                strokeWidth="2.5"
              />
              <path
                d="M21.75 14.25L14.25 21.75M14.25 14.25L21.75 21.75"
                stroke="#198754"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="detail_box_data">
          {ApprovalData?.map((data, index) => {
            return (
              <div
                key={index}
                className="detail_data"
                style={{ background: index % 2 === 0 ? "#F1F5F9" : "#fff" }}
              >
                <div className="w-50">
                  <p>{data?.key}</p>
                </div>
                <div className="w-50">
                  <strong>{data?.value}</strong>
                </div>
              </div>
            );
          })}
          <div className="py-4 d-flex align-items-center justify-content-center">
            <button
              className="btn btn-success"
              onClick={() => {
                approvePromotion(data?._id);
              }}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrmApprovalDetail;
