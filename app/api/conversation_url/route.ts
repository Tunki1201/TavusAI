import { NextResponse } from 'next/server';

export const POST = async (req: Request) => { // Note: `req` is now of type `Request`
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const options = {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ replica_id: process.env.NEXT_PUBLIC_REPLICA_ID}),
    };

    const response = await fetch('https://tavusapi.com/v2/conversations', options);

    console.log('--------------This is an error------', response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data); // Use NextResponse.json()

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
};