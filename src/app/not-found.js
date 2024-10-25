"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    const handleback = () => {
        router.back();
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-9xl font-bold text-gray-800 animate-bounce">404</h1>
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-lg mb-8 text-center">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="space-x-4">
                <Link href="/">
                    <button className="bg-red-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-red-600 transition-colors duration-200">
                        Go Home
                    </button>
                </Link>
                <button
                    onClick={handleback}
                    className="bg-black text-white px-6 py-3 rounded-md shadow-lg hover:bg-black transition-colors duration-200"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;
