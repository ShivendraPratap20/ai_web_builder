<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'userID' => strtolower((string) $this->input('userID')),
        ]);
    }

    public function rules(): array
    {
        return [
            'userID'   => ['required', 'email', 'max:254'],
            'password' => ['required', 'string', 'max:128'],
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'status'  => false,
            'message' => 'Invalid login data',
            'errors'  => [
                'formErrors'  => [],
                'fieldErrors' => $validator->errors()->toArray(),
            ],
        ], 400));
    }
}