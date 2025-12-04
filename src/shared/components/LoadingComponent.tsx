

const LoadingComponent = () => {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        </div>
    );
}

export default LoadingComponent;