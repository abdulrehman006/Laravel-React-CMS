import React, { useEffect, useState } from 'react';
import Div from '../Div';
import Section from '../Div';
import Spacing from '../Spacing';

export default function MovingText({ text, variant }) {
  const [feeData, setFeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    fetch('/proxy/fee-structure')
      .then((res) => {
        if (!res.ok) throw new Error('Data is not found');
        return res.json();
      })
      .then((data) => {
        setFeeData(data);
        setLoading(false);
      })
      .catch((err) => {
        setApiError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!vehicleCategory.trim()) {
      setError('Please enter a vehicle category');
      setFilteredData([]);
      return;
    }

    const result = feeData.filter((item) =>
      item.vehicleCategory.toLowerCase().includes(vehicleCategory.toLowerCase())
    );

    if (result.length === 0) {
      setError('PLease write correct category.');
    }

    setFilteredData(result);
  };

  return (
    <Div
      className={`cs-cta cs-style1 cs-bg text-center cs-shape_wrap_1 cs-position_1 ${variant ? variant : ''}`}
      style={{ backgroundImage: 'url(/images/cta_bg.jpeg)' }}
    >
      
      <Div className="cs-cta_in">
        <h2 className="cs-cta_title cs-semi_bold cs-m0">{text}</h2>
        <Spacing lg="70" md="30" />

       <form onSubmit={handleSubmit} className="cs-verification-form calc">
  <Div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
    {/* Input Field */}
    <Div className="cs-form-group col-span-2">
      <label htmlFor="vehicleCategory" className="block mb-1 font-semibold">
        Vehicle Category:
      </label>
      <input
        type="text"
        id="vehicleCategory"
        name="vehicleCategory"
        value={vehicleCategory}
        onChange={(e) => setVehicleCategory(e.target.value)}
        placeholder="e.g., Heavy Transport Vehicles"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </Div>

    {/* Buttons */}
    <Div className="flex gap-2 mt-4 md:mt-0">
      <button type="submit" className="cs-submit-button w-full">
        Search
      </button>
      <button
        type="button"
        className="cs-reset-button w-full"
        onClick={() => {
          setVehicleCategory('');
          setFilteredData([]);
          setError('');
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

        {filteredData && filteredData.length > 0 ? (
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
              {filteredData.map((item, index) => (
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
                  <td>{item.offRoadInspec}</td>
                  <td>{item.offRoadInspecWithGST}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          filteredData && <p>No data found for the provided category.</p>
        )}
      </Div>
    </Div>
  );
}
