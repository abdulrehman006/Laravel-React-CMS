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
            $searchValue = trim($request->input('searchValue'));

            // Trim the search value (keep dashes intact for regNo like LET-15-8676)
            $searchValue = trim($searchValue);

            // Encode spaces as %20 for the external API
            $encodedValue = rawurlencode($searchValue);

            // Hardcoded API URL
            $apiUrl = 'http://52.58.102.77:22110/api/FeeStructure';
            $fullUrl = $apiUrl . '?' . $searchType . '=' . $encodedValue;

            Log::info('Fee Calculator Request', [
                'searchType' => $searchType,
                'searchValue' => $searchValue,
                'apiUrl' => $fullUrl
            ]);

            // Make request to external API with better error handling
            $response = Http::timeout(30)
                ->withHeaders([
                    'Accept' => 'application/json',
                ])
                ->get($fullUrl);

            Log::info('Fee Calculator Response', [
                'status' => $response->status(),
                'successful' => $response->successful(),
                'body_length' => strlen($response->body())
            ]);

            // Check if request was successful
            if ($response->successful()) {
                $data = $response->json();

                // Check if data is empty
                if (empty($data) || (is_array($data) && count($data) === 0)) {
                    return response()->json([
                        'error' => 'No data found',
                        'message' => 'No fee structure found for the provided ' .
                                   ($searchType === 'regNo' ? 'registration number' : 'chassis number') . '.'
                    ], 404);
                }

                return response()->json($data);
            }

            // Handle specific error status codes
            $statusCode = $response->status();

            if ($statusCode === 404) {
                return response()->json([
                    'error' => 'Not found',
                    'message' => 'No fee data found for the provided ' .
                               ($searchType === 'regNo' ? 'registration number' : 'chassis number') . '.'
                ], 404);
            }

            if ($statusCode === 400) {
                return response()->json([
                    'error' => 'Bad request',
                    'message' => 'Invalid ' . ($searchType === 'regNo' ? 'registration number' : 'chassis number') .
                               '. Please check the format and try again.'
                ], 400);
            }

            // Handle other API errors
            Log::error('Fee Calculator API Error Response', [
                'status' => $statusCode,
                'body' => $response->body()
            ]);

            return response()->json([
                'error' => 'API request failed',
                'message' => 'The fee calculation service returned an error. Please try again later.',
                'details' => $response->body()
            ], $statusCode);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'message' => $e->errors()
            ], 422);
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            Log::error('Fee Calculator Connection Error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Connection error',
                'message' => 'Cannot connect to the fee calculation server. Please try again later.'
            ], 503);
        } catch (\Illuminate\Http\Client\RequestException $e) {
            Log::error('Fee Calculator Request Error: ' . $e->getMessage());

            return response()->json([
                'error' => 'Request error',
                'message' => 'Failed to communicate with the fee calculation service. Please try again.'
            ], 500);
        } catch (\Exception $e) {
            Log::error('Fee Calculator Unexpected Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Internal server error',
                'message' => 'An unexpected error occurred. Please try again later.'
            ], 500);
        }
    }
}
