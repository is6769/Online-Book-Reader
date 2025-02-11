package com.example.onlinebookreader.payloads;

public record UserCredentialsForRegistrationPayload(
        String username,
        String email,
        String password
) {
}
