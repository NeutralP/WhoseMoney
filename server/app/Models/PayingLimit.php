<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PayingLimit extends Model
{
    use HasFactory;

    protected $table = 'paying_limits';

    protected $fillable = [
        'user_id',
        'limit',
        'month',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
