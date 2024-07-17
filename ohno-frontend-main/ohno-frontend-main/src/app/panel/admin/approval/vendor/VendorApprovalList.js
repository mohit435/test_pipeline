'use client'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { communication } from '@/services/communication';
import { toast } from 'react-toastify';
import Loader from '@/common-components/Loader';
import getDateDescription from '@/helper/getDateDescription';
import getTimeFromDate from '@/helper/getTimeFromDate';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ApprovalDetail from './ApprovalDetail';
gsap.registerPlugin(useGSAP);

const VendorApprovalList = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [approvalList, setApprovalList] = useState([]);
    const [vendorDetail, setVendorDetail] = useState({});
    const [isApproved, setIsApproved] = useState(false);
    const [toggleApprovalView, settoggleApprovalView] = useState(false);

    // get all vendor approval list on initial load
    const getVendorApprovalList = async (controller) => {
        try {
            setLoader(true);
            const serverResponse = await communication.vendorApprovalList(controller);
            if (serverResponse?.data?.status === "SUCCESS") {
                setApprovalList(serverResponse?.data?.vendorList);
                setLoader(false);
            } else if (serverResponse?.data?.status === "JWT_INVALID") {
                router.push("/");
                toast.info(serverResponse?.data?.message)
                setLoader(false);
            } else {
                setApprovalList([]);
                setLoader(false);
            }
        } catch (error) {
            if (error.name === "CanceledError") {
                // Api cancelled
            } else {
                setLoader(false);
                toast.error(error?.message);
            }
        }
    };
    // get vendor approval detail by id
    const getVendorApproval = async (id) => {
        try {
            const serverResponse = await communication.vendorApprovalById(id);
            if (serverResponse?.data?.status === "SUCCESS") {
                setVendorDetail(serverResponse?.data?.result);
            } else if (serverResponse?.data?.status === "JWT_INVALID") {
                router.push("/");
                toast.info(serverResponse?.data?.message)
            } else {
                setVendorDetail({});
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };
    useGSAP(() => {
        gsap.fromTo(".card-animation",
            {
                opacity: 0,
                y: -20,
                ease: "back",
                duration: 0.2,
                yoyo: true,
                stagger: 0.1
            },
            {
                opacity: 1,
                y: 0,
                ease: "back",
                yoyo: true,
                stagger: 0.1
            },
        );
    }, [approvalList]);

    useEffect(() => {
        const controller = new AbortController();
        getVendorApprovalList(controller);
        return () => {
            controller.abort();
        };
    }, [isApproved]);

    return (
        <>
            {
                loader && <Loader />
            }
            {
                toggleApprovalView &&
                <ApprovalDetail data={vendorDetail} settoggleApprovalView={settoggleApprovalView} setIsApproved={setIsApproved} />
            }
            {/* promotion list  */}
            <div className="tab_content">
                <div className="row">
                    {approvalList?.length > 0 ?
                        <>
                            {
                                approvalList?.map((data, index) => {
                                    return (
                                        <div className="col-12 col-lg-6 mb-4 card-animation" key={index}>
                                            <div className="approval_box">
                                                <div className="approval_card">
                                                    <div className="approval_time">
                                                        <div className="time_card d-flex align-items-center justify-content-center">
                                                            <div className="">
                                                                <p className=''>{getDateDescription(data?.createdAt)}</p>
                                                                <h6 className=''>{getTimeFromDate(data?.createdAt)}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="approval_content">
                                                        <h4>{data?.title}</h4>
                                                        <p className='small'>{data?.description}</p>
                                                    </div>
                                                    <div className="approval_action">
                                                        <div title="view" onClick={() => {
                                                            settoggleApprovalView(true),
                                                                getVendorApproval(data?._id)
                                                        }}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 5.25C9.22586 5.25 6.79699 6.91121 5.12801 8.44832C4.28012 9.22922 3.59626 10.0078 3.12442 10.5906C2.88804 10.8825 2.70368 11.1268 2.57736 11.2997C2.51417 11.3862 2.46542 11.4549 2.43187 11.5029C2.41509 11.5269 2.4021 11.5457 2.393 11.559L2.38227 11.5747L2.37911 11.5794L2.10547 12.0132L2.37809 12.4191L2.37911 12.4206L2.38227 12.4253L2.393 12.441C2.4021 12.4543 2.41509 12.4731 2.43187 12.4971C2.46542 12.5451 2.51417 12.6138 2.57736 12.7003C2.70368 12.8732 2.88804 13.1175 3.12442 13.4094C3.59626 13.9922 4.28012 14.7708 5.12801 15.5517C6.79699 17.0888 9.22586 18.75 12.0001 18.75C14.7743 18.75 17.2031 17.0888 18.8721 15.5517C19.72 14.7708 20.4039 13.9922 20.8757 13.4094C21.1121 13.1175 21.2964 12.8732 21.4228 12.7003C21.4859 12.6138 21.5347 12.5451 21.5682 12.4971C21.585 12.4731 21.598 12.4543 21.6071 12.441L21.6178 12.4253L21.621 12.4206L21.6224 12.4186L21.9035 12L21.622 11.5809L21.621 11.5794L21.6178 11.5747L21.6071 11.559C21.598 11.5457 21.585 11.5269 21.5682 11.5029C21.5347 11.4549 21.4859 11.3862 21.4228 11.2997C21.2964 11.1268 21.1121 10.8825 20.8757 10.5906C20.4039 10.0078 19.72 9.22922 18.8721 8.44832C17.2031 6.91121 14.7743 5.25 12.0001 5.25ZM4.29022 12.4656C4.14684 12.2885 4.02478 12.1311 3.92575 12C4.02478 11.8689 4.14684 11.7115 4.29022 11.5344C4.72924 10.9922 5.36339 10.2708 6.14419 9.55168C7.73256 8.08879 9.80369 6.75 12.0001 6.75C14.1964 6.75 16.2676 8.08879 17.8559 9.55168C18.6367 10.2708 19.2709 10.9922 19.7099 11.5344C19.8533 11.7115 19.9753 11.8689 20.0744 12C19.9753 12.1311 19.8533 12.2885 19.7099 12.4656C19.2709 13.0078 18.6367 13.7292 17.8559 14.4483C16.2676 15.9112 14.1964 17.25 12.0001 17.25C9.80369 17.25 7.73256 15.9112 6.14419 14.4483C5.36339 13.7292 4.72924 13.0078 4.29022 12.4656ZM14.25 12C14.25 13.2426 13.2427 14.25 12 14.25C10.7574 14.25 9.75005 13.2426 9.75005 12C9.75005 10.7574 10.7574 9.75 12 9.75C13.2427 9.75 14.25 10.7574 14.25 12ZM15.75 12C15.75 14.0711 14.0711 15.75 12 15.75C9.92898 15.75 8.25005 14.0711 8.25005 12C8.25005 9.92893 9.92898 8.25 12 8.25C14.0711 8.25 15.75 9.92893 15.75 12Z" fill="#198754" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </>
                        :
                        <div className="no_data">
                            <h6>Approvals not available</h6>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default VendorApprovalList