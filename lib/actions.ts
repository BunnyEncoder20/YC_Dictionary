'use server'; // for server actions

// next imports
import { auth } from "@/auth";

// utils imports 
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";

// sanity imports
import { writeClient } from "@/sanity/lib/write-client";


export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();
    if (!session) {
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR"
        })
    }

    // extract the pitch from the array of data
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([ key ]) => key !== "pitch")
    );

    // generate unique slug 
    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id
            },
            pitch,
        }

        // write to sanity to make entry
        const result = await writeClient.create({ _type: "startup", ...startup});

        // return the result
        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        });
        
    } catch (error) {
        console.error(error);
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        })
    }
}