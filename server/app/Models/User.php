<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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

    protected $appends = [
        'prevBalance',
        'curBalance',
    ];

    protected function __construct()
    {
    }

    protected function prevBalance(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->balances()->where('name', 'prev_balance')->first(),
        );
    }

    protected function curBalance(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->balances()->where('name', 'cur_balance')->first(),
        );
    }

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
        static::created(function ($user) {
            $user->balances()->create([
                'name' => 'prev_balance',
                'amount' => 0,
            ]);

            $user->balances()->create([
                'name' => 'cur_balance',
                'amount' => 0,
            ]);
        });
    }

    // Profile related relations
    // A user can have many linked social accounts
    public function socialAccounts(): HasMany
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function payingMoney(): HasMany
    {
        return $this->hasMany(PayingMoney::class);
    }

    public function balances(): HasMany
    {
        return $this->hasMany(Balance::class);
    }

    public function earningMoney(): HasMany
    {
        return $this->hasMany(EarningMoney::class);
    }

    public function earningTargets(): HasMany
    {
        return $this->hasMany(EarningTarget::class);
    }

    public function savingMoney(): HasMany
    {
        return $this->hasMany(SavingMoney::class);
    }

    public function savingTargets(): HasMany
    {
        return $this->hasMany(SavingTarget::class);
    }
}
