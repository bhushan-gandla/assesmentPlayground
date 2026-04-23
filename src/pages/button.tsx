type ButtonProps = {
  className1?: string;
  onButtonClick?: () => void;
  name: string;
  size: "sm" | "md";
};


export default function Button({className1, onButtonClick, name}: ButtonProps){
    return(
        <button className={className1} onClick={onButtonClick}>{name}</button>
    )
}


// import React, { forwardRef } from "react";
// import MuiButton from "@mui/material/Button";
// import CircularProgress from "@mui/material/CircularProgress";
// import clsx from "clsx";
// import { ButtonProps } from "./Button.types";
// import { getButtonSx, mapVariantToMuiVariant } from "./Button.styles";

// export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       children,
//       variant = "primary",
//       size = "md",
//       loading = false,
//       disabled,
//       leftIcon,
//       rightIcon,
//       className,
//       ...rest
//     },
//     ref
//   ) => {
//     const isDisabled = disabled || loading;

//     return (
//       <MuiButton
//         ref={ref}
//         variant={mapVariantToMuiVariant(variant)}
//         size={size === "sm" ? "small" : size === "lg" ? "large" : "medium"}
//         disabled={isDisabled}
//         startIcon={!loading ? leftIcon : undefined}
//         endIcon={!loading ? rightIcon : undefined}
//         className={clsx("ds-button", className)}
//         sx={getButtonSx({ variant, size, loading })}
//         {...rest}
//       >
//         {loading ? <CircularProgress size={16} color="inherit" /> : children}
//       </MuiButton>
//     );
//   }
// );

// Button.displayName = "Button";