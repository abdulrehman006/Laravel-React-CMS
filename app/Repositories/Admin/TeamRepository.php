<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\TeamStoreRequest;
use App\Http\Requests\Admin\TeamUpdateRequest;
use App\Models\Team;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class TeamRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Team $team;

    /**
     *  Constructor for Team repository
     */
    public function __construct(Team $team)
    {
        $this->model = $team;
    }

    /**
     * Get services
     *
     * @param  array  $filter
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if ($search) {
            $query->orWhere('name', 'like', "%$search%")
                ->orWhere('designation', 'like', "%$search%");
        }

        // sort post
        $query->orderBy($sort['column'], $sort['order']);

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Store team
     */
    public function store(TeamStoreRequest $request): void
    {
        // store image
        $image_path = $request->image->store('team');

        $this->model->create([
            'name' => $request->team_member_name,
            'designation' => $request->team_member_designation,
            'image' => $image_path,
            'facebook_url' => $request->facebook_url,
            'twitter_url' => $request->twitter_url,
            'instagram_url' => $request->instagram_url,
            'linkedin_url' => $request->linkedin_url,
        ]);
    }

    /**
     * Delete team
     */
    public function destroy(Team $team): void
    {
        $team->delete();
    }

    /**
     * Bulk team delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    public function update(TeamUpdateRequest $request, Team $team): void
    {
        if (is_file($request->image)) {
            $image_path = $request->image->store('image');
            $team->update(['image' => $image_path]);
        }

        $team->update([
            'name' => $request->team_member_name,
            'designation' => $request->team_member_designation,
            'facebook_url' => $request->facebook_url,
            'twitter_url' => $request->twitter_url,
            'instagram_url' => $request->instagram_url,
            'linkedin_url' => $request->linkedin_url,
        ]);
    }
}
