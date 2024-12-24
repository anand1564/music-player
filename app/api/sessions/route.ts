
import {prismaClient} from "@/app/libs/db";
import { NextRequest,NextResponse } from "next/server";


export async function POST(req:NextRequest,res:NextResponse){
     const userId = String(req.headers);
     const user=await prismaClient.user.findUnique({
          where:{
               id: userId,
          }
     })
     if(!user){
          return res.json({
               "message":"user not found",
          })
     }
}