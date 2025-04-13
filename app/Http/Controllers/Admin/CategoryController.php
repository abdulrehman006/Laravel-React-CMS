<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Categories\CategoryStoreRequest;
use App\Http\Requests\Admin\Categories\CategoryUpdateRequest;
use App\Models\Category;
use App\Repositories\Admin\CategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Apply permission
     */
    public function __construct()
    {
        $this->middleware('can:post_category.index', ['only' => ['index']]);
        $this->middleware('can:post_category.show', ['only' => ['show']]);
        $this->middleware('can:post_category.create', ['only' => ['create']]);
        $this->middleware('can:post_category.edit', ['only' => ['edit', 'update']]);
        $this->middleware('can:post_category.delete', ['only' => ['delete', 'bulkDelete']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, CategoryRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'title';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Categories/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['categories'] = Category::getSerializedCategories();

        return Inertia::render('Categories/Create', $data);
    }

    /**
     * Store category
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CategoryStoreRequest $request, CategoryRepository $repository)
    {
        $repository->create($request);

        return redirect()->route('admin.categories.index')->with('success', 'Category successfully created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $data['category'] = $category;
        $data['categories'] = Category::getSerializedCategories();

        return Inertia::render('Categories/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdateRequest $request, Category $category, CategoryRepository $repository)
    {
        try {
            $repository->update($request, $category);

            return redirect()->route('admin.categories.index')->with('success', 'Category successfully updated!');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, CategoryRepository $repository)
    {
        try {
            $repository->destroy($category);

            return back()->with('success', 'Category successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    public function bulkDelete(Request $request, CategoryRepository $repository)
    {
        $repository->bulkDelete($request->ids);

        return back()->with('success', 'Category successfully deleted!');
    }
}
