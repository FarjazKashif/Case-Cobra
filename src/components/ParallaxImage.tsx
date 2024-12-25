import { ArrowRight } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

interface ParallaxProps {
    src: string;
}

const ParallaxSection: React.FC<ParallaxProps> = ({ src }) => {
    return (
        <section style={{ backgroundImage: `url('${src}')` }} className="mx-auto h-full overflow-y-hidden bg-cover bg-fixed bg-center bg-no-repeat">

            {/* Foreground Content */}
            <div className="relative z-10 h-screen flex items-center justify-center flex-col">
                <h3 className="text-white text-4xl font-bold">Your style reflects your lifestyle!</h3>
                <a href="/collections" className="font-light group mt-4 flex gap-x-2 items-center"> {/* added block and margin-top for spacing */}
                    View All
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out font-light group-hover:translate-x-3" />
                </a>
            </div>

        </section>
    );
};

export default ParallaxSection;
