

const TransactionSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="w-full h-15 bg-gray-400/30 rounded-2xl animate-pulse"></div>
            <div className="w-[70%] h-10 bg-gray-400/30 rounded-2xl animate-pulse"></div>
            <div className="w-[70%] h-10 bg-gray-400/30 rounded-2xl animate-pulse"></div>
            <div className="w-[70%] h-10 bg-gray-400/30 rounded-2xl animate-pulse"></div>
            <div className="w-[70%] h-10 bg-gray-400/30 rounded-2xl animate-pulse"></div>
        </div>
    );
}

export default TransactionSkeleton;
