import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// 1. Définition des types pour être 100% réutilisable
export type ToggleOption = {
    value: string;
    label: string;
};

interface GenericToggleProps {
    value: string;
    onChange: (value: string) => void;
    options: ToggleOption[];
    label?: string; // Titre optionnel au-dessus (ex: "DATES")
    headerOff: boolean;
    disabled?: boolean;
}

export default function GenericToggle({
                                          value,
                                          onChange,
                                          options,
                                          label, disabled
                                      }: GenericToggleProps) {
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string | null
    ) => {
        // Évite de désélectionner si on clique sur l'option déjà active
        if (newValue !== null) {
            onChange(newValue);
        }
    };

    return (
        <div className="flex flex-col">
            {/* Label Optionnel */}
            {label && (
                <label className="block text-xs font-bold text-slate-500 mb-1.5 ml-1 uppercase tracking-wider">
                    {label}
                </label>
            )}

            <ToggleButtonGroup
                value={value}
                disabled={disabled}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                fullWidth // Prend toute la largeur disponible
                className={`bg-slate-100 p-1 rounded-xl ${disabled ? 'cursor-not-allowed' : ''}`}
                sx={{
                    height: "54px", // Même hauteur que tes inputs
                    // Suppression des bordures par défaut de MUI
                    "& .MuiToggleButtonGroup-grouped": {
                        margin: 0,
                        border: 0,
                        "&.Mui-disabled": {
                            border: 0,
                        },
                        "&:not(:first-of-type)": {
                            borderRadius: "8px", // Arrondi interne
                        },
                        "&:first-of-type": {
                            borderRadius: "8px",
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <ToggleButton
                        disabled={disabled}
                        key={option.value}
                        value={option.value}
                        sx={{
                            textTransform: "none", // Pas de majuscules forcées
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            textWrap: "nowrap",
                            color: "#64748b", // slate-500 (Texte inactif)
                            transition: "all 0.2s ease-in-out",

                            "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.04)",
                            },

                            // Style du bouton SÉLECTIONNÉ (Blanc + Ombre + Texte Bleu)
                            "&.Mui-selected": {
                                backgroundColor: "#ffffff !important",
                                color: "#2563eb !important", // blue-600
                                fontWeight: 600,
                                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                                borderRadius: "8px !important",
                            },
                        }}
                    >
                        {option.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
}
