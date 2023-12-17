<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PayingMoney extends Model
{
    use HasFactory;

    protected $table = 'paying_money';

    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'amount',
        'prev_balance',
        'new_balance',
        'date',
    ];

    protected $appends = [];

    // Attributes

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
