<?php
// Temporary cache clearing script
// DELETE THIS FILE after use for security!

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

echo "<h1>Clearing Caches...</h1>";

// Clear caches
$kernel->call('cache:clear');
echo "<p>✓ Cache cleared</p>";

$kernel->call('config:clear');
echo "<p>✓ Config cache cleared</p>";

$kernel->call('view:clear');
echo "<p>✓ View cache cleared</p>";

$kernel->call('route:clear');
echo "<p>✓ Route cache cleared</p>";

$kernel->call('optimize:clear');
echo "<p>✓ Optimization cache cleared</p>";

echo "<h2 style='color: green;'>All caches cleared successfully!</h2>";
echo "<p style='color: red;'><strong>IMPORTANT: Delete this file (clear-cache-script.php) immediately for security!</strong></p>";
