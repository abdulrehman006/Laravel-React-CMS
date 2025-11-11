<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FeeCalculatorController extends Controller
{
    /**
     * Proxy request to the VICS Fee Structure API
     * This bypasses CORS restrictions by making the request server-side
     */
    public function getFeeStructure(Request $request)
    {
        try {
            // Validate input
            $request->validate([
                'searchType' => 'required|in:regNo,chassisNo',
                'searchValue' => 'required|string|max:255',
            ]);

            $searchType = $request->input('searchType');
            $searchValue = $request->input('searchValue');

            // Get API URL from settings or use default
            $apiUrl = config('app.vics_api_url', 'http://3.79.101.195:22110/api/FeeStructure');

            // Make request to external API
            $response = Http::timeout(30)
                ->get($apiUrl, [
                    $searchType => $searchValue
                ]);

            // Check if request was successful
            if ($response->successful()) {
                return response()->json($response->json());
            }

            // Handle API errors
            return response()->json([
                'error' => 'API request failed',
                'message' => $response->body(),
                'status' => $response->status()
            ], $response->status());

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'message' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Fee Calculator API Error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Internal server error',
                'message' => 'Failed to fetch fee data. Please try again later.'
            ], 500);
        }
    }
}
