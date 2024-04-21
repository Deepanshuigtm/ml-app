

const HeadingSection  = () => {
    return (
        // background-image: linear-gradient(#000, #352155 59%, #36276a 95%);
        <div className="flex h-10 mt-14 flex-col ml-20">
            <div className="font-bold text-5xl mb-4">
                Automate Task Using Ai
            </div>
            <div className="font-bold text-5xl text-gray-400 mb-14">
                without the dev effort
            </div>
            <div className="text-gray-300 w-2/4 leading-relaxed tracking-wider mb-14">
                Empower your automation initiatives with AI-driven solutions, effortlessly eliminating the need for extensive developer involvement.
            </div>
            
            <div className="w-1/6">
            <button type="submit" className="peer hidden whitespace-nowrap rounded-full bg-gray-50 px-5 py-3 font-normal text-gray-900 duration-300 hover:cursor-pointer hover:bg-gray-300 md:flex ">Start building</button>
            </div>

        </div>
    )
}

export default HeadingSection ;