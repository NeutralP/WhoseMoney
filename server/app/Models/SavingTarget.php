<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavingTarget extends Model
{
    use HasFactory;

    protected $table = 'saving_targets';

    protected $fillable = [
        'user_id',
        'target',
        'month',
        'year',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
