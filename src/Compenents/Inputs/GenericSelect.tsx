import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import type { ReactNode } from "react";

// 1. Définition des types pour les props
export type SelectOption = {
  value: string | number;
  label: string;
  icon?: ReactNode; // Chaque option peut avoir sa propre icône (optionnel)
};

interface GenericSelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  startIcon?: ReactNode; // L'icône principale à gauche de l'input (ex: Siège)
  placeholder?: string;
}


export default function GenericSelect({
  value,
  onChange,
  options,
  startIcon,
  placeholder = "Sélectionner",
}: GenericSelectProps) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as string | number);
  };

  return (
    <Box sx={{ minWidth: 50 }}>
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={() => handleChange}
          displayEmpty
          // Personnalisation de la flèche
          IconComponent={(props) => (
            <KeyboardArrowDownIcon
              {...props}
              className="!text-slate-400 !mr-2"
            />
          )}
          // Style du Menu (Liste déroulante)
          MenuProps={{
            PaperProps: {
              className:
                "!rounded-xl !mt-2 !border !border-slate-100 !shadow-xl",
              sx: {
                "& .MuiSelect": {
                  backgroundColor: "transparent",
                },
                "& .MuiMenuItem-root": {
                  padding: "12px 16px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#0f172a",
                  gap: "10px", // Espace entre icône et texte dans la liste
                  "&:hover": { backgroundColor: "#f8fafc" },
                  "&.Mui-selected": {
                    backgroundColor: "#eff6ff !important",
                    color: "#2563eb",
                  },
                },
              },
            },
          }}
          // Style de l'Input (Boîte principale)
          className="!bg-white !rounded-xl !text-slate-900 !font-medium h-[54px]"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiFormControl-root": {
              backgroundColor: "red",
            },
            border: "1px solid #e2e8f0",
            "&:hover": { backgroundColor: "#f1f5f9" },
            "&.Mui-focused": {
              border: "1px solid #3b82f6",
              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
            },
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              paddingLeft: startIcon ? "44px !important" : "16px !important",
              backgroundColor: "transparent",
            },
          }}
          renderValue={(selected) => {
            if (!selected && placeholder) {
              return (
                <span className="text-red-400 font-normal">{placeholder}</span>
              );
            }
            const selectedOption = options.find(
              (opt) => opt.value === selected
            );

            return (
              <div className="flex items-center">
                {/* L'icône principale (startIcon) toujours à gauche */}
                {startIcon && (
                  <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center">
                    {startIcon}
                  </div>
                )}
                <span className="text-sm truncate">
                  {selectedOption ? selectedOption.label : selected}
                </span>
              </div>
            );
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.icon && (
                <span className="text-white flex items-center">
                  {option.icon}
                </span>
              )}
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
