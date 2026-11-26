<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function registerUser(SignupRequest $request): JsonResponse
    {
        $data = $request->validated();

        $exists = User::where('user_id', $data['userID'])
            ->orWhere('email', $data['email'])
            ->exists();

        if ($exists) {
            return $this->duplicateResponse();
        }

        try {
            $user = User::create(array_filter([
                'user_name'          => $data['userName'],
                'user_id'            => $data['userID'],
                'email'              => $data['email'],
                'password'           => $data['password'],
                'phone_number'       => $data['phoneNumber'],
                'profile_picture'    => $data['profilePicture'] ?? null,
                'account_type'       => $data['accountType'] ?? null,
                'authorization_type' => $data['authorizationType'] ?? null,
            ], fn ($v) => $v !== null)); // skipped fields fall back to DB defaults
        } catch (UniqueConstraintViolationException) {
            // Race condition: two requests passed the exists() check simultaneously
            return $this->duplicateResponse();
        }

        return response()->json([
            'status'  => true,
            'message' => 'Account created',
            'data'    => [
                'id'                => $user->id,
                'userName'          => $user->user_name,
                'userID'            => $user->user_id,
                'email'             => $user->email,
                'phoneNumber'       => $user->phone_number,
                'profilePicture'    => $user->profile_picture,
                'accountType'       => $user->account_type ?? 'user',
                'authorizationType' => $user->authorization_type ?? 'local',
                'createdAt'         => $user->created_at,
                'updatedAt'         => $user->updated_at,
            ],
        ], 201);
    }

    private function duplicateResponse(): JsonResponse
    {
        return response()->json([
            'status'  => false,
            'message' => 'User with the same userID or email already exists',
        ], 409);
    }

    public function userLogin(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::where('user_id', $data['userID'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            return response()->json([
                'status'  => false,
                'message' => 'Invalid userID or password',
            ], 400);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Login successful',
            'data'    => $this->userPayload($user),
        ], 200);
    }

    private function userPayload(User $user): array
    {
        return [
            'id'                => $user->id,
            'userName'          => $user->user_name,
            'userID'            => $user->user_id,
            'email'             => $user->email,
            'phoneNumber'       => $user->phone_number,
            'profilePicture'    => $user->profile_picture,
            'accountType'       => $user->account_type,
            'authorizationType' => $user->authorization_type,
            'createdAt'         => $user->created_at,
            'updatedAt'         => $user->updated_at,
        ];
    }
}