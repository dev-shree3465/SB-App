import { Pencil, Check } from 'lucide-react';

export const SettingItem = (props) => {
  const {
    label,
    field,
    type = "text",
    value,
    formDataValue,
    isEditing,
    onEdit,
    onSave,
    onChange,
    notify
  } = props;

  const LucideIcon = props.icon;

  const handleInputChange = (e) => {
    let val = e.target.value;

    // 1. Always allow backspace
    if (val === '') {
      onChange(field, '');
      return;
    }

    // 2. Age Logic (1-100)
    if (field === 'age') {
      const numVal = parseInt(val);

      if (numVal < 1) {
        notify?.("Age must be a positive number", "error");
        return;
      }

      if (numVal > 100) {
        notify?.("Age cannot be more than 100", "error");
        return;
      }

      if (isNaN(numVal) || val.length > 3) return;
    }

    if (field === 'phone') {
      if (/\D/.test(val)) {
        notify?.("Only numbers are allowed for phone", "error"); // Shows the notification
        val = val.replace(/\D/g, ''); // Removes the letters immediately
      }

      if (val.length > 10) {
        notify?.("Phone number cannot exceed 10 digits", "error");
        return;
      }
    }

    onChange(field, val);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSave(field);
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl mb-3 border transition-all ${isEditing ? 'bg-white border-brand ring-4 ring-brand/5' : 'bg-slate-50 border-slate-100'}`}>
      <div className="flex items-center gap-3 flex-1">
        <div className={`p-2 rounded-xl transition-colors ${isEditing ? 'bg-brand/10 text-brand' : 'bg-white text-slate-400'}`}>
          {LucideIcon && <LucideIcon size={16} />}
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
            {label}
          </span>
          {isEditing ? (
            <input
              type={type}
              value={formDataValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-black text-slate-800 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none w-full uppercase transition-all"
            />
          ) : (
            <span className="text-xs font-black text-slate-800 uppercase leading-none">
              {value || `NO ${label}`}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center ml-2">
        {isEditing ? (
          <button
            onClick={() => onSave(field)}
            className="p-2 bg-brand text-white rounded-full active:scale-90 transition-all shadow-md shadow-brand/20"
          >
            <Check size={16} strokeWidth={3} />
          </button>
        ) : (
          <button
            onClick={() => onEdit(field)}
            className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all"
          >
            <Pencil size={14} />
          </button>
        )}
      </div>
    </div>
  );
};