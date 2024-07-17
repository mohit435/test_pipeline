"use client";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import { formatDate } from "@/helper/formatDate";

const PdfPayment = ({ setModalStates, pdfData, toast }) => {
  const printPdfRef = useRef(null);

  // function to download html into pdf format
  const handleDownloadPdf = () => {
    const pdfContent = printPdfRef.current;
    // Use html2canvas to capture the content of the DOM element
    html2canvas(pdfContent, {
      // You can customize options here if needed
    })
      .then((canvas) => {
        // Create a new jsPDF instance
        const pdf = new jsPDF({
          unit: "in",
          format: "letter",
          orientation: "portrait",
        });
        // Calculate the aspect ratio to fit the content on the PDF
        const ratio = canvas.width / canvas.height;
        const width = 8.5; // Letter size width in inches
        const height = width / ratio;
        // Add the captured canvas to the PDF
        pdf.addImage(
          canvas.toDataURL("image/jpeg", 1.0),
          "JPEG",
          0,
          0,
          width,
          height
        );
        // Save the PDF
        pdf.save("purchase-indent.pdf");
        toast.success("PDF downloaded Successfully!");
        setModalStates((prev) => ({ ...prev, viewPdf: false }));
      })
      .catch((error) => {
        toast.error("Error while downloading PDF:", error);
      });
  };

  // function for print html document
  const handlePrint = useReactToPrint({
    content: () => printPdfRef.current,
  });

  return (
    <div className="form_modal_wrapper z-3 fade_animation">
      <div className="form_modal bg-white" style={{ width: "60%" }}>
        <div className="form_modal_header">
          <div className="">
            <button
              className="btn btn-danger fw-medium mx-1"
              onClick={handleDownloadPdf}
            >
              Download
            </button>
            <button
              className="btn btn-success fw-medium mx-1"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
          <div
            className="px-2"
            title="close"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalStates((prev) => ({ ...prev, viewPdf: false }));
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
          </div>
        </div>
        <div className="kitchen_req_pdf_main p-4" ref={printPdfRef}>
          <div className="pdf_header_wrapper">
            <div className="logo_div">
              <Image src={logo} width={80} height={60} alt="ohno logo" />
            </div>
            <div className="header_details">
              <h5>Avishi Venture</h5>
              <h6>316/E R.T. road, MG House, Civil Lines, Nagpur 440001.</h6>
            </div>
          </div>

          <div className="heading_div">
            <p>{formatDate(pdfData?.createdAt)}</p>
            {/* <h2>Purchase Indent</h2> */}
          </div>

          <div className="req_details">
            <div className="left_details">
              <h4>
                Vendor :&nbsp;
                <span className="text-capitalize">
                  {pdfData?.vendorId?.map((data) => {
                    return data?.companyName + ", ";
                  })}
                </span>
              </h4>

              <h4>
                Category :&nbsp;
                <span className="text-capitalize">
                  {pdfData?.categoryId?.map((data) => {
                    return data?.name + ", ";
                  })}
                </span>
              </h4>
            </div>
            <div className="right_details">
              <h4>#{pdfData?.indentId}</h4>
              {pdfData?.unlimitedQty && <h4>Unlimited Quantity</h4>}
            </div>
          </div>

          <div className="req_table_main">
            <div className="table_main_heading">
              <h3>Requirement Detail</h3>
            </div>
            <div className="table_head">
              <div className=" data_col col_25p">
                <h5>Sr. No.</h5>
              </div>
              <div className=" data_col col_25p">
                <h5>Category</h5>
              </div>
              <div className=" data_col col_25p">
                <h5>Product</h5>
              </div>
              <div className=" data_col col_25p">
                <h5>Quantity</h5>
              </div>
            </div>
            {pdfData?.productInfo?.map((data, index) => {
              return (
                <div key={index} className="table_data">
                  <div className=" data_col col_25p">
                    <h6>{index + 1}</h6>
                  </div>
                  <div className=" data_col col_25p">
                    <h6>{data?.categoryId?.name}</h6>
                  </div>
                  <div className=" data_col col_25p">
                    <h6>{data?.productId?.name}</h6>
                  </div>
                  <div className=" data_col col_25p">
                    <h6>
                      {data?.quantity}&nbsp;{data?.unitId?.shortName}
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="note_wrapper">
            <h6>Note: </h6>
            <p className="text-secondary fw-normal">{pdfData?.description}</p>
          </div>

          <div className="authorized_wrapper mt-auto">
            <p>(Authorized by)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfPayment;
