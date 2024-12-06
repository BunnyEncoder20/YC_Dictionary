"use client";

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor';

// shadcn imports
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"





const StartupForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState<string>('');
    const [isPending, setIsPending] = useState(false)

  return (
    <form action={ () => {} } className="startup-form">

        {/* title */}
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input id="title" name="title" required placeholder='Startup Title' className="startup-form_input"/>
            { errors.title && <p className="startup-form_error">{ errors.title }</p>}
        </div>

        {/* description */}
        <div>
            <label htmlFor="description" className="startup-form_label">Description</label>
            <Textarea id="description" name="description" required placeholder='Startup Description' className="startup-form_textarea"/>
            { errors.description && <p className="startup-form_error">{ errors.description }</p>}
        </div>

        {/* category */}
        <div>
            <label htmlFor="category" className="startup-form_label">Category</label>
            <Input id="category" name="category" required placeholder='Startup Category (Tech, Health, Education, etc)' className="startup-form_input"/>
            { errors.category && <p className="startup-form_error">{ errors.category }</p>}
        </div>

        {/* Image */}
        <div>
            <label htmlFor="link" className="startup-form_label">Image URL</label>
            <Input id="link" name="link" required placeholder='Startup Poster Image URL' className="startup-form_input"/>
            { errors.link && <p className="startup-form_error">{ errors.link }</p>}
        </div>

        {/* Pitxh (Markdown) */}
        <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label">Pitch</label>

            <MDEditor
                id='pitch'
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                preview='edit'
                height={300}
                style={{ borderRadius: 20, overflow: 'hidden' }}
                textareaProps={{ placeholder: 'Briefly describe your Startup and what problem it solves'}}
                previewOptions={{ disallowedElements: ["styles"] }}
            />

            { errors.pitch && <p className="startup-form_error">{ errors.pitch }</p>}
        </div>

        {/* Submit button */}
        <Button type='submit' disabled={isPending} className="startup-form_btn text-white">
            {isPending ? 'Submitting...' : 'Submit your Pitch'}
            <Send className="size-6 ml-2"/>
        </Button>
    </form>
  )
}

export default StartupForm