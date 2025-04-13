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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 255);
            $table->unsignedTinyInteger('user_id')->comment('User Id, Who published the post');
            $table->unsignedInteger('category_id');
            $table->string('thumbnail_image', 100)->nullable();
            $table->string('title', 255);
            $table->longText('content');
            $table->enum('status', [0, 1])->comment('0 means unpublished, 1 means published')->default(0);
            $table->string('meta_title', 255)->nullable()->comment('meta title for seo');
            $table->string('meta_tags', 255)->nullable();
            $table->string('meta_description', 255)->nullable()->comment('meta description for seo');
            $table->string('meta_image', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
