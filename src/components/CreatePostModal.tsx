'use client';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50
                      transition-opacity duration-200 ease-in-out"
        >
            <div 
                className="bg-white w-full max-w-xl rounded-xl shadow-xl
                          transition-all duration-200 ease-out
                          animate-[modal-pop_0.2s_ease-out]"
                style={{
                    animation: "modal-pop 0.2s ease-out"
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <button 
                        onClick={onClose} 
                        className="hover:bg-gray-100 p-2 rounded-full text-gray-700"
                    >
                        Cancel
                    </button>
                    <h2 className="font-semibold">New thread</h2>
                    <div className="w-16">
                        <button className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-800">
                            Post
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200" /> {/* Avatar */}
                            <div className="w-0.5 flex-1 bg-gray-200 my-2" /> {/* Vertical line */}
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-2">vhoang0603</div>
                            <textarea 
                                placeholder="What's new?"
                                className="w-full resize-none focus:outline-none text-gray-700 placeholder-gray-500"
                                rows={4}
                            />
                        </div>
                    </div>
                    
                    {/* Add to thread section */}
                    <div className="flex gap-4 mt-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                        <input
                            type="text"
                            placeholder="Add to thread"
                            className="flex-1 focus:outline-none text-gray-700 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                    <div className="flex gap-4">
                        <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
                            <span>📷</span>
                        </button>
                        <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
                            <span>📍</span>
                        </button>
                    </div>
                    <div className="text-gray-500 text-sm mt-4">
                        Anyone can reply & quote
                    </div>
                </div>
            </div>
        </div>
    );
} 