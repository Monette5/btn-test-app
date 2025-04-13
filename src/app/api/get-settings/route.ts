import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('GET /api/get-settings called');

  const instance = req.nextUrl.searchParams.get('instance');
  console.log('Backend received instance:', instance);

  if (!instance) {
    console.error('Missing instance token');
    return NextResponse.json({ error: 'Missing instance' }, { status: 400 });
  }

  // Decode the instance token
  try {
    const decodedInstance = Buffer.from(instance.split('.')[1], 'base64').toString('utf-8');
    const instanceData = JSON.parse(decodedInstance);
    console.log('Decoded instance data:', instanceData);

    const instanceId = instanceData.instanceId;

    // Simulate fetching settings from a database
    console.log('Getting settings for', instanceId);

    const settings = {
      text: 'Click Me!',
      color: '#ff0077',
      size: 'md',
      effect: 'wave',
    };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error decoding instance token:', error);
    return NextResponse.json({ error: 'Invalid instance token' }, { status: 400 });
  }
}