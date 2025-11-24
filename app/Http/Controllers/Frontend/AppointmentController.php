<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    /**
     * Get contacts
     */
    public function send(Request $request)
    {
        $request->validate([
            'vehicle_type' => 'required|string',
            'date' => 'required|date',
            'company_type' => 'required|in:individual,local,corporate',
            'company_name' => 'required_if:company_type,corporate|nullable|string',
            'location_id' => 'required|exists:locations,id',
            'no_of_vehicles' => 'required|integer|min:1|max:10',
            'vehicle_registration' => 'required|string',
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:100',
            'message' => 'required|string',
        ], [
            'company_type.required' => 'Please select a company type',
            'company_type.in' => 'Invalid company type selected',
            'company_name.required_if' => 'Company name is required for corporate appointments',
            'location_id.required' => 'Please select a preferred station',
            'location_id.exists' => 'The selected station is invalid',
            'no_of_vehicles.min' => 'Number of vehicles must be at least 1',
            'no_of_vehicles.max' => 'Number of vehicles cannot exceed 10',
        ]);

        $data = $request->all();

        // Get location details
        $location = \App\Models\Location::find($request->location_id);
        $data['location_name'] = $location ? ($location->city ?? $location->name) : 'N/A';

        // Send email
        Mail::send('appointment', $data, function ($message) use ($data) {
            $message->to('recipient@example.com') // Replace with your recipient email
                ->subject('New Appointment Request - ' . $data['name']);
        });

        // Return JSON response
        return back()->with('success', 'Appointment submitted successfully! We will contact you soon.');
          }
}
