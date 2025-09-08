export default function Switch({ id, value, onChange }) {
  return (
    <div className="relative inline-block w-11 h-5">
      <input
        checked={value}
        onChange={onChange}
        id={id}
        type="checkbox"
        className="peer appearance-none w-8 h-5 bg-slate-100 rounded-full checked:bg-slate-800 transition-colors duration-300"
      />
      <label
        htmlFor={id}
        className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-4 peer-checked:border-slate-800"
      ></label>
    </div>
  );
}
