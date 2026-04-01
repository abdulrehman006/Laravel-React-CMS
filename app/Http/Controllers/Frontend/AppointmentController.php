<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Send appointment request email
     */
    public function send(Request $request): RedirectResponse
    {
        $request->validate([
            'vehicle_type' => 'required|string|max:50',
            'date' => 'required|date|after_or_equal:today',
            'company_type' => 'required|in:individual,corporate',
            'company_name' => 'required_if:company_type,corporate|nullable|string|max:150',
            'location_id' => 'required|exists:locations,id',
            'no_of_vehicles' => 'required|integer|min:1|max:10',
            'vehicle_registration' => 'required|string|max:20',
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:100',
            'message' => 'required|string|max:2000',
        ], [
            'company_type.required' => 'Please select a company type',
            'company_type.in' => 'Invalid company type selected',
            'company_name.required_if' => 'Company name is required for corporate appointments',
            'location_id.required' => 'Please select a preferred station',
            'location_id.exists' => 'The selected station is invalid',
            'no_of_vehicles.min' => 'Number of vehicles must be at least 1',
            'no_of_vehicles.max' => 'Number of vehicles cannot exceed 10',
            'date.after_or_equal' => 'Appointment date cannot be in the past',
            'message.max' => 'Message cannot exceed 2000 characters',
        ]);

        $data = $request->only([
            'vehicle_type', 'date', 'company_type', 'company_name', 'location_id',
            'no_of_vehicles', 'vehicle_registration', 'name', 'phone', 'email', 'message',
        ]);

        // Get location details
        $location = \App\Models\Location::find($request->location_id);
        $data['location_name'] = $location ? ($location->city ?? $location->name) : 'N/A';

        // Rename 'message' to 'user_message' to avoid Laravel Mail $message conflict
        $data['user_message'] = $data['message'] ?? '';
        unset($data['message']);

        // Get recipient email: Customize > Contact Info → fallback to .env
        $recipientEmail = $this->getRecipientEmail();

        if (!$recipientEmail) {
            Log::error('Appointment email not sent: No recipient email configured in Customize > Contact Info or .env MAIL_FROM_ADDRESS');
            return back()->with('error', 'Unable to process your appointment at this time. Please try again later or contact us directly.');
        }

        try {
            Mail::send('emails.appointment', $data, function ($msg) use ($data, $recipientEmail) {
                $msg->to($recipientEmail)
                    ->subject('New Appointment Request - ' . $data['name'])
                    ->replyTo($data['email'], $data['name']);
            });
        } catch (\Exception $e) {
            Log::error('Appointment email failed: ' . $e->getMessage());
            return back()->with('error', 'Unable to send your appointment request. Please try again later or contact us directly.');
        }

        return back()->with('success', 'Appointment submitted successfully! We will contact you soon.');
    }

    /**
     * Get recipient email from contact_settings, fallback to .env
     */
    private function getRecipientEmail(): ?string
    {
        // First try: Customize > Contact Info > contact_email
        $contactEmail = Setting::where('setting_group', 'contact_settings')
            ->where('setting_key', 'contact_email')
            ->value('setting_value');

        if (!empty($contactEmail)) {
            return $contactEmail;
        }

        // Fallback: .env MAIL_FROM_ADDRESS
        return config('mail.from.address');
    }
}
