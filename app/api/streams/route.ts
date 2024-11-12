
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import {prismaClient} from "@/app/lib/db";

const ytRegex= new RegExp("^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})(\S*)$")

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string(),
})
export async function POST(req:NextRequest){
    const data = CreateStreamSchema.parse(await req.json());
    try{
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = ytRegex.test(data.url);
        if(!isYt){
            return NextResponse.json({
                message:"Invalid URL"
            },{
                status: 411
            })
        }
        const extractedId = data.url.split("?v=")[1];
        prismaClient.stream.create({
            data:{
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube"
            }
        })
    }catch(e){
        return NextResponse.json({
            message:"Error while adding a stream"
        },{
            status: 411
        })
    }
}

export async function GET(req:NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
        where:{
            userId: creatorId ?? ""
        }
    });
    return NextResponse.json(streams);
}