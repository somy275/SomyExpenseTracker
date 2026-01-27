import React from 'react'
import { LuCheck } from 'react-icons/lu'

const Currency_Info = ({ selectedCurrency }) => {
    return (
        /* Selected currency info */

        selectedCurrency && (
            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center gap-2 ">
                    <LuCheck className="w-4 h-4 text-green-600" />
                    <span className="text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.3535rem+0.7172vw,1.25rem)] text-green-700">
                        Selected: <strong>{selectedCurrency ?? "INR (₹)  by default"}</strong>
                    </span>
                </div>
            </div>
        )

    )
}

export default Currency_Info