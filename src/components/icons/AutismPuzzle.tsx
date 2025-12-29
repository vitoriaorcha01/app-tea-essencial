interface AutismPuzzleProps {
  className?: string;
}

export default function AutismPuzzle({ className = "w-6 h-6" }: AutismPuzzleProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Peça superior esquerda - Azul */}
      <path
        d="M10,10 L40,10 C40,5 42,2 47,2 C52,2 54,5 54,10 L54,40 C59,40 62,42 62,47 C62,52 59,54 54,54 L54,54 L40,54 L40,40 C35,40 32,42 32,47 C32,52 35,54 40,54 L40,54 L10,54 L10,10 Z"
        fill="#4A90E2"
        stroke="#2C3E50"
        strokeWidth="1.5"
      />
      
      {/* Peça superior direita - Amarelo */}
      <path
        d="M54,10 C54,5 56,2 61,2 C66,2 68,5 68,10 L90,10 L90,40 C95,40 98,42 98,47 C98,52 95,54 90,54 L68,54 C68,59 66,62 61,62 C56,62 54,59 54,54 L54,40 C59,40 62,42 62,47 C62,52 59,54 54,54 L54,10 Z"
        fill="#F9D71C"
        stroke="#2C3E50"
        strokeWidth="1.5"
      />
      
      {/* Peça inferior esquerda - Verde */}
      <path
        d="M10,54 L40,54 C40,59 42,62 47,62 C52,62 54,59 54,54 L54,68 C59,68 62,70 62,75 C62,80 59,82 54,82 L54,90 L40,90 L40,82 C35,82 32,80 32,75 C32,70 35,68 40,68 L40,54 L10,54 L10,54 Z"
        fill="#50C878"
        stroke="#2C3E50"
        strokeWidth="1.5"
      />
      
      {/* Peça inferior direita - Vermelho */}
      <path
        d="M54,54 C54,59 56,62 61,62 C66,62 68,59 68,54 L90,54 C95,54 98,56 98,61 C98,66 95,68 90,68 L90,90 L68,90 L68,82 C68,77 66,74 61,74 C56,74 54,77 54,82 L54,90 L54,68 C59,68 62,70 62,75 C62,80 59,82 54,82 L54,54 Z"
        fill="#E74C3C"
        stroke="#2C3E50"
        strokeWidth="1.5"
      />
    </svg>
  );
}
