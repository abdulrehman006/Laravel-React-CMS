<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\NotificationRepository;
use App\Http\Requests\Admin\NotificationStoreRequest;
use App\Http\Requests\Admin\NotificationUpdateRequest;
use App\Models\Currency;
use Illuminate\Http\Request;
use App\Models\Notification;
use Inertia\Response;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Notification $notification, NotificationRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'created_at';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['notifications'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Notification/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Notification/Create');
    }

    /**
     * Store new post
     */
    public function store(NotificationStoreRequest $request, NotificationRepository $repository)
    {
        $repository->create($request);
        return redirect()->route('admin.notifications.index')->with('success', 'Notification successfully created');
    }

    /**
     * Show the form for edit notification
     */
    public function edit(Notification $notification): Response
    {
        $data['edited_notification'] = $notification;
        return Inertia::render('Notification/Edit', $data);
    }

    /**
     * Update notification
     */
    public function update(NotificationUpdateRequest $request, Notification $notification, NotificationRepository $repository)
    {
        $repository->update($request, $notification);
        return redirect()->route('admin.notifications.index')->with('success', 'Notification successfully updated!');
    }

    /**
     * Delete notification
     */
    public function destroy(Notification $notification, NotificationRepository $repository)
    {
        $repository->destroy($notification);
        return back()->with('success', 'Notification successfully deleted!');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, NotificationRepository $repository)
    {
        $repository->bulkDelete($request->ids);
        return back()->with('success', 'Notification successfully deleted!');
    }

}
