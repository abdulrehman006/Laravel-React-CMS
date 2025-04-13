<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\CaseStudy;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudyController extends Controller
{
    /**
     * Show case study
     */
    public function show($slug): Response
    {
        $data['caseStudy'] = CaseStudy::where('slug', $slug)->first();
        if ($data['caseStudy']) {
            return Inertia::render('CaseStudy/CaseStudyDetailsPage', $data);
        }
        abort(404);
    }
}
