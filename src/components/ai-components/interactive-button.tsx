"use client";

interface InteractiveButtonProps {
  label: string;
  message: string;
  variant?: "primary" | "secondary" | "outline";
}

const variantStyles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
};

export function InteractiveButton({
  label,
  message,
  variant = "primary",
}: InteractiveButtonProps) {
  const handleClick = () => {
    alert(message);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${variantStyles[variant]}`}
    >
      {label}
    </button>
  );
}
