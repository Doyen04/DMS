// hooks/useUser.ts
"use client";
import { getSession } from "@/action/getSession";
import { useEffect } from "react";
import useUserAuth from "./useUserAuth";


export function useUser() {
    const { session, setSession,logout, isAuthenticated } = useUserAuth();

    useEffect(() => {
        let mounted = true;
        getSession()
            .then(sessionData => {
                if (mounted) setSession(sessionData);
            })
            .catch(error => {
                console.error('Failed to get session:', error);
                if (mounted) setSession(null);
            });

        return () => { mounted = false };
    }, [setSession]);

    return { session, isAuthenticated, logout };
}
