<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TeamStoreRequest;
use App\Http\Requests\Admin\TeamUpdateRequest;
use App\Models\Team;
use App\Repositories\Admin\TeamRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    /**
     * Get teams
     */
    public function index(Request $request, TeamRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'name';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['teams'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Teams/Index', $data);
    }

    /**
     * Create team
     */
    public function create(): Response
    {
        return Inertia::render('Teams/Create');
    }

    /**
     * Store team
     */
    public function store(TeamStoreRequest $request, TeamRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.teams.index')->with('success', 'Team successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Edit team
     */
    public function edit(Team $team): Response
    {
        $data['team'] = $team;

        return Inertia::render('Teams/Edit', $data);
    }

    /**
     * Update team
     */
    public function update(TeamUpdateRequest $request, Team $team, TeamRepository $repository): RedirectResponse
    {
        $repository->update($request, $team);

        return redirect()->route('admin.teams.index')->with('success', 'Team successfully updated');
    }

    /**
     * Delete team
     */
    public function destroy(Team $team, TeamRepository $repository): RedirectResponse
    {
        $repository->destroy($team);

        return back()->with('success', 'Team successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, TeamRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected team successfully deleted');
    }
}
