import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CountryData, GetCurrency } from "../../Store/SettingSlice"
import { LuChevronDown } from "react-icons/lu";
import Search_Input from "../../components/Inputs/Search_Input";
import Currency_Info from "../../components/SettingLayout/Currency_Info";
const Setting = () => {
    const { Country, loading, SelectedCurrency } = useSelector(state => state.setting)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(SelectedCurrency?.Currency);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(CountryData())
    }, [dispatch])
    return (
        <div className="space-y-6  max-w-lg md:min-w-xl md:max-w-2xl w-full md:w-[50%] h-auto  p-8 flex flex-col mx-auto">
            <h1 className="text-[max(1.8rem,7.2vw)] min-[450px]:text-[max(2rem,5vw)] md:text-[max(2.2rem,4vw)] lg:text-[clamp(1.75rem,1.291rem+0.7172vw,2.1875rem)] font-bold text-gray-800 ">Settings</h1>
            <div className='bg-white p-6 rounded-lg shadow-md '>
                <h3 className="text-[max(1rem,4.4vw)] min-[450px]:text-[max(1.2rem,3vw)] md:text-[max(1.4rem,2.5vw)] lg:text-[clamp(1.0625rem,0.5379rem+0.8197vw,1.5625rem)] font-semibold mb-4">General Settings</h3>
                <div className="space-y-4 ">
                    <div>
                        <label className="block text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.3535rem+0.7172vw,1.25rem)] font-medium text-gray-700 mb-2">Change Currency</label>
                        <div className="relative text-[max(.85rem,3.5vw)] min-[450px]:text-[max(.95rem,2.4vw)] md:text-[max(1.2rem,2vw)] lg:text-[clamp(0.8125rem,0.3535rem+0.7172vw,1.25rem)]">
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors"
                            >
                                <span className="text-gray-700">{selectedCurrency ?? "INR (₹)"}</span>
                                <LuChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </div>
                            <Search_Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} Country={Country} loading={loading} setSelectedCurrency={setSelectedCurrency} selectedCurrency={selectedCurrency} setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} />
                            <Currency_Info selectedCurrency={selectedCurrency} />
                        </div>
                    </div>
                </div>
            </div>
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => {
                        setIsDropdownOpen(false);
                        setSearchTerm('');
                    }}
                />
            )}
        </div>
    )
}

export default Setting