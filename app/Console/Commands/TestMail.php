<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMail extends Command
{
    /**
     * php artisan mail:test you@example.com
     */
    protected $signature = 'mail:test {to : Recipient email address}';

    protected $description = 'Send a test email and print the exact SMTP error if it fails (diagnostic).';

    public function handle(): int
    {
        $to = $this->argument('to');

        // Show the mail config actually in use (so you can confirm settings are loaded,
        // not just written to .env). If any of these are blank, config cache is stale —
        // run: php artisan config:clear
        $this->info('Mailer config in use:');
        $this->line('  MAIL_MAILER    : ' . config('mail.default'));
        $this->line('  MAIL_HOST      : ' . config('mail.mailers.smtp.host'));
        $this->line('  MAIL_PORT      : ' . config('mail.mailers.smtp.port'));
        $this->line('  MAIL_ENCRYPTION: ' . config('mail.mailers.smtp.encryption'));
        $this->line('  MAIL_USERNAME  : ' . config('mail.mailers.smtp.username'));
        $this->line('  MAIL_PASSWORD  : ' . (config('mail.mailers.smtp.password') ? '(set)' : '(EMPTY)'));
        $this->line('  MAIL_FROM      : ' . config('mail.from.address'));
        $this->newLine();

        try {
            Mail::raw('VICS-AI SMTP test message. If you received this, mail is working.', function ($m) use ($to) {
                $m->to($to)->subject('VICS-AI SMTP Test');
            });
            $this->info("OK: test email sent to {$to}. Check the inbox (and spam).");
            return self::SUCCESS;
        } catch (\Throwable $e) {
            $this->error('SEND FAILED — exact error below:');
            $this->error(get_class($e) . ': ' . $e->getMessage());
            return self::FAILURE;
        }
    }
}
