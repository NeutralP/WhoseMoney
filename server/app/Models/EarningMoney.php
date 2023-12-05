<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EarningMoney extends Model
{
    use HasFactory;

    protected $table = 'earning_money';

    protected $fillable = [
        'user_id',
        'name',
        'amount',
        'prev_balance',
        'new_balance',
        'date',
        'source',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
