import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export function UserManagementIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.5 6V19C4.5 20.6569 5.84315 22 7.5 22H17.5C19.1569 22 20.5 20.6569 20.5 19V9C20.5 7.34315 19.1569 6 17.5 6H4.5ZM4.5 6V5"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />
      <circle
        cx="12.5"
        cy="13"
        r="3"
        stroke="#CBD5E1"
        strokeWidth="1.5"
        fill="black"
      />
      <path
        d="M18.5 6.00002V6.75002H19.25V6.00002H18.5ZM16.2172 2.32614L16.1111 1.58368L16.2172 2.32614ZM5.41959 3.86865L5.31353 3.12619H5.31353L5.41959 3.86865ZM5.57107 6.75002H18.5V5.25002H5.57107V6.75002ZM19.25 6.00002V4.30604H17.75V6.00002H19.25ZM16.1111 1.58368L5.31353 3.12619L5.52566 4.61111L16.3232 3.0686L16.1111 1.58368ZM5.31353 3.12619C4.41638 3.25435 3.75 4.0227 3.75 4.92895H5.25C5.25 4.76917 5.36749 4.63371 5.52566 4.61111L5.31353 3.12619ZM19.25 4.30604C19.25 2.63253 17.7678 1.34701 16.1111 1.58368L16.3232 3.0686C17.0763 2.96103 17.75 3.54535 17.75 4.30604H19.25ZM5.57107 5.25002C5.39375 5.25002 5.25 5.10627 5.25 4.92895H3.75C3.75 5.9347 4.56532 6.75002 5.57107 6.75002V5.25002Z"
        fill="#CBD5E1"
      />
      <path
        d="M10.5 19H14.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="#CBD5E1"
      />
    </svg>
  );
}
