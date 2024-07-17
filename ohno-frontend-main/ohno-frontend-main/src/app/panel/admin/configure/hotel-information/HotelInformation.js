'use client'
import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faBuilding, faBank } from "@fortawesome/free-solid-svg-icons";
import InputBox from "@/common-components/InputBox";
import Button from "@/common-components/Button";
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Loader from "@/common-components/Loader";
import hotelImag from "../../../../../assets/images/hotel.png";
import CustomTextArea from "@/common-components/CustomTextArea";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { communication, getServerUrl } from "@/services/communication";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ButtonLoader from "@/common-components/ButtonLoader";
import { getCookie } from "cookies-next";
import { getCookiesData } from "@/utilities/getCookiesData";

const HotelInformation = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [file, setFile] = useState();
    const [fileError, setFileError] = useState(false);
    const [restaurantId, setIsRestaurantId] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        control
    } = useForm();

    //fetch Hotel Information on initial load
    const fetchRestaurantDetailById = async () => {
        try {
            const userDetail = getCookiesData(router);
            if (userDetail?.restaurantId) {
                setIsRestaurantId(userDetail?.restaurantId);
                setLoader(true);
                const serverResponse = await communication.getRestaurantDetailById(userDetail?.restaurantId);
                if (serverResponse?.data?.status === "SUCCESS") {
                    setLoader(false);
                    setFile(serverResponse?.data?.restaurant?.image);
                    setValue("ownerName", serverResponse?.data?.restaurant?.ownerName);
                    setValue("restaurantName", serverResponse?.data?.restaurant?.restaurantName);
                    setValue("mobile", serverResponse?.data?.restaurant?.mobile);
                    setValue("email", serverResponse?.data?.restaurant?.email);
                    setValue("gstNumber", serverResponse?.data?.restaurant?.gstNumber);
                    setValue("address", serverResponse?.data?.restaurant?.address);
                    setValue("accountHolderName", serverResponse?.data?.restaurant?.accountHolderName);
                    setValue("accountNumber", serverResponse?.data?.restaurant?.accountNumber);
                    setValue("branchName", serverResponse?.data?.restaurant?.branchName);
                    setValue("IFSCCode", serverResponse?.data?.restaurant?.IFSCCode);
                } else if (serverResponse?.data?.restaurant?.status === "JWT_INVALID") {
                    toast.info(serverResponse?.data?.restaurant?.message);
                    router.push("/");
                } else {
                    setLoader(false);
                    toast.warning(serverResponse?.data?.message);
                }
            }
        } catch (error) {
            setLoader(false);
            toast.error(error?.message);
        }
    }

    //Submit Hotel information
    const onSubmit = async (data) => {
        try {
            if ([undefined, null, ""]?.includes(file)) {
                setFileError(true);
                return false;
            }
            const dataToSend = {
                ...data,
                restaurantId
            }
            let formData = new FormData();
            let isFileAttached = false;
            if ([undefined, null, ""]?.includes(restaurantId) && typeof (file) === "object") {
                formData.append("image", file);
                formData.append("restaurantData", JSON.stringify(data));
            } else if (![undefined, null, ""]?.includes(restaurantId) && typeof (file) === "object") {
                isFileAttached = true;
                formData.append("image", file);
                formData.append("restaurantData", JSON.stringify(dataToSend));
            } else {
                formData = dataToSend
            }
            setButtonLoader(true);
            let serverResponse;
            if ([undefined, null, ""]?.includes(restaurantId) && typeof (file) === "object") {
                serverResponse = await communication.addRestaurantDetails(formData);
            } else {
                serverResponse = await communication.updateRestaurantDetail(isFileAttached, formData);
            }
            if (serverResponse?.data?.status === "SUCCESS") {
                setButtonLoader(false);
                toast.success(serverResponse?.data?.message);
                fetchRestaurantDetailById()
            } else if (serverResponse?.data?.status === "JWT_INVALID") {
                toast.info(serverResponse?.data?.message);
                router.push("/");
            } else {
                setButtonLoader(false);
                toast.warning(serverResponse?.data?.message);
            }
        } catch (error) {
            setButtonLoader(false);
            toast.error(error?.message);
        }
    }


    useEffect(() => {
        fetchRestaurantDetailById();
    }, []);

    return (

        <div className="configure_wrapper">
            {
                loader &&
                <Loader text={"Fetching Data..."} />
            }
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-md-12 col-lg-4">
                            <label for="file" className="hotel_image_wrapper">
                                <input type="file" accept="images" onChange={(event) => { setFile(event.target.files[0]); setFileError([undefined, null, ""]?.includes(file) && false) }} className="form-control d-none" id="file" />
                                {[undefined, null, ""]?.includes(file) ?
                                    <div className="content">
                                        <FontAwesomeIcon icon={faImage} />
                                        <h6>Upload Restaurant Image</h6>
                                    </div>
                                    :
                                    <Image src={typeof (file) === "string" ? `${getServerUrl()}/getFiles/${file}` : URL?.createObjectURL(file)} alt="Hotel Image" width={200} height={200} />
                                }
                            </label>
                            {fileError && <p className="validation_message text-center">Restaurant Image is Required</p>}
                        </div>
                        <div className="col-12 col-sm-6 col-md-12 col-lg-8">
                            <div className="resto_name">
                                <FontAwesomeIcon icon={faBuilding} /><p>Restaurant Details</p>
                            </div>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>Owner Name *</label>
                                        <InputBox
                                            type={"text"}
                                            register={{
                                                ...register("ownerName", {
                                                    required: "Owner name is required",
                                                })
                                            }}
                                            errors={errors.ownerName}
                                            placeholder={""}
                                            disable={false} />

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>Restaurant Name *</label>
                                        <InputBox type={"text"} register={{
                                            ...register("restaurantName", {
                                                required: "Restaurant name is required"
                                            })
                                        }}
                                            errors={errors.restaurantName}
                                            placeholder={""}
                                            disable={false} />

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>Contact Number *</label>
                                        <InputBox type={"number"} register={{
                                            ...register("mobile", {
                                                required: "Contact number is required",
                                                minLength: { value: 10, message: "Mobile Number Should be 10 Digits" }, maxLength: { value: 10, message: "Mobile Number cannot be more than 10 Digits" }
                                            })
                                        }}
                                            errors={errors.mobile}
                                            placeholder={""}
                                            disable={false} />

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>Email *</label>
                                        <InputBox type={"email"} register={{
                                            ...register("email", {
                                                required: "Email is required"
                                            })
                                        }}
                                            errors={errors.email}
                                            placeholder={""}
                                            disable={false} />

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>GST Number *</label>
                                        <InputBox type={"text"} register={{
                                            ...register("gstNumber", { required: "GST number is required" })
                                        }} errors={errors.gstNumber} placeholder={""} disable={false} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-8">
                                    <div className="input_box_wrapper">
                                        <label>Address *</label>
                                        <CustomTextArea
                                            register={{
                                                ...register("address", { required: "Address is required" })
                                            }}
                                            errors={errors.address}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="resto_name">
                                <FontAwesomeIcon icon={faBank} /><p>Bank Details</p>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>Account Holder Name *</label>
                                        <InputBox type={"text"} register={{
                                            ...register("accountHolderName", {
                                                required: "Account holder name is required"
                                            })
                                        }}
                                            errors={errors.accountHolderName}
                                            placeholder={""}
                                            disable={false} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>Account Number  *</label>
                                        <InputBox type={"number"} register={{
                                            ...register("accountNumber", {
                                                required: "Account number is required"
                                            })
                                        }}
                                            errors={errors.accountNumber}
                                            placeholder={""}
                                            disable={false} />

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>Branch Name *</label>
                                        <InputBox type={"text"} register={{
                                            ...register("branchName", {
                                                required: "Branch name is required"
                                            })
                                        }}
                                            errors={errors.branchName}
                                            placeholder={""}
                                            disable={false} />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-4">
                                    <div className="input_box_wrapper">
                                        <label>IFSC Code *</label>
                                        <InputBox type={"text"} register={{
                                            ...register("IFSCCode", {
                                                required: "IFSC code is required"
                                            })
                                        }}
                                            errors={errors.IFSCCode}
                                            placeholder={""}
                                            disable={false} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-8">
                                <div className="button_wrapper">
                                    <Button name={buttonLoader ? <ButtonLoader /> : "Submit"} onClick={handleSubmit(onSubmit)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HotelInformation