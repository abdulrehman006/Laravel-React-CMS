<!DOCTYPE html>
<html>
<head>
    <title>New Appointment Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 5px 5px;
        }
        .section {
            background-color: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .section-title {
            color: #007bff;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        .info-row {
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: bold;
            color: #495057;
        }
        .info-value {
            color: #212529;
            margin-left: 10px;
        }
        .message-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #007bff;
            border-radius: 4px;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            color: #6c757d;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">New Appointment Request</h1>
    </div>

    <div class="content">
        <!-- Personal Information Section -->
        <div class="section">
            <div class="section-title">Personal Information</div>
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">{{ $name }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">{{ $email }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">{{ $phone }}</span>
            </div>
            @if($company_name)
            <div class="info-row">
                <span class="info-label">Company Name:</span>
                <span class="info-value">{{ $company_name }}</span>
            </div>
            @endif
        </div>

        <!-- Vehicle Information Section -->
        <div class="section">
            <div class="section-title">Vehicle Information</div>
            <div class="info-row">
                <span class="info-label">Vehicle Type:</span>
                <span class="info-value">{{ $vehicle_type }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Registration Number:</span>
                <span class="info-value">{{ $vehicle_registration }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Number of Vehicles:</span>
                <span class="info-value">{{ $no_of_vehicles }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Appointment Date:</span>
                <span class="info-value">{{ $date }}</span>
            </div>
        </div>

        <!-- Message Section -->
        <div class="section">
            <div class="section-title">Additional Message</div>
            <div class="message-box">
                {{ $message }}
            </div>
        </div>

        <div class="footer">
            <p>This is an automated email notification. Please do not reply directly to this email.</p>
            <p>&copy; {{ date('Y') }} Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
