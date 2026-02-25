import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { OrderSchema } from '@/lib/validations';

async function simulateOrderFlow(orderId: string) {
  const flow = [
    { status: "Preparing", delay: 10000 },
    { status: "Out for Delivery", delay: 25000 },
    { status: "Delivered", delay: 40000 }
  ];

  for (const step of flow) {
    await new Promise(r => setTimeout(r, step.delay));
    await prisma.order.update({
      where: { id: orderId },
      data: { status: step.status }
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = OrderSchema.parse(body);

    const order = await prisma.order.create({
      data: {
        customerName: validatedData.customerName,
        address: validatedData.address,
        phone: validatedData.phone,
        totalAmount: validatedData.items.reduce((acc, i) => acc + (i.price * i.quantity), 0),
        items: {
          create: validatedData.items.map(item => ({
            name: item.name, quantity: item.quantity, price: item.price
          }))
        }
      }
    });

    simulateOrderFlow(order.id); // 
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Validation Error' }, { status: 400 });
  }
}