const Arrow = ({ scrollToBottom, isAtBottom, unreadCount }) => {
  if (isAtBottom) return;
  return (
    <button
      onClick={scrollToBottom}
      className="sticky bottom-0 ml-auto bg-zinc-300 p-2 rounded-lg hover:bg-zinc-400 shadow-black/50 shadow-md"
    >
      {unreadCount > 0 && (
        <span className="bg-red-500 text-white absolute -top-2 -right-2 rounded-full size-5 flex items-center justify-center text-xs font-bold">
          {unreadCount}
        </span>
      )}
      <img src="/arrow.svg" alt="arrow" className="w-3" />
    </button>
  );
};

export default Arrow;
