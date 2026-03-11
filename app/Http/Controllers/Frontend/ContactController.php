<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\ContactSubmitRequest;
use App\Models\Setting;
use App\Repositories\Admin\ContactRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Submit contact and send email notification
     */
    public function submitContact(ContactSubmitRequest $request, ContactRepository $repository): RedirectResponse
    {
        // Store in database
        $repository->submitContact($request);

        // Get ticket ID for the email
        $latestContact = \App\Models\Contact::latest()->first();
        $ticketId = $latestContact ? $latestContact->ticket_id : 'N/A';

        // Prepare email data (use 'user_message' to avoid Laravel Mail $message conflict)
        $emailData = [
            'name' => $request->name,
            'email' => $request->email,
            'project_type' => $request->project_type,
            'mobile_number' => $request->mobile_number,
            'user_message' => $request->message,
            'ticket_id' => $ticketId,
        ];

        // Get recipient email: Customize > Contact Info → fallback to .env
        $recipientEmail = $this->getRecipientEmail();

        if ($recipientEmail) {
            try {
                Mail::send('emails.contact', $emailData, function ($mail) use ($emailData, $recipientEmail) {
                    $mail->to($recipientEmail)
                        ->subject('New Contact Message - #' . $emailData['ticket_id'] . ' - ' . $emailData['name'])
                        ->replyTo($emailData['email'], $emailData['name']);
                });
            } catch (\Exception $e) {
                Log::error('Contact email failed: ' . $e->getMessage());
            }
        } else {
            Log::warning('Contact email not sent: No recipient email configured in Customize > Contact Info or .env MAIL_FROM_ADDRESS');
        }

        return back()->with('success', 'Message successfully sent.');
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
