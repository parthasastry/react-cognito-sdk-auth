import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand,
    ConfirmSignUpCommand,
    ForgotPasswordCommand,
    ConfirmForgotPasswordCommand
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../../config.json";

export const cognitoClient = new CognitoIdentityProviderClient({
    region: config.region,
});

export const signIn = async (email, password) => {
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: config.clientId,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    };
    try {
        const command = new InitiateAuthCommand(params);
        const { AuthenticationResult } = await cognitoClient.send(command);
        if (AuthenticationResult) {
            sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
            sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
            sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
            return AuthenticationResult;
        }
    } catch (error) {
        console.error("Error signing in: ", error);
        throw error;
    }
};

export const signUp = async (email, password, name, phone_number) => {
    const params = {
        ClientId: config.clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: "email", Value: email },
            { Name: "name", Value: name },
            { Name: "phone_number", Value: phone_number },
        ],
    };
    try {
        const command = new SignUpCommand(params);
        const response = await cognitoClient.send(command);
        console.log("Sign up success: ", response);
        return response;
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
};

export const confirmSignUp = async (username, code) => {
    const params = {
        ClientId: config.clientId,
        Username: username,
        ConfirmationCode: code,
    };
    try {
        const command = new ConfirmSignUpCommand(params);
        await cognitoClient.send(command);
        console.log("User confirmed successfully");
        return true;
    } catch (error) {
        console.error("Error confirming sign up: ", error);
        throw error;
    }
};

export const signInToken = async (email, refreshToken) => {
    const params = {
        AuthFlow: "REFRESH_TOKEN_AUTH",
        ClientId: config.clientId,
        AuthParameters: {
            USERNAME: email,
            REFRESH_TOKEN_AUTH: refreshToken,
        },
    };
    try {
        const command = new InitiateAuthCommand(params);
        const { AuthenticationResult } = await cognitoClient.send(command);
        if (AuthenticationResult) {
            sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
            sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
            sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
            return AuthenticationResult;
        }
    } catch (error) {
        console.error("Error signing in: ", error);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    console.log(email)
    const params = {
        ClientId: config.clientId,
        Username: email,
    };
    try {
        const command = new ForgotPasswordCommand(params);
        const response = await cognitoClient.send(command);
        console.log("response: ", response)
        return true;
    } catch (error) {
        console.error("Error in forgot password: ", error);
        throw error;
    }
}

export const resetPassword = async (email, code, password) => {

    console.log("email: ", email)
    console.log("code: ", code)
    console.log("password: ", password)
    
    const params = {
        ClientId: config.clientId,
        Username: email,
        ConfirmationCode: code,
        Password: password,
    };
    try {
        const command = new ConfirmForgotPasswordCommand(params);
        await cognitoClient.send(command);
        console.log("User reset confirmed successfully");
        return true;
    } catch (error) {
        console.error("Error confirming resetting password: ", error);
        throw error;
    }
};