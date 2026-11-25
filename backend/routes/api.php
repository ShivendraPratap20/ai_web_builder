<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

Route::post('/receive-data', function (Request $request) {

    $data = $request->all();

    // Print received data in Laravel log
    Log::info('Received JSON Data:', $data);

    // Print data in terminal
    dump($data);

    return response()->json([
        'success' => true,
        'message' => 'Data received successfully',
        'data' => $data
    ]);
});