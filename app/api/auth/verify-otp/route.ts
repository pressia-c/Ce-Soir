import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { phone, token } = await req.json();
  if (!phone || !token) return NextResponse.json({ error: 'Phone and token required' }, { status: 400 });

  const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ session: data.session, user: data.user });
}
