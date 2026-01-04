import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import prisma from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const [model, id] = params.path;
    const prismaModel = (prisma as any)[model];

    if (!prismaModel) return new NextResponse("Model not found", { status: 404 });

    try {
        if (id) {
            const item = await prismaModel.findUnique({ where: { id } });
            return NextResponse.json(item);
        } else {
            const items = await prismaModel.findMany({
                orderBy: { created_at: "desc" },
            });
            return NextResponse.json(items);
        }
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const [model] = params.path;
    const prismaModel = (prisma as any)[model];

    if (!prismaModel) return new NextResponse("Model not found", { status: 404 });

    try {
        const body = await req.json();
        const item = await prismaModel.create({ data: body });
        return NextResponse.json(item);
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const [model, id] = params.path;
    if (!id) return new NextResponse("ID required", { status: 400 });

    const prismaModel = (prisma as any)[model];
    if (!prismaModel) return new NextResponse("Model not found", { status: 404 });

    try {
        const body = await req.json();
        const item = await prismaModel.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(item);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const [model, id] = params.path;
    if (!id) return new NextResponse("ID required", { status: 400 });

    const prismaModel = (prisma as any)[model];
    if (!prismaModel) return new NextResponse("Model not found", { status: 404 });

    try {
        await prismaModel.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
