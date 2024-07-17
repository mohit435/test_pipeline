"use client";

import { communication } from "@/services/communication";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ApprovalDetail = ({
    data,
    settoggleApprovalView,
    setIsApproved,
}) => {
    const router = useRouter();
    const ApprovalData = [
        {
            id: 1,
            key: "Vendor Name",
            value: data?.companyName ?? "--",
        },
        {
            id: 2,
            key: "Category",
            value: data?.productCategories?.map((data, index) =>
                index === data?.productCategories?.length - 1
                    ? data?.name
                    : data?.name + ", "
            ),
        },
        {
            id: 3,
            key: "Product",
            value: data?.productItems?.map((data, index) =>
                index === data?.productItems?.length - 1
                    ? data?.name
                    : data?.name + ", "
            ),
        },
        {
            id: 4,
            key: "Email Address",
            value: data?.email ?? "--",
        },
        {
            id: 5,
            key: "Point of Contact",
            value: data?.pointOfContactNumber ?? "--",
        },
        {
            id: 6,
            key: "GST Number",
            value: data?.gstNumber ?? "--",
        },
        {
            id: 7,
            key: "State",
            value: data?.state ?? "--",
        },
        {
            id: 8,
            key: "City",
            value: data?.city ?? "--",
        },
        {
            id: 9,
            key: "Address",
            value: data?.address ?? "--",
        },
    ];

    // approve Vendor by id
    const approveVendor = async (id) => {
        try {
            const serverResponse = await communication.approveVendorCreation(id);
            if (serverResponse?.data?.status === "SUCCESS") {
                toast.success(serverResponse?.data?.message);
                settoggleApprovalView(false);
                setIsApproved((prev) => !prev);
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
                    <p>Vendor Detail</p>
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
                                approveVendor(data?._id);
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

export default ApprovalDetail;
