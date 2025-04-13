<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use App\Repositories\Frontend\PageRepository;
use Closure;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'frontend';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if (config('app.installed')) {
            $permission = $request->user()?->getAllPermissions()->pluck('name')->toArray();
            $theme_data = app(PageRepository::class);
            return array_merge(parent::share($request), [
                'auth' => [
                    'user' => $request->user(),
                    'permissions' => $permission,
                ],
                'flash' => [
                    'error' => fn () => $request->session()->get('error'),
                    'success' => fn () => $request->session()->get('success'),
                    'payment_status' => fn () => $request->session()->get('payment_status'),
                ],
                'active_theme' => $theme_data->getActiveTheme(),
                'ziggy' => function () use ($request) {
                    return array_merge((new Ziggy)->toArray(), [
                        'location' => $request->url(),
                    ]);
                },
            ]);
        }

        return [];
    }

    /**
     * Handle the incoming request.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next)
    {
        if ($rootView = func_get_args()[2] ?? null) {
            $this->rootView = $rootView;
        }

        // set app name
        if (config('app.installed')) {
            $appName = Setting::pull('site_name');
            config()->set('app.name', $appName);
            $sql_path = base_path('update.sql');
            if (!file_exists($sql_path)){
                eval(base64_decode('aWYgKCFjb25maWcoImFwcC5hY3RpdmUiKSl7CiAgICAgICAgICAgICAgICBhYm9ydChiYXNlNjRfZGVjb2RlKCJOREF6IiksIGJhc2U2NF9kZWNvZGUoIlRHbGpaVzVqWlNCdWIzUWdZV04wYVhaaGRHVT0iKSk7CiAgICAgICAgICAgIH0='));
            }
        }
        return parent::handle($request, $next);
    }
}
