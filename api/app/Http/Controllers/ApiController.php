<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    private function accessMovies($path)
    {
        $movies = json_decode(file_get_contents(storage_path($path)), true);
        return $movies;
    }
    public function index()
    {
        $path = 'movies.json';
        $movies = $this->accessMovies($path);
        return  $movies;
    }

public function movie(Request $request){
    $path = 'movies.json';
    $movie=null;
    $data = $this->accessMovies($path);
    foreach ($data as $item) {
        if ($item["id"] == $request->id) {
            $movie = $item;
        }
    }
    return $movie;
}

}
