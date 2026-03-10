<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Appointment Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 30px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">

                    {{-- Header --}}
                    <tr>
                        <td style="background: linear-gradient(135deg, #DAA520, #B8860B); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">New Appointment Request</h1>
                            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Received on {{ date('d M Y, h:i A') }}</p>
                        </td>
                    </tr>

                    {{-- Personal Information --}}
                    <tr>
                        <td style="padding: 30px 40px 0;">
                            <h2 style="margin: 0 0 16px; font-size: 16px; color: #DAA520; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #DAA520; padding-bottom: 8px;">Personal Information</h2>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 40%; color: #6c757d; font-size: 14px; font-weight: 600;">Full Name</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #212529; font-size: 14px;">{{ $name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6c757d; font-size: 14px; font-weight: 600;">Email</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #212529; font-size: 14px;">
                                        <a href="mailto:{{ $email }}" style="color: #DAA520; text-decoration: none;">{{ $email }}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6c757d; font-size: 14px; font-weight: 600;">Phone</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #212529; font-size: 14px;">
                                        <a href="tel:{{ $phone }}" style="color: #DAA520; text-decoration: none;">{{ $phone }}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6c757d; font-size: 14px; font-weight: 600;">Company Type</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #212529; font-size: 14px;">{{ ucfirst($company_type ?? 'Individual') }}</td>
                                </tr>
                                @if(!empty($company_name))
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6c757d; font-size: 14px; font-weight: 600;">Company Name</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #212529; font-size: 14px;">{{ $company_name }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding: 10px 0; color: #6c757d; font-size: 14px; font-weight: 600;">Preferred Station</td>
                                    <td style="padding: 10px 0; color: #212529; font-size: 14px;">{{ $location_name ?? 'N/A' }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Vehicle Information --}}
                    <tr>
                        <td style="padding: 25px 40px 0;">
                            <h2 style="margin: 0 0 16px; font-size: 16px; color: #DAA520; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #DAA520; padding-bottom: 8px;">Vehicle Information</h2>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 40%; color: #6c757d; font-size: 14px; font-weight: 600;">Vehicle Type</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #212529; font-size: 14px;">{{ $vehicle_type }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6c757d; font-size: 14px; font-weight: 600;">Registration No.</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #212529; font-size: 14px; font-weight: 700;">{{ $vehicle_registration }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6c757d; font-size: 14px; font-weight: 600;">No. of Vehicles</td>
                                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #212529; font-size: 14px;">{{ $no_of_vehicles }}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #6c757d; font-size: 14px; font-weight: 600;">Appointment Date</td>
                                    <td style="padding: 10px 0; color: #212529; font-size: 14px; font-weight: 700;">{{ \Carbon\Carbon::parse($date)->format('d M Y') }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    {{-- Message --}}
                    <tr>
                        <td style="padding: 25px 40px 0;">
                            <h2 style="margin: 0 0 16px; font-size: 16px; color: #DAA520; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #DAA520; padding-bottom: 8px;">Additional Message</h2>
                            <div style="background-color: #fdf8ec; padding: 16px 20px; border-left: 4px solid #DAA520; border-radius: 4px; color: #333; font-size: 14px; line-height: 1.6;">
                                {!! nl2br(e($message)) !!}
                            </div>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="padding: 30px 40px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="border-top: 1px solid #e9ecef; padding-top: 20px; text-align: center;">
                                        <p style="margin: 0 0 5px; color: #999; font-size: 12px;">This is an automated notification from your website.</p>
                                        <p style="margin: 0; color: #999; font-size: 12px;">&copy; {{ date('Y') }} {{ config('app.name', 'VICS') }}. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
