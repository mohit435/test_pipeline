"use client"
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { communication } from '@/services/communication';
import { toast } from 'react-toastify';
import Loader from '@/common-components/Loader';
ChartJS.register(ArcElement, Tooltip, Legend, plugins,);
ChartJS.defaults.set('plugins.datalabels', {
  color: '#fff',
});

const Page = () => {
  const [loader, setLoader] = useState(false);
  const [graphData, setGraphData] = useState({});

  //get account graph data on initial load
  const fetchAccountGraphData = async () => {
    try {
      setLoader(true);
      const serverResponse = await communication.getAccountGraphData();
      if (serverResponse?.data?.status === "SUCCESS") {
        setLoader(false);
        setGraphData(serverResponse?.data?.result);
      } else if (serverResponse?.data?.status === "JWT_INVALID") {
        toast.info(serverResponse?.data?.message);
        router.push("/");
      } else {
        setLoader(false);
        setGraphData({})
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.message);
    }
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
  const data = {
    labels: graphData?.mode,
    datasets: [
      {
        label: '',
        data: graphData?.value,
        backgroundColor: ["#62B2FD", "#9BDFC4"],
        borderColor: ["#62B2FD", "#9BDFC4"],
        borderWidth: 1,
        fill: true,
        tension: 0.4
      },
    ],
    // plugins: [ChartDataLabels],
  };

  useEffect(() => {
    fetchAccountGraphData();
  }, []);

  return (
    <div>
      {loader && <Loader text="Fetching Data..." />}
      <h6>Dashboard</h6>
      <div className="account_dashboard_card_wrapper">
        <div className="card_header">
          <h6>Payment Mode</h6>
        </div>
        <div className="card_body">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <Pie data={data} options={options} />
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="legend_wrapper">
                <div className="legend_main">
                  {graphData?.mode?.map((mode, index) => (
                    <div className="legends" key={index}>
                      <div className="legend_text_wrapper">
                        <h6>{mode}</h6>
                      </div>
                      <h6><FontAwesomeIcon icon={faIndianRupeeSign} /> {graphData?.value[index]}</h6>
                    </div>
                  ))}
                  {/* <div className="legends">
                    <h6>Online</h6>
                    <h6><FontAwesomeIcon icon={faIndianRupeeSign} /> 200000</h6>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
