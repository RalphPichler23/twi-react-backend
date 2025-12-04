
interface ErrorHandleProps {
    title?: string;
    message?: string;
}

const ErrorHandle = ({title, message}: ErrorHandleProps) => {
    return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-gray-600 mb-4">
                {message}
            </p>
            <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
            >
                Neu laden
            </button>
            </div>
        </div>
    );
}

export default ErrorHandle;