// bg-zinc-900
// bg-blue-950
// bg-rose-950

import { PRODUCT_PRICES, BASE_PRICE } from "@/app/config/products"

export const COLORS = [
    {
        label: 'Black',
        value: 'black',
        tw: 'zinc-900',
        code: '#18181B'
    },
    {
        label: 'Blue',
        value: 'blue',
        tw: 'blue-950',
        code: '#0a0e1f'
    },
    {
        label: 'Rose',
        value: 'rose',
        tw: 'rose-950',
        code: '#4c0519'
    },
] as const // ad const means value will never be 

export const SIZES = [
    {
        label: 'Small',
        value: 'sm',
    },
    {
        label: 'Medium',
        value: 'md',
    },
    {
        label: 'Large',
        value: 'lg',
    },
    {
        label: 'XL',
        value: 'xl',
    },
] as const // ad const means value will never be 

export const MODELS = {
    name: 'models',
    options: [
        {
            label: 'iPhone X',
            value: 'iphonex',
        },
        {
            label: 'iPhone 11',
            value: 'iphone11',
        },
        {
            label: 'iPhone 12',
            value: 'iphone12',
        },
        {
            label: 'iPhone 13',
            value: 'iphone13',
        },
        {
            label: 'iPhone 14',
            value: 'iphone14',
        },
        {
            label: 'iPhone 15',
            value: 'iphone15',
        },
    ],
} as const

export const MATERIALS = {
    name: 'material',
    options: [
      {
        label: 'Silicone',
        value: 'silicone',
        description: undefined,
        price: PRODUCT_PRICES.material.silicone,
      },
      {
        label: 'Soft Polycarbonate',
        value: 'polycarbonate',
        description: 'Scratch-resistant coating',
        price: PRODUCT_PRICES.material.polycarbonate,
      },
    ],
  } as const
  
  export const FINISHES = {
    name: 'finish',
    options: [
      {
        label: 'Smooth Finish',
        value: 'smooth',
        description: undefined,
        price: PRODUCT_PRICES.finish.smooth,
      },
      {
        label: 'Textured Finish',
        value: 'textured',
        description: 'Soft grippy texture',
        price: PRODUCT_PRICES.finish.textured,
      },
    ],
  } as const