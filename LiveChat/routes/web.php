<?php

use Illuminate\Support\Facades\Route;
use App\Events\testPusher;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/pusher', function () {
    event(new TestPusher());
    return "Event has been sent!";
});