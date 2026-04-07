import { fetchAuthSession } from 'aws-amplify/auth';

const API_ENDPOINT = process.env.NEXT_PUBLIC_AWS_API_ENDPOINT;

async function getAuthHeaders(): Promise<Record<string, string>> {
    try {
        const { tokens } = await fetchAuthSession();
        const idToken = tokens?.idToken?.toString();
        return {
            'Authorization': idToken || '',
            'Content-Type': 'application/json',
        };
    } catch (error) {
        console.error('Error fetching auth session:', error);
        return {
            'Authorization': '',
            'Content-Type': 'application/json',
        };
    }
}

export const api = {
    async get<T>(path: string): Promise<T> {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_ENDPOINT}${path}`, {
            method: 'GET',
            headers,
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async post<T>(path: string, body: any): Promise<T> {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_ENDPOINT}${path}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async put<T>(path: string, body: any): Promise<T> {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_ENDPOINT}${path}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async delete<T>(path: string): Promise<T> {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_ENDPOINT}${path}`, {
            method: 'DELETE',
            headers,
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async uploadFile(signedUrl: string, file: File): Promise<void> {
        const response = await fetch(signedUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to upload file to S3: ${response.statusText}`);
        }
    },
};
