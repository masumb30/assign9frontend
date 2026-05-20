"use server";

import { redirect } from "next/navigation";


export async function signupAction(prevState, formData) {
    console.log('form data: ', formData)

    // Basic validation check
    if (!formData.email || !formData.password || !formData.username) {
        return {
            success: false,
            message: "All fields are required.",
        };
    }

    try {
        // Hitting your external API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email, password: formData.password, username: formData.username, photoUrl: formData.photoUrl }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Something went wrong during signup.",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to connect to the server. Please try again later.",
        };
    }

    redirect("/login");
}


