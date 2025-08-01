import React, { useState } from 'react';
import axios from 'axios';
import Div from '../Div';
import Spacing from '../Spacing';

export default function MovingText({ text, variant }) {
const [regNo, setRegNo] = useState('');
const [feeData, setFeeData] = useState([]);
const [error, setError] = useState('');
const [apiError, setApiError] = useState('');
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setError('');
setFeeData([]);


if (!regNo.trim()) {
  setError('Please enter a valid registration number.');
  return;
}

setLoading(true);
try {
  const response = await axios.get(`/proxy/fee-structure`, {
    params: { regNo },
  });
  const data = response.data;

  if (Array.isArray(data) && data.length > 0) {
    setFeeData(data);
  } else {
    setError('No data found for the provided registration number.');
  }
} catch (err) {
  if (err.response && err.response.data && err.response.data.message) {
    setApiError(err.response.data.message);
  } else {
    setApiError('An unexpected error occurred while fetching data.');
  }
} finally {
  setLoading(false);
}


};

return (
<Div className={`cs-moving_text_wrap-api cs-bold cs-primary_font ${variant ? variant : ''}`}>
 


  <Div className="cs-cta cs-style1 cs-bg text-center cs-shape_wrap_1 cs-position_1" style={{ backgroundImage: 'url(/images/cta_bg.jpeg)' }}>
    <Div className="cs-cta_in">
      <h2 className="cs-cta_title cs-semi_bold cs-m0">{text}</h2>
      <Spacing lg="70" md="30" />

      <form onSubmit={handleSubmit} className="cs-verification-form api-calc">
        <Div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Div className="cs-form-group col-span-2">
            <label htmlFor="regNo" className="block mb-1 font-semibold">
              Registration Number:
            </label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="e.g., LES-19-2850"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </Div>
          <Div className="flex gap-2 mt-4 md:mt-0">
            <button type="submit" className="cs-submit-button w-full">
              Search
            </button>
            <button
              type="button"
              className="cs-reset-button w-full"
              onClick={() => {
                setRegNo('');
                setFeeData([]);
                setError('');
                setApiError('');
              }}
            >
              Reset
            </button>
          </Div>
        </Div>
      </form>

      <Spacing lg="45" md="30" />

      {loading && <p>Loading...</p>}
      {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {feeData.length > 0 && (
        <table className="cs-result-table">
          <thead>
            <tr>
              <th>Vehicle Category</th>
              <th>Fee Type</th>
              <th>Fee</th>
              <th>Fee with GST</th>
              <th>First Retest</th>
              <th>Second Retest</th>
              <th>Second Retest with GST</th>
              <th>Third Retest</th>
              <th>Third Retest with GST</th>
              <th>Off-Road Inspection</th>
              <th>Off-Road Inspection with GST</th>
            </tr>
          </thead>
          <tbody>
            {feeData.map((item, index) => (
              <tr key={index}>
                <td>{item.vehicleCategory}</td>
                <td>{item.feeType}</td>
                <td>{item.fee}</td>
                <td>{item.feeWithGST}</td>
                <td>{item.firstRetest}</td>
                <td>{item.secondRetest}</td>
                <td>{item.secondRetestWithGST}</td>
                <td>{item.thirdRetest}</td>
                <td>{item.thirdRetestWithGST}</td>
                <td>{item.offRoadInspection}</td>
                <td>{item.offRoadInspectionWithGST}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Div>
  </Div>
</Div>


);
}
