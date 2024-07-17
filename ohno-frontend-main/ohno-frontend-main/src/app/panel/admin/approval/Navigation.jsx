"use client";
import { usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <>
      <div className="top_header">
        <div className="tab_title">Approval</div>
        <div
          className="back_btn"
          onClick={() => {
            router.back();
          }}
        >
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1564_1770)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.07615 5.61732C3.23093 5.24364 3.59557 5 4.00003 5H14C17.866 5 21 8.13401 21 12C21 15.866 17.866 19 14 19H5.00003C4.44774 19 4.00003 18.5523 4.00003 18C4.00003 17.4477 4.44774 17 5.00003 17H14C16.7615 17 19 14.7614 19 12C19 9.23858 16.7615 7 14 7H6.41424L8.20714 8.79289C8.59766 9.18342 8.59766 9.81658 8.20714 10.2071C7.81661 10.5976 7.18345 10.5976 6.79292 10.2071L3.29292 6.70711C3.00692 6.42111 2.92137 5.99099 3.07615 5.61732Z"
                  fill="#198754"
                />
              </g>
              <defs>
                <clipPath id="clip0_1564_1770">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div>Back</div>
        </div>
      </div>
      {/* tab navigation links  */}
      <div className="py-3 px-4 mt-3 d-flex justify-content-start align-items-start gap-3 bg-white">
        <div
          className="tab_btn"
          onClick={() => {
            router.push("/panel/admin/approval/hrm");
          }}
          style={{
            backgroundColor:
              pathName?.split("/")[4] == "hrm" ? "#198754" : "#96989c",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_330_3549)">
              <path
                d="M10.9533 11.1267C10.0303 11.1267 9.12809 10.853 8.36066 10.3402C7.59323 9.82742 6.99509 9.09858 6.64188 8.24586C6.28867 7.39314 6.19626 6.45483 6.37632 5.54958C6.55639 4.64434 7.00084 3.81282 7.65349 3.16017C8.30613 2.50753 9.13765 2.06307 10.0429 1.88301C10.9481 1.70294 11.8865 1.79536 12.7392 2.14857C13.5919 2.50177 14.3207 3.09991 14.8335 3.86734C15.3463 4.63477 15.62 5.53702 15.62 6.46C15.62 7.69768 15.1283 8.88467 14.2532 9.75984C13.378 10.635 12.191 11.1267 10.9533 11.1267ZM10.9533 3.18C10.294 3.18 9.64958 3.3755 9.10142 3.74177C8.55326 4.10804 8.12601 4.62864 7.87372 5.23773C7.62143 5.84681 7.55542 6.51704 7.68404 7.16364C7.81265 7.81024 8.13012 8.40419 8.5963 8.87036C9.06247 9.33654 9.65642 9.654 10.303 9.78262C10.9496 9.91124 11.6198 9.84523 12.2289 9.59294C12.838 9.34064 13.3586 8.9134 13.7249 8.36524C14.0912 7.81707 14.2867 7.17261 14.2867 6.51334C14.2867 6.0756 14.2004 5.64214 14.0329 5.23773C13.8654 4.83331 13.6199 4.46584 13.3103 4.15631C13.0008 3.84679 12.6334 3.60125 12.2289 3.43374C11.8245 3.26622 11.3911 3.18 10.9533 3.18Z"
                fill="#F3F8FF"
              />
              <path
                d="M14.6667 11.9333C11.0589 11.1215 7.28468 11.5125 3.92 13.0466C3.45726 13.2676 3.06684 13.6156 2.7942 14.0499C2.52155 14.4843 2.37791 14.9871 2.38 15.4999V19.4666C2.38 19.6434 2.45023 19.813 2.57526 19.938C2.70028 20.063 2.86985 20.1333 3.04666 20.1333C3.22347 20.1333 3.39304 20.063 3.51807 19.938C3.64309 19.813 3.71333 19.6434 3.71333 19.4666V15.4999C3.70753 15.2404 3.77761 14.9848 3.91498 14.7646C4.05236 14.5443 4.25104 14.3689 4.48666 14.2599C6.51351 13.3241 8.72087 12.8439 10.9533 12.8533C12.2042 12.8517 13.4508 12.9994 14.6667 13.2933V11.9333Z"
                fill="#F3F8FF"
              />
              <path
                d="M18.8533 18.2733H14.76V19.2066H18.8533V18.2733Z"
                fill="#F3F8FF"
              />
              <path
                d="M22.1133 14.3133H18.6667V15.6466H21.4467V21.2266H12V15.6466H16.2V15.9266C16.2 16.1034 16.2702 16.273 16.3953 16.398C16.5203 16.5231 16.6899 16.5933 16.8667 16.5933C17.0435 16.5933 17.2131 16.5231 17.3381 16.398C17.4631 16.273 17.5333 16.1034 17.5333 15.9266V13.3333C17.5333 13.1565 17.4631 12.9869 17.3381 12.8619C17.2131 12.7369 17.0435 12.6666 16.8667 12.6666C16.6899 12.6666 16.5203 12.7369 16.3953 12.8619C16.2702 12.9869 16.2 13.1565 16.2 13.3333V14.3133H11.3333C11.1565 14.3133 10.987 14.3835 10.8619 14.5086C10.7369 14.6336 10.6667 14.8031 10.6667 14.98V21.8933C10.6667 22.0701 10.7369 22.2397 10.8619 22.3647C10.987 22.4897 11.1565 22.56 11.3333 22.56H22.1133C22.2901 22.56 22.4597 22.4897 22.5847 22.3647C22.7098 22.2397 22.78 22.0701 22.78 21.8933V14.98C22.78 14.8031 22.7098 14.6336 22.5847 14.5086C22.4597 14.3835 22.2901 14.3133 22.1133 14.3133Z"
                fill="#F3F8FF"
              />
            </g>
          </svg>
          HRM
        </div>
        <div
          className="tab_btn"
          onClick={() => {
            router.push("/panel/admin/approval/store");
          }}
          style={{
            backgroundColor:
              pathName?.split("/")[4] == "store" ? "#198754" : "#96989c",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.625 3L6.25 15.1875V45.6562L30.625 57.8145L55 45.6562V15.1875L30.625 3ZM12.3145 16.3594L30.625 7.21875L37.6855 10.7344L19.4922 19.9336L12.3145 16.3594ZM30.625 25.5L23.6523 22.043L41.875 12.8438L48.9355 16.3594L30.625 25.5ZM51.25 19.4062V43.3125L32.5 52.6875V28.7812L51.25 19.4062ZM28.75 52.6875L10 43.3125V19.4062L28.75 28.7812V52.6875Z"
              fill="#F3F8FF"
            />
          </svg>
          STORE
        </div>

        <div
          className="tab_btn"
          onClick={() => {
            router.push("/panel/admin/approval/vendor");
          }}
          style={{
            backgroundColor:
              pathName?.split("/")[4] == "vendor" ? "#198754" : "#96989c",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_6447_1449)">
              <path
                d="M33.7497 42.2217C33.7497 42.9856 33.1247 43.6106 32.3608 43.6106C31.5969 43.6106 30.9788 42.9856 30.9788 42.2217C30.9788 41.4578 31.5969 40.8328 32.3608 40.8328C33.1247 40.8328 33.7497 41.4578 33.7497 42.2217ZM39.3052 40.8328C38.5413 40.8328 37.9233 41.4578 37.9233 42.2217C37.9233 42.9856 38.5413 43.6106 39.3052 43.6106C40.0691 43.6106 40.6941 42.9856 40.6941 42.2217C40.6941 41.4578 40.0691 40.8328 39.3052 40.8328ZM39.5802 37.3606C39.8962 37.3605 40.2027 37.2527 40.4491 37.055C40.6956 36.8573 40.8672 36.5815 40.9358 36.2731L42.083 31.805H32.3608V31.1106C32.3608 30.7422 32.2145 30.3889 31.954 30.1285C31.6935 29.868 31.3403 29.7217 30.9719 29.7217H29.583V31.1106H30.9719V38.7495C30.9719 39.1178 31.1182 39.4711 31.3787 39.7315C31.6392 39.992 31.9924 40.1383 32.3608 40.1383H40.6941C40.6941 39.77 40.5478 39.4167 40.2873 39.1563C40.0269 38.8958 39.6736 38.7495 39.3052 38.7495H32.3608V37.3606H39.5802Z"
                fill="#F3F8FF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.6587 27.2295C24.7649 27.1337 23.8482 27.0837 22.917 27.0837C17.9274 27.0837 13.3857 28.5316 10.0462 30.5649C8.37741 31.5857 6.95449 32.7837 5.92533 34.0857C4.91283 35.3691 4.16699 36.9024 4.16699 38.542C4.16699 40.3024 5.02116 41.6878 6.25658 42.6795C7.42324 43.617 8.96283 44.2378 10.5982 44.6712C13.8857 45.542 18.2732 45.8337 22.917 45.8337L24.3441 45.8253L24.6087 45.8045C24.9321 45.7586 25.2403 45.6373 25.5082 45.4504C25.7762 45.2635 25.9964 45.0162 26.1512 44.7284C26.3059 44.4407 26.3908 44.1206 26.3989 43.7939C26.4071 43.4673 26.3384 43.1434 26.1982 42.8482C25.4316 41.2295 25.0003 39.417 25.0003 37.5003C24.995 34.994 25.7474 32.5445 27.1587 30.4732C27.3612 30.1757 27.4832 29.8308 27.5127 29.4721C27.5423 29.1134 27.4785 28.7532 27.3274 28.4265C27.1763 28.0998 26.9432 27.8179 26.6508 27.6081C26.3583 27.3983 26.0165 27.2679 25.6587 27.2295ZM30.2827 7.21796C28.3292 5.26446 25.6797 4.16699 22.917 4.16699C20.1543 4.16699 17.5048 5.26446 15.5513 7.21796C13.5978 9.17147 12.5003 11.821 12.5003 14.5837C12.5003 17.3463 13.5978 19.9959 15.5513 21.9494C17.5048 23.9029 20.1543 25.0003 22.917 25.0003C25.6797 25.0003 28.3292 23.9029 30.2827 21.9494C32.2362 19.9959 33.3337 17.3463 33.3337 14.5837C33.3337 11.821 32.2362 9.17147 30.2827 7.21796ZM22.917 21.667C26.829 21.667 30.0003 18.4957 30.0003 14.5837C30.0003 10.6716 26.829 7.50033 22.917 7.50033C19.005 7.50033 15.8337 10.6716 15.8337 14.5837C15.8337 18.4957 19.005 21.667 22.917 21.667Z"
                fill="#F3F8FF"
              />
            </g>
            <defs>
              <clipPath id="clip0_6447_1449">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Vendor
        </div>

        {/* <div
          className="tab_btn"
          onClick={() => {
            router.push("/panel/admin/approval/account");
          }}
          style={{
            backgroundColor:
              pathName?.split("/")[4] == "account" ? "#198754" : "#96989c",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V13C0 13.7956 0.316071 14.5587 0.87868 15.1213C1.44129 15.6839 2.20435 16 3 16H17C17.7956 16 18.5587 15.6839 19.1213 15.1213C19.6839 14.5587 20 13.7956 20 13V3C20 2.20435 19.6839 1.44129 19.1213 0.87868C18.5587 0.316071 17.7956 0 17 0ZM18 10.3H15C14.39 10.3 13.805 10.0577 13.3737 9.62634C12.9423 9.19501 12.7 8.61 12.7 8C12.7 7.39 12.9423 6.80499 13.3737 6.37365C13.805 5.94232 14.39 5.7 15 5.7H18V10.3ZM18 4H15C13.9391 4 12.9217 4.42143 12.1716 5.17157C11.4214 5.92172 11 6.93913 11 8C11 9.06087 11.4214 10.0783 12.1716 10.8284C12.9217 11.5786 13.9391 12 15 12H18V13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V4ZM14 8C14 8.19778 14.0586 8.39112 14.1685 8.55557C14.2784 8.72002 14.4346 8.84819 14.6173 8.92388C14.8 8.99957 15.0011 9.01937 15.1951 8.98078C15.3891 8.9422 15.5673 8.84696 15.7071 8.70711C15.847 8.56725 15.9422 8.38907 15.9808 8.19509C16.0194 8.00111 15.9996 7.80004 15.9239 7.61732C15.8482 7.43459 15.72 7.27841 15.5556 7.16853C15.3911 7.05865 15.1978 7 15 7C14.7348 7 14.4804 7.10536 14.2929 7.29289C14.1054 7.48043 14 7.73478 14 8Z"
              fill="#F3F8FF"
            />
          </svg>
          Account
        </div> */}
      </div>
      <hr className="m-0"/>
    </>
  );
};

export default Navigation;
