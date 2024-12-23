"use client"

import HandleComponent from "@/components/HandleComponent"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, formatPrice } from "@/lib/utils"
import NextImage from "next/image"
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
import { useUploadThing } from "@/lib/uploadthing"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"

import { saveConfig as _saveConfig, SaveConfigArgs } from "./actions"
import { useRouter } from "next/navigation"

interface DesignProps {
    configId: string,
    imageUrl: string,
    dimensions: { width: number, height: number }
}

declare const myImage: {
    new(): HTMLImageElement;
};


const DesignConfigurator = ({ configId, imageUrl, dimensions }: DesignProps) => {

    const router = useRouter()
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

    const { mutate: saveConfig } = useMutation({
        mutationKey: ["save-config"],
        mutationFn: async (args: SaveConfigArgs) => {
            await Promise.all([saveConfiguration(), _saveConfig(args)])
        },
        onError: () => {
            toast({
                title: "Something went wrong!",
                description: "There is an issue with ConfigId.",
                variant: "destructive"
            })
        },
        onSuccess: () => {
            router.push(`/configure/preview?id=${configId}`)
        }
    })

    async function saveConfiguration() {
        try {
            const { left: caseLeft, top: caseTop, width, height } = phoneRef.current!.getBoundingClientRect();
            const { left: containerLeft, top: containerTop } = containerRef.current!.getBoundingClientRect();

            const leftOffset = caseLeft - containerLeft;
            const topOffset = caseTop - containerTop;

            console.log(`Left Offset: ${leftOffset}, Top Offset: ${topOffset}`);

            const actualX = renderedPosition.x - leftOffset;
            const actualY = renderedPosition.y - topOffset;

            console.log(`Actual X: ${actualX}, Actual Y: ${actualY}`);

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            const userImage = new window.Image();
            userImage.crossOrigin = "anonymous";
            userImage.src = imageUrl;

            await new Promise((resolve, reject) => {
                userImage.onload = resolve;
                userImage.onerror = reject;
            });

            console.log("Image loaded: ", userImage);

            // Ensure image is drawn with correct coordinates and dimensions
            console.log(`Drawing image at X: ${actualX}, Y: ${actualY}, Width: ${renderedDimensions.width}, Height: ${renderedDimensions.height}`);
            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimensions.width,
                renderedDimensions.height
            );

            // Append canvas to body for testing
            document.body.appendChild(canvas);

            const base64 = canvas.toDataURL(); // This method helps to Encode - means Convert to Writing Format
            const base64Data = base64.split(',')[1];
            const blob = base64toBlob(base64Data, "image/png");
            const file = new File([blob], 'filename.png', { type: 'image/png' });

            await startUpload([file], { configId });

        } catch (err) {
            toast({
                title: "Something went wrong!!",
                description: `There is an Issue... + ${err}`,
                variant: "destructive"
            });
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
                <div className='relative w-[34rem] bg-opacity-50 pointer-events-none aspect-[7234/7638]'>

                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="100%" viewBox="0 0 7324 7638" enable-background="new 0 0 7324 7638" className="absolute inset-0">
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
                            d="
M6.000000,3330.000000 
	C19.513704,3327.635254 19.826893,3314.726074 23.670483,3305.857178 
	C48.975674,3247.467285 73.333321,3188.666748 97.999985,3130.000000 
	C122.666649,3071.333252 147.147736,3012.587891 172.052673,2954.022461 
	C196.477478,2896.586182 221.436340,2839.377197 245.976852,2781.989990 
	C286.728760,2686.693359 327.339478,2591.335938 367.998199,2495.999268 
	C404.673523,2410.002930 442.146973,2324.335205 477.754639,2237.898926 
	C508.833832,2162.455322 541.431152,2087.652344 572.736755,2012.306152 
	C601.134766,1943.958008 631.240906,1876.248657 660.027222,1808.011475 
	C688.132507,1741.388794 716.172424,1674.709839 744.726135,1608.312256 
	C781.515808,1522.763306 817.222595,1436.701172 856.004456,1352.002075 
	C895.260559,1266.266846 934.292542,1180.436646 972.165283,1094.072510 
	C998.641602,1033.696655 1026.767334,974.045593 1053.974487,913.988464 
	C1088.080322,838.703064 1122.594604,763.592285 1155.587158,687.820251 
	C1163.963867,668.581909 1175.491699,651.880005 1188.373779,636.309204 
	C1205.314819,615.832092 1222.709717,595.627747 1237.728394,573.812988 
	C1266.054932,532.668579 1309.271118,513.401855 1352.114258,494.255676 
	C1520.149902,419.162384 1694.007324,359.485504 1867.843384,299.545654 
	C2006.180908,251.845886 2145.266113,206.424881 2284.191406,160.580139 
	C2437.352539,110.037704 2592.035156,64.111954 2745.964844,15.887927 
	C2771.104004,8.012218 2794.195801,17.580967 2818.001953,21.989424 
	C2891.829590,35.661034 2965.630371,49.298447 3039.915771,60.555717 
	C3095.871582,69.035301 3151.986084,76.534691 3208.093750,83.211807 
	C3257.135010,89.047981 3306.641602,92.411346 3355.950195,96.587975 
	C3415.257568,101.611557 3474.758545,102.379936 3534.033936,107.617172 
	C3559.832520,109.896629 3586.000000,108.000000 3612.000000,108.000000 
	C3668.666748,108.000000 3725.398193,109.705261 3781.982910,107.552643 
	C3847.364258,105.065369 3912.759766,102.301880 3978.066406,96.785301 
	C4015.967041,93.583733 4054.004395,90.465576 4091.958008,87.468689 
	C4140.131348,83.664879 4187.972168,75.765198 4236.006836,70.057220 
	C4301.684082,62.252731 4366.807617,50.869957 4431.971191,39.829102 
	C4473.470215,32.797764 4514.919922,24.663357 4555.731934,14.881751 
	C4576.833984,9.824072 4594.906738,15.333611 4611.736328,20.810505 
	C4786.770508,77.772316 4963.238770,130.177811 5138.087891,187.733307 
	C5342.980469,255.178391 5548.084473,321.865540 5750.114258,397.695770 
	C5835.028809,429.568054 5919.253418,462.792664 6002.183594,499.586029 
	C6055.970703,523.449219 6098.315430,559.129944 6129.715332,608.182190 
	C6134.482422,615.629089 6140.802246,621.510559 6146.403809,627.630615 
	C6181.903320,666.418640 6196.296875,716.060425 6218.185059,761.911621 
	C6239.659668,806.894958 6259.516602,852.583862 6279.977051,898.010376 
	C6315.393066,976.639832 6350.516602,1055.401123 6386.042480,1133.980713 
	C6419.841797,1208.738037 6454.391602,1283.158081 6487.894531,1358.046997 
	C6524.608398,1440.114380 6559.248047,1523.081543 6594.424805,1605.819458 
	C6626.206055,1680.572998 6658.217285,1755.241821 6689.918945,1830.034302 
	C6726.882812,1917.241577 6764.286621,2004.259033 6800.672363,2091.720215 
	C6824.390137,2148.731201 6849.532227,2205.248535 6873.931152,2262.029541 
	C6914.849609,2357.254639 6955.339355,2452.664062 6995.998047,2548.000488 
	C7032.673340,2633.997070 7070.011230,2719.718994 7105.807129,2806.080078 
	C7140.936523,2890.834229 7177.354980,2975.048096 7212.754395,3059.684570 
	C7241.073730,3127.394531 7270.064453,3194.927979 7299.929199,3262.031494 
	C7309.038574,3282.500732 7315.714844,3304.012207 7327.717773,3324.980957 
	C7298.651855,3340.852783 7267.624023,3348.910400 7237.888672,3359.692627 
	C7115.965820,3403.902100 6993.827148,3447.518555 6871.847656,3491.578125 
	C6763.962402,3530.547119 6655.805176,3568.783203 6547.941895,3607.839600 
	C6420.855957,3653.856689 6293.288086,3698.539551 6166.015625,3744.043213 
	C6075.269531,3776.488037 5984.831055,3809.807617 5893.780762,3841.366699 
	C5883.038086,3845.090088 5881.418457,3849.440186 5882.041016,3857.997070 
	C5886.357910,3917.294189 5884.242188,3976.682129 5883.797363,4035.998535 
	C5874.841797,5230.658203 5882.589844,6425.334961 5879.985840,7620.000000 
	C5879.969727,7627.381836 5880.738281,7634.854980 5877.881348,7642.000000 
	C4406.666504,7642.000000 2935.333252,7642.000000 1463.917603,7642.000000 
	C1460.659912,7634.909668 1462.056396,7627.353027 1462.056030,7620.000000 
	C1461.997314,6525.333496 1462.305054,5430.666504 1461.487793,4336.000488 
	C1461.413086,4236.019043 1461.413330,4135.988770 1459.705811,4036.005127 
	C1459.011475,3995.345459 1455.520264,3954.726074 1455.998047,3914.000000 
	C1456.013672,3912.666992 1455.855713,3911.314941 1456.021484,3910.002686 
	C1458.625244,3889.395508 1465.414795,3863.854248 1456.032227,3849.265625 
	C1445.159180,3832.358887 1416.842041,3831.545410 1395.998779,3824.003174 
	C1191.562744,3750.026367 986.767944,3677.049072 782.132263,3603.631348 
	C608.057800,3541.178223 434.059479,3478.501709 260.014130,3415.960693 
	C184.597076,3388.860352 109.376488,3361.212646 33.915848,3334.235352 
	C28.043898,3332.136230 22.035301,3331.262695 18.000000,3326.000000 
"/>
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
                            d="
M914.000000,1238.000000 
	C953.005005,1266.989258 982.969910,1304.190186 1009.979126,1344.014160 
	C1081.619995,1449.645386 1129.985962,1566.395386 1171.836304,1686.057251 
	C1214.628296,1808.411499 1247.560547,1933.723511 1275.316162,2060.150146 
	C1296.079834,2154.729004 1313.609741,2250.080078 1328.747925,2345.881836 
	C1339.077148,2411.249756 1349.955811,2476.625488 1359.131226,2542.121826 
	C1365.816528,2589.842773 1371.084839,2637.970215 1376.710938,2685.916504 
	C1383.050049,2739.938232 1389.654297,2794.020752 1395.168091,2848.084961 
	C1400.182739,2897.253662 1405.712524,2946.503662 1408.253418,2995.987061 
	C1410.344849,3036.717529 1413.972534,3077.405273 1418.177002,3117.981689 
	C1423.349976,3167.905273 1429.960327,3217.546143 1430.434326,3267.995850 
	C1431.237549,3353.468994 1438.828125,3438.697754 1443.302368,3524.036621 
	C1445.324341,3562.605713 1447.121460,3601.312988 1448.124878,3639.996826 
	C1449.647095,3698.676025 1452.117432,3757.329834 1453.871704,3816.003906 
	C1454.130127,3824.642822 1455.771118,3833.572021 1452.000000,3842.000000 
"/>
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
                            d="
M4750.000000,68.000000 
	C4703.200195,183.313492 4629.401855,278.350159 4536.335938,360.381165 
	C4439.145996,446.047089 4328.746582,508.888794 4209.859375,557.656860 
	C4140.080078,586.280518 4067.801514,607.669128 3994.066406,624.294861 
	C3942.411621,635.942017 3890.292236,645.335449 3837.909180,651.186829 
	C3790.272461,656.507996 3742.302979,661.282715 3693.994385,660.273438 
	C3631.992920,658.978027 3569.788818,662.476929 3508.028809,655.736328 
	C3410.552490,645.097473 3314.283203,628.505066 3219.872559,600.428345 
	C3062.199707,553.538025 2917.433838,483.252686 2789.768066,378.281982 
	C2710.196289,312.855652 2645.114258,235.649353 2592.296875,147.821472 
	C2578.981445,125.680077 2569.333252,101.333389 2558.000000,78.000053 
"/>
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
                            d="
M6430.000000,1238.000000 
	C6407.562012,1245.129395 6394.257812,1264.032471 6380.437988,1280.370239 
	C6308.424316,1365.500732 6257.693359,1463.066772 6215.726562,1565.888428 
	C6173.932129,1668.290405 6140.251953,1773.119141 6111.451660,1879.851929 
	C6094.247559,1943.610352 6078.422363,2007.641479 6064.308105,2072.067383 
	C6048.306641,2145.108398 6032.676758,2218.342529 6020.658691,2292.107422 
	C6011.781738,2346.590088 6003.528809,2401.271973 5995.360840,2455.904541 
	C5985.795410,2519.880615 5978.298828,2584.131104 5968.397461,2648.061523 
	C5962.254395,2687.729736 5960.855469,2728.109131 5955.771973,2767.970947 
	C5950.085938,2812.553955 5946.311035,2857.296387 5942.001465,2902.000244 
	C5938.659668,2936.666016 5935.233887,2971.323975 5932.024902,3006.002441 
	C5927.893066,3050.656982 5924.770996,3095.402344 5920.771973,3140.069092 
	C5918.581055,3164.536377 5917.241699,3189.328369 5915.991699,3213.999512 
	C5915.644043,3220.855225 5917.841309,3228.234863 5912.000000,3234.000000 
"/>
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
                            d="
M4582.000000,16.000000 
	C4547.716797,76.686623 4501.409180,127.445709 4452.176758,176.178619 
	C4366.315918,261.168091 4265.610840,323.439240 4155.890625,371.752136 
	C4078.300781,405.917023 3997.409912,430.276550 3914.005127,446.026520 
	C3861.078613,456.020996 3807.811523,463.153229 3754.000244,466.002319 
	C3683.169922,469.752441 3612.682129,467.691711 3541.942139,460.574860 
	C3437.119629,450.029053 3335.843750,425.517578 3238.205811,387.472137 
	C3139.700439,349.088593 3047.491943,298.419861 2966.060059,229.928619 
	C2948.010498,214.747559 2925.776367,204.020020 2914.000000,182.000000 
"/>
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
                            d="
M4458.000000,164.000000 
	C4431.627441,165.612259 4407.387207,176.240967 4382.069824,182.291534 
	C4315.765625,198.137650 4249.257324,212.605484 4182.073730,224.419083 
	C4131.509766,233.310303 4080.746582,241.248337 4029.905029,247.187759 
	C3980.187012,252.995956 3930.057129,256.692017 3880.052979,260.667053 
	C3780.741455,268.561707 3681.387939,268.870117 3582.004639,267.632050 
	C3517.902588,266.833496 3453.929932,261.719727 3389.950195,256.626953 
	C3328.341064,251.722855 3267.111084,244.346085 3206.042480,235.699860 
	C3126.643799,224.458511 3048.029053,208.687881 2969.927979,190.305786 
	C2952.188232,186.130554 2934.995850,177.980133 2915.999268,179.992172 
	C2908.990723,180.734497 2904.232422,175.643555 2900.203369,171.787491 
	C2868.718994,141.655029 2838.700684,110.179192 2813.929932,74.048050 
	C2801.368408,55.725254 2784.325928,40.314209 2778.000000,18.000000 
"/>
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
                            d="
M5906.000000,1698.000000 
	C5903.017090,1703.742676 5904.042480,1709.949463 5904.025391,1716.000122 
	C5903.329102,1958.666626 5902.666504,2201.333252 5902.003906,2444.000000 
	C5901.979980,2452.666748 5901.871094,2461.335449 5902.019043,2469.999756 
	C5906.253418,2717.990234 5902.954102,2966.000977 5904.046875,3213.999756 
	C5904.077148,3220.854492 5902.158691,3228.234863 5908.000000,3234.000000 
"/>
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.000000"
                            d="
M1432.000000,1698.000000 
	C1435.856934,2077.327637 1434.188599,2456.668701 1433.380737,2835.998779 
	C1433.159302,2939.984131 1433.078003,3044.002686 1431.989258,3148.000000 
	C1431.923706,3154.264160 1433.276733,3160.876221 1428.000000,3166.000000 
"/>
                        <path fill={options.color.code} opacity="1.000000" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.000000"
                            d="
M5910.000000,3238.000000 
	C5906.666504,3330.666748 5904.829590,3423.418701 5899.540039,3515.973633 
	C5895.083496,3593.958008 5893.683105,3672.017578 5889.807617,3749.990479 
	C5888.313477,3780.049072 5886.324707,3810.000000 5890.000000,3840.000000 
"/>
                    </svg>
                    <AspectRatio ref={phoneRef} ratio={7234 / 7638} className='pointer-events-none relative z-50 aspect-[7234/7638] w-full'>
                        {/* <NextImage src="/phone-template.png" alt="Image" className="pointer-events-none z-50 select-none" fill /> */}
                        <NextImage src="/t-shirt.png" alt="Image" className="pointer-events-none z-50 select-none h-full" fill />
                    </AspectRatio>
                    {/* <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' /> */}

                    {/* <div
                        className={cn(
                            'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
                            `bg-${options.color.tw}`
                        )}
                    /> */}
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

                        setRenderedPosition({ x, y })
                    }}

                    onDragStop={(_, data) => {
                        const { x, y } = data
                        setRenderedPosition({ x, y })
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
                        <NextImage
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
                                onClick={() => saveConfig({
                                    color: options.color.value,
                                    finish: options.finish.value,
                                    material: options.material.value,
                                    model: options.model.value,
                                    configId: configId
                                })}
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