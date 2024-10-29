const BasicInput = () => {
    return (
        <div className="flex flex-col items-start space-y-2">
            <span>Text</span>
            <input
                type="text" 
                placeholder="Input text" 
                className="w-96 p-3 rounded-lg border border-gray-400 placeholder-gray-500 bg-zinc-0 focus:outline-none 
                    transition-colors transition-opacity duration-500 hover:border-pink-500 hover:bg-gray-200 hover:placeholder-gray-400
                    focus:border-pink-500 focus:bg-white focus:placeholder-transparent"
            >
            </input>

        </div>
    );
};

export default BasicInput;