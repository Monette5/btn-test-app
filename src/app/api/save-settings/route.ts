import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const instance = searchParams.get('instance');

  if (!instance) {
    console.error('Missing instance token');
    return NextResponse.json({ error: 'Missing instance' }, { status: 401 });
  }

  console.log('Received instance:', instance);

  // Decode the instance token (same as GET /api/get-settings)
  try {
    const decodedInstance = Buffer.from(instance.split('.')[1], 'base64').toString('utf-8');
    const instanceData = JSON.parse(decodedInstance);
    console.log('Decoded instance data:', instanceData);

    const { instanceId } = instanceData;

    if (!instanceId) {
      console.error('Invalid instance token: Missing instanceId');
      return NextResponse.json({ error: 'Invalid instance token' }, { status: 401 });
    }

    // Parse the request body
    const body = await req.json().catch(() => null);

    if (!body) {
      console.error('Invalid or missing JSON body');
      return NextResponse.json({ error: 'Invalid or missing JSON body' }, { status: 400 });
    }

    console.log('Received settings:', body);

    // Validate required fields
    if (!body.text || !body.color || !body.size || !body.effect) {
      console.error('Missing required fields in the request body');
      return NextResponse.json({ error: 'Missing required fields in the request body' }, { status: 400 });
    }

    const settings = {
      text: body.text,
      color: body.color,
      size: body.size,
      effect: body.effect,
    };

    console.log(`Saving settings for instance: ${instanceId}`, settings);

    // Simulate saving settings to a database
    // Example: await saveSettingsToDatabase(instanceId, settings);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error decoding instance token:', error);
    return NextResponse.json({ error: 'Invalid instance token' }, { status: 400 });
  }
}