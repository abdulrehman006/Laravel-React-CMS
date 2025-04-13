<?php

namespace App\Http\Controllers;

class DebugController extends Controller
{
    public function any()
    {
       $data = [
            "intent" => "CAPTURE",
            "purchase_units" => [[
                "reference_id" => rand(000000, 999999),
                "amount" => [
                    "value" => number_format(100, 2, '.', ''),
                    "currency_code" => "USD",
                ]
            ]],
            "application_context" => [
                "cancel_url" => "https://arino-laravel.test/cancel",
                "return_url" => "https://arino-laravel.test/success",
            ]
        ];
    }
}
