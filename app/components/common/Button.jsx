export default function Button({ onClick, children, variant = 'primary' }) {
  const styles = {
    primary: 'bg-gradient-to-tr from-blue-50 to-blue-400 text-black',
    like: 'bg-gradient-to-tr from-green-200 to-emerald-600 text-black',
    dislike: 'bg-gradient-to-tr from-red-400 to-red-100 text-black',
    optional: 'bg-gradient-to-tr from-slate-50 to-gray-300 text-black',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full  py-3 px-6 rounded-lg font-bold shadow-sm hover:shadow-lg transition-shadow ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
