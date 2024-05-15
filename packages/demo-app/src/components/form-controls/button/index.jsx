export default function Button(props) {
  const { label, onClick, className } = props;

  return (
    // text-cyan-600 hover:text-cyan-500
    <button
      type="button"
      onClick={onClick}
      className={`${className} md:py-1 py-2 min-w-16 px-0 md:px-5 mb-2 md:text-sm text-xs font-medium 
text-gray-900 focus:outline-none 
bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cyan-700 
focus:z-10 focus:ring-4 focus:ring-gray-100`}
    >
      {label}
    </button>
  );
}
