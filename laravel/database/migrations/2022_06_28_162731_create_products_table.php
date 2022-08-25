<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('keyname');
            $table->string('name');
            $table->mediumText('description')->nullable();
            $table->tinyInteger('active')->default(0);
            $table->tinyInteger('approved')->default(0);
            $table->bigInteger('quantity');
            $table->integer('price');
            $table->string('photo')->nullable();

            $table->bigInteger('category_id')->unsigned()->index();
            $table->foreign('category_id')->references('id')->on('categories');
            $table->bigInteger('shop_id')->unsigned()->index();
            $table->foreign('shop_id')->references('id')->on('shops');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
