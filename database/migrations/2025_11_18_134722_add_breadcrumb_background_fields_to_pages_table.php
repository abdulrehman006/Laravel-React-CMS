<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->string('breadcrumb_bg_type')->default('image')->after('is_show_breadcrumb');
            $table->string('breadcrumb_bg_image')->nullable()->after('breadcrumb_bg_type');
            $table->string('breadcrumb_bg_color')->default('#000000')->after('breadcrumb_bg_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn(['breadcrumb_bg_type', 'breadcrumb_bg_image', 'breadcrumb_bg_color']);
        });
    }
};
