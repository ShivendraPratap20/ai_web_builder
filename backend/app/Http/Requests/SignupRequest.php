<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class SignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    // Equivalent of Yup's .transform(email => email.toLowerCase())
    protected function prepareForValidation(): void
    {
        $this->merge([
            'userID' => strtolower((string) $this->input('userID')),
            'email'  => strtolower((string) $this->input('email')),
        ]);
    }

    public function rules(): array
    {
        return [
            'userName'        => ['required', 'string', 'min:5', 'max:30'],
            'userID'          => ['required', 'email', 'max:254'],
            'email'           => ['required', 'email', 'max:254'],
            'phoneNumber'     => ['required', 'regex:/^[0-9]{10}$/'],
            'password'        => [
                'required', 'string', 'min:8', 'max:128',
                'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
            ],
            'confirmPassword' => ['required', 'same:password'],
            'profilePicture'  => ['nullable', 'string', 'max:255'],
            'accountType'     => ['nullable', 'string', 'max:50'],
            'authorizationType' => ['nullable', 'string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'userName.min'        => 'Name must be at least 5 characters',
            'userName.max'        => 'User name must be at most 30 characters long',
            'phoneNumber.regex'   => 'Phone number must be 10 digits',
            'password.regex'      => 'Password must include letters, numbers, and special characters',
            'confirmPassword.same' => 'Passwords must match',
        ];
    }

    // Match your Express error shape (400 + flattened errors) instead of Laravel's default 422
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'status'  => false,
            'message' => 'Invalid user data',
            'errors'  => [
                'formErrors'  => [],
                'fieldErrors' => $validator->errors()->toArray(),
            ],
        ], 400));
    }
}