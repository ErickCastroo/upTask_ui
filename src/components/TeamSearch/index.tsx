import { TeamMember } from "@/types";

type TeamSearchProps = {
  user: TeamMember;
};

function TeamSearch({ user }: TeamSearchProps) {

  return (
    <div className="mt-5 backdrop-blur-sm bg-white/70 border border-white/30 shadow-xl rounded-2xl p-6 text-center space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">
        👤 Usuario encontrado
      </h2>

      <div className="text-lg font-medium text-gray-700 bg-white rounded-xl py-3 px-5 shadow-sm">
        {user.user.name}
      </div>

      <button
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-xl transition-all shadow-md"
      >
        Agregar Usuario
      </button>
    </div>
  )
}

export { TeamSearch }

