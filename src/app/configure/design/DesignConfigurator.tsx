"use client"

import HandleComponent from "@/components/HandleComponent"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, formatPrice } from "@/lib/utils"
import Image from "next/image"
import { Rnd } from "react-rnd"
import { Radio, RadioGroup } from '@headlessui/react'
import { useRef, useState } from "react"
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/app/validators/color-validators"
import { Label } from "@/components/ui/label"
import { color } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react"
import { BASE_PRICE } from "@/app/config/products"
import { useToast } from "@/hooks/use-toast"
import { useUploadThing } from "@/lib/uploadthing"

interface DesignProps {
    configId: string,
    imageUrl: string,
    dimensions: { width: number, height: number }
}

declare var myImage: {
    new(): HTMLImageElement;
};

const DesignConfigurator = ({ configId, imageUrl, dimensions }: DesignProps) => {
    const { toast } = useToast()
    const [options, setOptions] = useState<{
        color: (typeof COLORS)[number],
        model: (typeof MODELS.options)[number],
        material: (typeof MATERIALS.options)[number],
        finish: (typeof FINISHES.options)[number]
    }>({
        color: COLORS[0],
        model: MODELS.options[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0]
    })

    const [renderedDimensions, setRenderedDimensions] = useState({
        width: dimensions.width / 4,
        height: dimensions.height / 4
    })

    const [renderedPosition, setRenderedPosition] = useState({
        x: 150,
        y: 205,
    })

    const phoneRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const { startUpload } = useUploadThing("imageUploader")

    async function saveConfiguration() {
        try {
            // ! -> Means must have value
            const { left: caseLeft, right: caseTop, width, height } = phoneRef.current!.getBoundingClientRect()
            const { left: containerLeft, top: containerTop } = containerRef.current!.getBoundingClientRect()

            const leftOffset = caseLeft - containerLeft
            const topOffset = caseTop - containerTop

            console.log(`Left Offset: ${leftOffset} & Top Offset: ${topOffset}`)

            const actualX = renderedPosition.x - leftOffset
            const actualY = renderedPosition.y - topOffset

            console.log(`X: ${actualX} & Y: ${actualY}`)

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d')

            const userImage = new myImage();
            userImage.crossOrigin = "anonymous"
            userImage.src = imageUrl

            await new Promise((resolve) => (userImage.onload = resolve))

            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimensions.width,
                renderedDimensions.height
            )

            const base64 = canvas.toDataURL() // This method helps to Encode - means Convert to Writing Format
            const base64Data = base64.split(',')[1]
            const blob = base64toBlob(base64Data, "image/png")
            const file = new File([blob], 'filename.png', { type: 'image/png' })
            await startUpload([file], { configId })

        } catch (err) {
            toast({
                title: "Something went wrong!!",
                description: "There is an Issue...",
                variant: "destructive"
            })
        }
    }

    function base64toBlob(base64: string, mimeType: string) {
        const byteCharacters = atob(base64) // Decode it into Binary data - Reading Format
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            // charcodeAt helps to convert each value into character code
            // Here, we're saying that value in byteNumbers[index] = convert [index] into charcode, then equalizing it with same value of byteNumbers[index]
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers) // UTF-16 unit code - Preparing binary data for further operations - Like for Uploads
        return new Blob([byteArray], { type: mimeType })
    }

    return (
        <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
            <div ref={containerRef} className='relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
                <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
                    <AspectRatio ref={phoneRef} ratio={896 / 1831} className='pointer-events-none relative z-50 aspect-[896/1831] w-full'>
                        <Image src="/phone-template.png" alt="Image" className="pointer-events-none z-50 select-none" fill />
                    </AspectRatio>
                    <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
                    <div
                        className={cn(
                            'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
                            `bg-${options.color.tw}`
                        )}
                    />
                </div>
                <Rnd default={
                    {
                        x: 150,
                        y: 205,
                        width: dimensions.width / 4,
                        height: dimensions.height / 4,
                    }
                }
                    onResizeStop={(_, __, ref, ___, { x, y }) => { 
                        setRenderedDimensions({
                            width: parseInt(ref.style.width.slice(0, -2)),
                            height: parseInt(ref.style.height.slice(0, -2)),
                        })

                        setRenderedPosition({x, y})
                     }}

                     onDragStop={(_, data) => {
                        const {x, y} = data
                        setRenderedPosition({x, y})
                     }}
                    className='absolute z-20 border-[1px] border-dashed border-primary'
                    lockAspectRatio
                    resizeHandleComponent={{
                        bottomLeft: <HandleComponent />,
                        bottomRight: <HandleComponent />,
                        topLeft: <HandleComponent />,
                        topRight: <HandleComponent />
                    }}
                >
                    <div className='relative w-full h-full'>
                        <Image
                            src={imageUrl}
                            fill
                            alt='your image'
                            className='pointer-events-none'
                        />
                    </div>
                </Rnd>
            </div>

            {/* Customize Section */}
            <div className='h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white'>
                <ScrollArea className='relative flex-1 overflow-auto'>
                    <div
                        aria-hidden='true'
                        className='absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none'
                    />
                    <div className='px-8 pb-12 pt-8'>
                        <h2 className='tracking-tight font-bold text-3xl text-zinc-700'>
                            Customize your case
                        </h2>
                        <div className='w-full h-px bg-zinc-200 my-6' />
                        <div className='relative mt-4 h-full flex flex-col justify-between'>
                            <div className='flex flex-col gap-6'>
                                <RadioGroup value={options.color} onChange={(val) => {
                                    setOptions((prev) => ({
                                        ...prev, // We're getting the previous value over here when we're setOptions. Then we are passing all the prev values..
                                        color: val
                                    }))
                                }}>
                                    <Label className="text-zinc-700">Color: {options.color.label}</Label>
                                    <div className='mt-3 flex items-center space-x-3'>
                                        {COLORS.map((color) => (
                                            <Radio
                                                value={color}
                                                key={color.label}
                                                className={({ checked, focus }) => cn(
                                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                                                    {
                                                        [`border-${color.tw}`]: checked || focus
                                                    }
                                                )}
                                            >
                                                <span className={cn('h-8 w-8 rounded-full border border-black border-opacity-30', `bg-${color.tw}`)}></span>
                                            </Radio>
                                        ))}
                                    </div>
                                </RadioGroup>

                                <div className='relative flex flex-col gap-3 w-full'>
                                    <Label className="text-zinc-700">Model</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='outline'
                                                role='combobox'
                                                className='w-full justify-between text-zinc-900'>
                                                {options.model.label}
                                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {MODELS.options.map((model) => (
                                                <DropdownMenuItem
                                                    key={model.label}
                                                    className={cn('flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 text-zinc-900',
                                                        { 'bg-zinc-100': model.label === options.model.label }
                                                    )}
                                                    onClick={() => {
                                                        setOptions((prev) => ({ ...prev, model }))
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            model.label === options.model.label
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                    {model.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                                    <RadioGroup
                                        key={name}
                                        value={options[name]}
                                        onChange={(value) => {
                                            setOptions((prev) => ({
                                                ...prev,
                                                [name]: value
                                            }))
                                        }}
                                    >
                                        <Label className="text-zinc-700">{name.slice(0, 1).toUpperCase() + name.slice(1)}</Label>
                                        <div className='mt-3 space-y-4'>
                                            {selectableOptions.map((option) => (
                                                <Radio
                                                    value={option}
                                                    key={option.value}
                                                    className={({ focus, checked }) =>
                                                        cn(
                                                            'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                                                            {
                                                                'border-primary': focus || checked,
                                                            }
                                                        )
                                                    }
                                                >
                                                    <span className='flex items-center'>
                                                        <span className='flex flex-col text-sm'>
                                                            <Radio value={option.label} className='font-medium text-gray-900'
                                                                as='span'>
                                                                {option.label}
                                                            </Radio>

                                                            {option.description ? (
                                                                <Radio value={option.description} as='span'
                                                                    className='text-gray-500'>
                                                                    <span className='block sm:inline'>
                                                                        {option.description}
                                                                    </span>
                                                                </Radio>
                                                            ) : null}
                                                        </span>
                                                    </span>

                                                    <Radio as='span' value={option.price}
                                                        className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                                                        <span className='font-medium text-gray-900'>
                                                            {formatPrice(option.price / 100)}
                                                        </span>
                                                    </Radio>
                                                </Radio>
                                            ))}
                                        </div>

                                    </RadioGroup>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className='w-full px-8 h-16 bg-white'>
                    <div className='h-px w-full bg-zinc-200' />
                    <div className='w-full h-full flex justify-end items-center'>
                        <div className='w-full flex gap-6 items-center'>
                            <p className='font-medium whitespace-nowrap text-zinc-700'>
                                {formatPrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
                            </p>
                            <Button size='sm'
                                onClick={() => saveConfiguration()}
                                className='w-full'>
                                Continue
                                <ArrowRight className='h-4 w-4 ml-1.5 inline' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesignConfigurator