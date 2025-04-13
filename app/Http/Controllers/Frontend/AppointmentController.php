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
            'company_name' => 'nullable|string',
            'no_of_vehicles' => 'required|integer|min:1',
            'vehicle_registration' => 'required|string',
            'name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $data = $request->all();

        // Send email
        Mail::send('appointment', $data, function ($message) use ($data) {
            $message->to('recipient@example.com') // Replace with your recipient email
                ->subject('New Appointment Request');
        });

        // Return JSON response
        return back()->with('success', 'Message successfully send');
          }
}
