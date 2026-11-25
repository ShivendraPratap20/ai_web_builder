<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/post/subpost', function () {
    echo 'Subpost';
});

Route::get('/{id}', function ($id) {
    echo 'ID: '.$id;
});

Route::post('/receive-data', function (Request $request) {

    $data = $request->all();

    \Log::info('Received JSON Data:', $data);

    // Print data in terminal
    dump($data);

    return response()->json([
        'success' => true,
        'message' => 'Data received successfully',
        'data' => $data
    ], 200);
});