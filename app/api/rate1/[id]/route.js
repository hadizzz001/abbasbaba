import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (request, { params }) => {
  try { 
    const { id } = params;

    const posts = await prisma.review.findMany({
      where: {
        stars: {  contains: id }
      }
    });

    if (!posts) {
      return NextResponse.json(
        { message: "Post not found", err },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};

