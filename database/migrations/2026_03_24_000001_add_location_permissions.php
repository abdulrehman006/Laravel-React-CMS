<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        $actions = ['index', 'create', 'edit', 'delete'];

        foreach ($actions as $action) {
            Permission::firstOrCreate(
                ['name' => "locations.{$action}", 'guard_name' => 'web'],
                [
                    'title' => 'Manage locations',
                    'crud_group' => 'locations',
                    'crud_action' => $action,
                ]
            );
        }

        // Grant all location permissions to admin role
        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole) {
            $adminRole->givePermissionTo(
                Permission::where('crud_group', 'locations')->get()
            );
        }
    }

    public function down(): void
    {
        Permission::where('crud_group', 'locations')->delete();
    }
};
