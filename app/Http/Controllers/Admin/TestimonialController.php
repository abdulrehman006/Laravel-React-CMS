<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TestimonialStoreRequest;
use App\Http\Requests\Admin\TestimonialUpdateRequest;
use App\Models\Testimonial;
use App\Repositories\Admin\TestimonialRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    /**
     * Get testimonial
     */
    public function index(Request $request, TestimonialRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'name';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['testimonials'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Testimonials/Index', $data);
    }

    /**
     * Create team
     */
    public function create(): Response
    {
        return Inertia::render('Testimonials/Create');
    }

    /**
     * Store testimonial
     */
    public function store(TestimonialStoreRequest $request, TestimonialRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Edit testimonial
     */
    public function edit(Testimonial $testimonial): Response
    {
        $data['testimonial'] = $testimonial;

        return Inertia::render('Testimonials/Edit', $data);
    }

    /**
     * Update testimonial
     */
    public function update(TestimonialUpdateRequest $request, Testimonial $testimonial, TestimonialRepository $repository): RedirectResponse
    {
        $repository->update($request, $testimonial);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial successfully updated');
    }

    /**
     * Delete testimonial
     */
    public function destroy(Testimonial $testimonial, TestimonialRepository $repository): RedirectResponse
    {
        $repository->destroy($testimonial);

        return back()->with('success', 'Testimonial successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, TestimonialRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected testimonial successfully deleted');
    }
}
