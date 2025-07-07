// pages/api/auth/callback.js
// import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

export default async function handler(req, res) {
    const { code } = req.query;
    console.log(code)

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing.' });
    }

    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: code,
    });

    try {
        const response = await fetch('https://accounts.zoho.in/oauth/v2/token', { // Use .in for India
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        const data = await response.json();

        if (data.error) {
            console.error('Token exchange error:', data);
            return res.status(400).json({ 
                error: data.error_description || 'Error exchanging code for token', 
                details: data 
            });
        }

        const { access_token, refresh_token, expires_in } = data;

        if (!refresh_token) {
            console.warn('No refresh token received. Ensure prompt=consent is set and scopes are correct.');
        }

        // **Store Tokens Securely**
        const storedTokens = await prisma.token.upsert({
            where: { id: 1 },
            update: {
                access_token,
                refresh_token: refresh_token || '', // Handle missing refresh_token
                expires_in,
                obtained_at: new Date(),
            },
            create: {
                id: 1,
                access_token,
                refresh_token: refresh_token || '', // Handle missing refresh_token
                expires_in,
                obtained_at: new Date(),
            },
        });

        res.status(200).json({
            message: 'Authentication successful. Tokens stored securely.',
            tokens: storedTokens,
        });
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}