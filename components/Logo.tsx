export default function Logo() {
  return (
    <div className="flex items-center gap-4 select-none">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 64 64"
        fill="none"
        className="drop-shadow-md"
      > 
    
        <path
          d="M32 2C17 10 8 20 8 35c0 15 9 25 24 27 15-2 24-12 24-27 0-15-9-25-24-33z"
          fill="#2F855A" 
          stroke="#38A169" 
          strokeWidth="3"
          strokeLinejoin="round"
        />

        <path
          d="M20 35v-8l12-9 12 9v8"
          stroke="#F0FFF4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#38A169"
        />
        <rect
          x="26"
          y="35"
          width="12"
          height="14"
          fill="#F0FFF4"
          stroke="#38A169"
          strokeWidth="2"
          rx="2"
          ry="2"
        />
      </svg>

      <div>
        <h1 className="text-3xl font-extrabold text-green-700 leading-tight">
          Ainda <span className="text-green-500">tem?</span>
        </h1>
        <p className="text-sm text-green-600 -mt-1 font-semibold">
          Suprimentos essenciais ao seu alcance
        </p>
      </div>
    </div>
  );
}
