
import { LuSearch } from 'react-icons/lu';
import Currency_List from '../SettingLayout/Currency_List';

const Search_Input = ({ searchTerm, setSearchTerm, isDropdownOpen, loading, Country, setSelectedCurrency, setIsDropdownOpen, selectedCurrency }) => {


    return (
        isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {/* Search input */}
                <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search currencies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 p-2 border border-gray-300 rounded-md  text-sm"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Currency list */}
                <div className="max-h-60 overflow-y-auto">
                    {
                        loading ?
                            <div className='flex items-center justify-center py-4 font-medium'>
                                <div className='animate-spin  rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2'></div>
                                loading
                            </div>
                            : <Currency_List isDropdownOpen={isDropdownOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setSelectedCurrency={setSelectedCurrency} setIsDropdownOpen={setIsDropdownOpen} selectedCurrency={selectedCurrency} Country={Country} />
                    }

                </div>

            </div>

        ))

}

export default Search_Input