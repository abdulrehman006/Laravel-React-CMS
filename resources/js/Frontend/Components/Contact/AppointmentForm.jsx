import Spacing from "@/Frontend/Components/Spacing";
import Div from "@/Frontend/Components/Div";
import SectionHeading from "@/Frontend/Components/SectionHeading";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function AppointmentForm() {
  const { flash } = usePage().props;
  const [selectedCompany, setSelectedCompany] = useState("Corporate");
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
  });

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
      },
    });
  };

  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
    if (value === "Local") {
      setData("company_name", ""); // Clear company name when "Local" is selected
    }
  };

  return (
    <Div className="container">
      <Div className="row">
        <Div>
          <form onSubmit={handleSubmit} className="row">
            {/* Vehicle Type */}
            <Div className="col-sm-6">
              <label className="cs-primary_color">Vehicle Type*</label>
              <select
  name="vehicle_type"
  value={data.vehicle_type}
  onChange={(e) => setData("vehicle_type", e.target.value)}
  className="cs-form_field"
  required
>
  <option value="">Select type</option>
  {vehicleTypes.map((type, index) => (
    <option key={index} value={type}>
      {type}
    </option>
  ))}
</select>

              {errors.vehicle_type && <span className="text-danger">{errors.vehicle_type}</span>}
              <Spacing lg="20" md="20" />
            </Div>

            {/* Date */}
            <Div className="col-sm-6">
              <label className="cs-primary_color">Date*</label>
              <input
                type="date"
                name="date"
                value={data.date}
                onChange={(e) => setData("date", e.target.value)}
                className="cs-form_field"
                required
              />
              {errors.date && <span className="text-danger">{errors.date}</span>}
              <Spacing lg="20" md="20" />
            </Div>

            {/* Select Company */}
            <Div className="col-sm-6">
              <label className="cs-primary_color">Select Company</label>
              <div>
                <div onClick={() => handleCompanyChange("Local")}>
                  <input
                    type="radio"
                    name="company_type"
                    value="Local"
                    checked={selectedCompany === "Local"}
                    onChange={() => handleCompanyChange("Local")}
                  />{" "}
                  Local
                </div>
                <div onClick={() => handleCompanyChange("Corporate")}>
                  <input
                    type="radio"
                    name="company_type"
                    value="Corporate"
                    checked={selectedCompany === "Corporate"}
                    onChange={() => handleCompanyChange("Corporate")}
                  />{" "}
                  Corporate
                </div>
              </div>
              {errors.company_type && <span className="text-danger">{errors.company_type}</span>}
              <Spacing lg="20" md="20" />
            </Div>

            {/* Company Name */}
            {selectedCompany === "Corporate" && (
              <Div className="col-sm-6">
                <label className="cs-primary_color">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={data.company_name}
                  onChange={(e) => setData("company_name", e.target.value)}
                  className="cs-form_field"
                  placeholder="Company Name"
                />
                {errors.company_name && <span className="text-danger">{errors.company_name}</span>}
                <Spacing lg="20" md="20" />
              </Div>
            )}

            {/* No. of Vehicles */}
            <Div className="col-sm-6">
              <label className="cs-primary_color">No. of Vehicles*</label>
              <input
                type="number"
                name="no_of_vehicles"
                value={data.no_of_vehicles}
                onChange={(e) => setData("no_of_vehicles", e.target.value)}
                className="cs-form_field"
                min="1"
                max="10"
                required
              />
              {errors.no_of_vehicles && <span className="text-danger">{errors.no_of_vehicles}</span>}
              <Spacing lg="20" md="20" />
            </Div>

            {/* Vehicle Registration */}
            <Div className="col-sm-6">
              <label className="cs-primary_color">Vehicle Registration Number*</label>
              <input
                type="text"
                name="vehicle_registration"
                value={data.vehicle_registration}
                onChange={(e) => setData("vehicle_registration", e.target.value)}
                className="cs-form_field"
                placeholder="Registration Number"
                required
              />
              {errors.vehicle_registration && <span className="text-danger">{errors.vehicle_registration}</span>}
              <Spacing lg="20" md="20" />
            </Div>

            {/* Personal Information Section */}
            <h2 className="col-sm-12" style={{ textAlign: "center", color: "black" }}>Personal Information</h2>

            {/* Name */}
            <Div className="col-sm-6">
              <label className="cs-primary_color">Name*</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="cs-form_field"
                required
                placeholder="Name"
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
              <Spacing lg="20" md="20" />
            </Div>

            {/* Phone */}
            <Div className="col-sm-6">
              <label className="cs-primary_color">Phone*</label>
              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
                className="cs-form_field"
                required
                placeholder="Phone"
              />
              {errors.phone && <span className="text-danger">{errors.phone}</span>}
              <Spacing lg="20" md="20" />
            </Div>

            {/* Email */}
            <Div className="col-sm-6">
              <label className="cs-primary_color">Email*</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                className="cs-form_field"
                required
                placeholder="Email"
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
              <Spacing lg="20" md="20" />
            </Div>

            {/* Message */}
            <Div className="col-sm-12">
              <label className="cs-primary_color">Message</label>
              <textarea
                name="message"
                value={data.message}
                onChange={(e) => setData("message", e.target.value)}
                className="cs-form_field"
                required
              ></textarea>
              {errors.message && <span className="text-danger">{errors.message}</span>}
              <Spacing lg="25" md="25" />
            </Div>

            {/* Submit Button */}
            <Div className="col-sm-12">
              <button type="submit" disabled={processing} className="cs-btn cs-style1">
                <span>Submit</span>
                <Icon icon="bi:arrow-right" />
              </button>
            </Div>

            {wasSuccessful && <span className="text-success mt-2">{flash.success}</span>}
          </form>
        </Div>
      </Div>
    </Div>
  );
}
