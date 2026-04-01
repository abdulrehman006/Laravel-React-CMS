import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function AppointmentForm() {
  const { flash, locations } = usePage().props;
  const [selectedCompany, setSelectedCompany] = useState("individual");
  const { data, setData, errors, post, wasSuccessful, reset, processing } = useForm({
    vehicle_type: "",
    date: "",
    company_name: "",
    no_of_vehicles: "",
    vehicle_registration: "",
    name: "",
    phone: "",
    email: "",
    message: "",
    location_id: "",
    company_type: "individual",
  });

  // Get active locations for dropdown
  const activeLocations = locations?.filter(loc => loc.is_active) || [];

  const vehicleTypes = [
    "Car",
    "Truck",
    "Motorcycle",
    "Bus",
    "Van",
    "SUV",
    "Bicycle",
    "Electric Vehicle",
    "Other",
  ];
  

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("appointment"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setSelectedCompany("individual");
      },
      onError: (errors) => {
        console.error('Form submission errors:', errors);
      }
    });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
    setData("company_type", value);
    if (value === "individual") {
      setData("company_name", "");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row">
      {/* Left Column - Personal Information */}
      <Div className="col-lg-6 col-md-12">
        <h3 className="cs-primary_color mb-4" style={{ fontWeight: "600" }}>Personal Information</h3>

        {/* Name */}
        <Div className="mb-3">
          <label className="cs-primary_color">Name*</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className="cs-form_field"
            required
            maxLength={100}
            placeholder="Enter your name"
            style={{ height: '50px' }}
          />
          {errors.name && <span className="text-danger d-block mt-1">{errors.name}</span>}
        </Div>

        {/* Email */}
        <Div className="mb-3">
          <label className="cs-primary_color">Email*</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            className="cs-form_field"
            required
            maxLength={100}
            placeholder="Enter your email"
            style={{ height: '50px' }}
          />
          {errors.email && <span className="text-danger d-block mt-1">{errors.email}</span>}
        </Div>

        {/* Phone */}
        <Div className="mb-3">
          <label className="cs-primary_color">Phone*</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={(e) => setData("phone", e.target.value)}
            className="cs-form_field"
            required
            maxLength={20}
            placeholder="Enter your phone number"
            style={{ height: '50px' }}
          />
          {errors.phone && <span className="text-danger d-block mt-1">{errors.phone}</span>}
        </Div>

        {/* Select Company */}
        <Div className="mb-3">
          <label className="cs-primary_color d-block mb-2">Select Company Type*</label>
          <Div className="d-flex gap-4">
            <label className="d-flex align-items-center" style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="company_type"
                value="individual"
                checked={selectedCompany === "individual"}
                onChange={() => handleCompanyChange("individual")}
                className="me-2"
              />
              <span>Individual</span>
            </label>
            <label className="d-flex align-items-center" style={{ cursor: "pointer" }}>
              <input
                type="radio"
                name="company_type"
                value="corporate"
                checked={selectedCompany === "corporate"}
                onChange={() => handleCompanyChange("corporate")}
                className="me-2"
              />
              <span>Corporate</span>
            </label>
          </Div>
          {errors.company_type && <span className="text-danger d-block mt-1">{errors.company_type}</span>}
        </Div>

        {/* Company Name - Only for Corporate */}
        {selectedCompany === "corporate" && (
          <Div className="mb-3">
            <label className="cs-primary_color">Company Name*</label>
            <input
              type="text"
              name="company_name"
              value={data.company_name}
              onChange={(e) => setData("company_name", e.target.value)}
              className="cs-form_field"
              placeholder="Enter company name"
              required={selectedCompany === "corporate"}
              maxLength={150}
              style={{ height: '50px' }}
            />
            {errors.company_name && <span className="text-danger d-block mt-1">{errors.company_name}</span>}
          </Div>
        )}

        {/* Location/Station Selection */}
        <Div className="mb-3">
          <label className="cs-primary_color">Preferred Station/Location*</label>
          <select
            name="location_id"
            value={data.location_id}
            onChange={(e) => setData("location_id", e.target.value)}
            className="cs-form_field"
            required
            style={{ height: '50px' }}
          >
            <option value="">Select a station</option>
            {activeLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.city || location.name}
              </option>
            ))}
          </select>
          {errors.location_id && <span className="text-danger d-block mt-1">{errors.location_id}</span>}
        </Div>
      </Div>

      {/* Right Column - Vehicle Information */}
      <Div className="col-lg-6 col-md-12">
        <h3 className="cs-primary_color mb-4" style={{ fontWeight: "600" }}>Vehicle Information</h3>

        {/* Vehicle Type */}
        <Div className="mb-3">
          <label className="cs-primary_color">Vehicle Type*</label>
          <select
            name="vehicle_type"
            value={data.vehicle_type}
            onChange={(e) => setData("vehicle_type", e.target.value)}
            className="cs-form_field"
            required
            style={{ height: '50px' }}
          >
            <option value="">Select vehicle type</option>
            {vehicleTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.vehicle_type && <span className="text-danger d-block mt-1">{errors.vehicle_type}</span>}
        </Div>

        {/* Vehicle Registration */}
        <Div className="mb-3">
          <label className="cs-primary_color">Vehicle Registration Number*</label>
          <input
            type="text"
            name="vehicle_registration"
            value={data.vehicle_registration}
            onChange={(e) => setData("vehicle_registration", e.target.value)}
            className="cs-form_field"
            placeholder="e.g., ABC-1234"
            required
            maxLength={20}
            style={{ height: '50px' }}
          />
          {errors.vehicle_registration && <span className="text-danger d-block mt-1">{errors.vehicle_registration}</span>}
        </Div>

        {/* No. of Vehicles */}
        <Div className="mb-3">
          <label className="cs-primary_color">Number of Vehicles*</label>
          <input
            type="number"
            name="no_of_vehicles"
            value={data.no_of_vehicles}
            onChange={(e) => setData("no_of_vehicles", e.target.value)}
            className="cs-form_field"
            min="1"
            max="10"
            placeholder="Enter number (1-10)"
            required
            style={{ height: '50px' }}
          />
          {errors.no_of_vehicles && <span className="text-danger d-block mt-1">{errors.no_of_vehicles}</span>}
        </Div>

        {/* Date */}
        <Div className="mb-3">
          <label className="cs-primary_color">Appointment Date*</label>
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={(e) => setData("date", e.target.value)}
            className="cs-form_field"
            required
            min={today}
            style={{ height: '50px' }}
          />
          {errors.date && <span className="text-danger d-block mt-1">{errors.date}</span>}
        </Div>
      </Div>

      {/* Message - Full Width */}
      <Div className="col-12 mt-3">
        <label className="cs-primary_color">Additional Message*</label>
        <textarea
          name="message"
          value={data.message}
          onChange={(e) => setData("message", e.target.value)}
          className="cs-form_field"
          rows="5"
          placeholder="Any additional information or special requests..."
          required
          maxLength={2000}
          style={{ minHeight: '120px', resize: 'vertical' }}
        ></textarea>
        {errors.message && <span className="text-danger d-block mt-1">{errors.message}</span>}
        <Spacing lg="25" md="25" />
      </Div>

      {/* Submit Button */}
      <Div className="col-12">
        <button type="submit" disabled={processing} className="cs-btn cs-style1">
          <span>{processing ? "Submitting..." : "Submit Appointment"}</span>
          {!processing && <Icon icon="bi:arrow-right" />}
        </button>
      </Div>

      {/* Success/Error Messages */}
      {flash?.error && (
        <Div className="col-12 mt-3">
          <div className="alert alert-danger" role="alert" style={{ padding: '15px', borderRadius: '8px' }}>
            {flash.error}
          </div>
        </Div>
      )}
      {wasSuccessful && flash?.success && (
        <Div className="col-12 mt-3">
          <div className="alert alert-success" role="alert" style={{ padding: '15px', borderRadius: '8px' }}>
            {flash.success}
          </div>
        </Div>
      )}
    </form>
  );
}
