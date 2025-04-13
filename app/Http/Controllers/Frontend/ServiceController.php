<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Service details
     */
    public function show($slug): Response
    {
        $data['service'] = Service::where('slug', $slug)->first();
        if ($data['service']) {
            return Inertia::render('Services/ServiceDetailsPage', $data);
        }
        abort(404);
    }
}
