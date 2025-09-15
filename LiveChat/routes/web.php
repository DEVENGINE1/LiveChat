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

Route::get('/messages',[MessageController::class,'index']);
Route::post('/messages',[MessageController::class,'store']);