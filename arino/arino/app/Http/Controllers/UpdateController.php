<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class UpdateController extends Controller
{
    public function update()
    {
        $sql_path = base_path('update.sql');
        if (file_exists($sql_path)){
            DB::unprepared(file_get_contents($sql_path));
            // Delete the update.sql file
            unlink($sql_path);
            // create symlink
            Artisan::call('storage:link');
            Artisan::call('optimize:clear');
            return redirect('/');
        }
    }
}
