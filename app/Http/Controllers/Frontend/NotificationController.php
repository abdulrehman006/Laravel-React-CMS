<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\NotificationStoreRequest;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{

    public function index()
    {
        $data['notifications'] = Notification::get();
        return Inertia::render('Notification/Index', $data);
    }

    /**
     *  show Pricing Plan
     */
    // public function show(Notification $notification)
    // {
    //     $data['pricing_plan'] = $notification;
    //     return Inertia::render('Notification/Show', $data);
    // }

}
