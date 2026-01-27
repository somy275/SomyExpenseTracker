import { useMemo } from 'react';
import { LuCheck } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { SetCurrency } from '../../Store/SettingSlice';

const Currency_List = ({ Country, setSearchTerm, searchTerm, setSelectedCurrency, setIsDropdownOpen, selectedCurrency }) => {
    const dispatch = useDispatch()
    const filteredData = useMemo(() => {
        if (!searchTerm) return Country
        return Country.filter(data =>
            data.currencies?.map(({ code }) => code?.toLowerCase())?.includes(searchTerm?.toLowerCase()) || data.currencies?.map(({ symbol }) => symbol)?.includes(searchTerm) || data.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
            || data.currencies?.map((data) => data?.name?.toLowerCase())?.includes(searchTerm.toLowerCase())

        )
    }, [searchTerm, Country])
    const selectCurrency = async (currency) => {
        setSelectedCurrency(`${currency?.code} (${currency?.symbol})`);
        const Currency_Info = `${currency?.code} (${currency?.symbol})`
        setSearchTerm('');
        setIsDropdownOpen(false);
        const res = await dispatch(SetCurrency({ Currency_Info }))
    };
    return (
        <div className="max-h-60 min-w-105 md:max-h-100 lg:max-h-120 h-[27vh] lg:h-[30vh]">
            {filteredData.length > 0 ?
                (filteredData.map((currency, idx) => {



                    return (
                        currency?.currencies?.map((data) => {
                            const isSelected = selectedCurrency === `${data?.code} (${data?.symbol})`

                            return (
                                <div
                                    key={idx}
                                    onClick={() => selectCurrency(data)}
                                    className={`p-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between transition-colors ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                        }`}
                                >
                                    <div>

                                        <>
                                            <div className="font-medium flex gap-3 justify-between items-center">
                                                <img className='h-4 w-auto aspect-[1.6/1] object-cover' srcSet={currency?.flag} />
                                                {currency?.name}
                                                <span>
                                                    {data?.code} ({data?.symbol})
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {data?.name}
                                            </div>
                                        </>


                                    </div>
                                    {isSelected && (
                                        <LuCheck className="w-5 h-5 text-blue-600" />
                                    )}
                                </div>
                            )
                        }
                        ))

                })) : (
                    <div className="p-3 text-center text-gray-500 text-sm">
                        No currencies found matching "{searchTerm}"
                    </div>
                )}

        </div>
    )
}

export default Currency_List