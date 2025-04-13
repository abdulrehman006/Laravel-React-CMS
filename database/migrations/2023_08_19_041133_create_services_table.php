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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->unsignedBigInteger('category_id');
            $table->string('slug', 255);
            $table->string('icon_box_title', 255);
            $table->string('icon_box_sub_title', 255);
            $table->string('thumbnail_image', 255);
            $table->text('icon_box')->nullable();
            $table->string('info_thumbnail_image', 255)->nullable();
            $table->string('info_title', 255)->nullable();
            $table->text('info_list')->nullable();
            $table->text('sections')->nullable();
            $table->longText('sections_data')->nullable();
            $table->tinyInteger('is_show_breadcrumb')->default(0);
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_tags', 255)->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_image', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
