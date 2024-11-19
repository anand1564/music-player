
import { prismaClient } from "@/app/lib/db";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const DownvoteSchema = z.object({
    streamId: z.string(),
})

export async function POST(req:NextRequest) {
    const session = await getServerSession();

    const user = await prismaClient.user.findFirst({
        where:{
            email: session?.user?.email ?? ""
        }
    });
    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404});
    }
    try{
        const data = DownvoteSchema.parse(await req.json());
        await prismaClient.upvote.create({
            data:{
                userId: user.id,
                streamId: data.streamId,
            }
        })
    }catch(e){
        return NextResponse.json({message: "Can't downvote!"}, {status: 400});
    }
    
}