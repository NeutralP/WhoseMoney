<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'phone_number',
        'date_of_birth',
        'address',
        'username',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    // Get called when we boot up the model?
    protected static function boot()
    {
        parent::boot();

        // Fires an event everytime a new user is created
        // Eloquent model event
        // static::created(function ($user) {
        // });
    }

    // Profile related relations
    // A user can have many linked social accounts
    public function socialAccounts(): HasMany
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function category(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function payingMoney(): HasMany
    {
        return $this->hasMany(PayingMoney::class);
    }

    public function balance(): HasMany
    {
        return $this->hasMany(Balance::class);
    }

    public function earningMoney(): HasMany
    {
        return $this->hasMany(EarningMoney::class);
    }

    public function earningTarget(): HasMany
    {
        return $this->hasMany(EarningTarget::class);
    }

    public function savingMoney(): HasMany
    {
        return $this->hasMany(SavingMoney::class);
    }

    public function savingTarget(): HasMany
    {
        return $this->hasMany(SavingTarget::class);
    }
}
