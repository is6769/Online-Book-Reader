package com.example.onlinebookreader.payloads;

public record UserCredentialsForLoginPayload(
        String email,
        String password
) {
}
