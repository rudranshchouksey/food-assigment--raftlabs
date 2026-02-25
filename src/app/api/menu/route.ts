import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const menuItems = await prisma.menuItem.findMany();
  return NextResponse.json(menuItems);
}