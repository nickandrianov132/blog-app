

const TransactionSkeleton = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="w-full h-14 bg-gray-400 rounded-2xl animate-pulse"></div>
            <div className="w-full h-34 bg-gray-400 rounded-2xl animate-pulse"></div>
        </div>
    );
}

export default TransactionSkeleton;
