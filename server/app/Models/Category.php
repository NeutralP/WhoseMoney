<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'user_id',
    ];

    protected $appends = [
        'pay_limit',
        'total_pay',
        'pay_list',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function ($category) {
            $category->payingLimits()->create([
                'limit' => 0,
                'month' => Carbon::now()->month,
                'year' => Carbon::now()->year,
            ]);
        });
    }

    protected function payLimit(): Attribute
    {
        return new Attribute(function () {
            return $this->payingLimits()->get();
        });
    }

    protected function totalPay(): Attribute
    {
        return new Attribute(function () {
            return $this->payingMoney()->sum('amount');
        });
    }

    protected function payList(): Attribute
    {
        return new Attribute(function () {
            return $this->payingMoney()->get();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function payingLimits(): HasMany
    {
        return $this->hasMany(PayingLimit::class);
    }

    public function payingMoney(): HasMany
    {
        return $this->hasMany(PayingMoney::class);
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }
}
