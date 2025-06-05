export interface SignInState {
    errors: {
        email?: string[] | undefined;
        password?: string[] | undefined;
    };
    values: {
        email: string | undefined;
        password: string | undefined;
    };
    submitted: boolean;
    success: boolean;
}

export const initialSignInState: SignInState = {
    errors: {
        email: undefined,
        password: undefined,
    },
    values: {
        email: undefined,
        password: undefined,
    },
    submitted: false,
    success: false
}


export interface ResetState {
    error: {
        email?: string[] | undefined;
    };
    values: {
        email: string | undefined;
    };
    submitted: boolean;
    success: boolean;
}
export const initialResetState: ResetState = {
    error: {
        email: undefined,
    },
    values: {
        email: undefined,
    },
    submitted: false,
    success: false
}

export interface SignUpState {
    errors: {
        fullname?: string[] | undefined;
        email?: string[] | undefined;
        password?: string[] | undefined;
    },
    values: {
        fullname: string | undefined;
        email: string | undefined;
        password: string | undefined;
    },
    submitted: boolean,
    success: boolean;
};

export const initialSignUpState: SignUpState = {
    errors: {
        fullname: undefined,
        email: undefined,
        password: undefined,
    },
    values: {
        fullname: undefined,
        email: undefined,
        password: undefined,
    },
    submitted: false,
    success: false
}


export interface ResetPasswordState {
    errors: {
        password?: string[] | undefined;
        confirmPassword?: string[] | undefined;
    },
    values: {
        password: string | undefined;
        confirmPassword: string | undefined;
    },
    submitted: boolean,
    success: boolean;
}
export const initialResetPasswordState: ResetPasswordState = {
    errors: {
        password: undefined,
        confirmPassword: undefined,
    },
    values: {
        password: undefined,
        confirmPassword: undefined,
    },
    submitted: false,
    success: false
}



export interface ResetPasswordProps {
    data: {
        userId: string;
    } | undefined;
}

export interface SearchProps {
    searchParams: Promise<{
        token?: string | undefined;
    }>;
}