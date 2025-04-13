<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Portfolio show
     */
    public function show($slug): Response
    {
        $data['portfolio'] = Portfolio::where('slug', $slug)->first();
        if ($data['portfolio']) {
            $data['nextPortfolio'] = Portfolio::where('id', '>', $data['portfolio']->id)
                ->orderBy('id', 'asc')
                ->first();

            $data['prevPortfolio'] = Portfolio::where('id', '<', $data['portfolio']->id)
                ->orderBy('id', 'asc')
                ->first();

            return Inertia::render('Portfolios/PortfolioDetailsPage', $data);
        }
        abort(404);
    }
}
